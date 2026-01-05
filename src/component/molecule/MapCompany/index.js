import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import "./mapsCompany.css";
import { useHistory } from "react-router-dom";
import { useGeolocation } from "../../../component";
import {
  osmTileLayer,
  osmAttribution,
  markerUser,
  markerCompany } from "../../../utils";
import Carousel from "react-elastic-carousel";
import {
  ISO,
  bg,
  mapsWhite,
  mapsGif,
  quote,
  person,
  ikonsawit,
  cf1,
  cf2,
  cf3,
  cf4,
  partner,
  ispo,
  iso_13485,
  iso_45001,
  iso_14001,
  iso_22001,
  iso_9001,
  CHSE,
  halal,
  MapsLogin,
  gedung
} from "../../../assets";

export default function MapCompany({ map_id, nearby, search, data }) {
  // Gunakan data dari props (semua marker) bukan dari Redux
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapKey, setMapKey]               = useState(0);
  const history                           = useHistory();
  const location                          = useGeolocation();

  // Custom icons for Leaflet
  const userIcon = L.icon({
    iconUrl: markerUser,
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
  });

  const companyIcon = L.icon({
    iconUrl: markerCompany,
    iconSize: [25, 35],
    iconAnchor: [12, 35],
    popupAnchor: [0, -35]
  });

  // Recenter map when search changes
  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, [search, nearby]);

  // Calculate center position
  const centerLat = search && data[0] ? parseFloat(data[0].latitude) : (location.lat ? parseFloat(location.lat) : 2.0);
  const centerLng = search && data[0] ? parseFloat(data[0].longitude) : (location.lng ? parseFloat(location.lng) : 130.0);

  // Adjust zoom based on whether we have user location or showing all Indonesia
  const zoomLevel = location.lat && location.lng ? 11 : 5;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapContainer
        key={mapKey}
        center={[centerLat, centerLng]}
        zoom={zoomLevel}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution={osmAttribution}
          url={osmTileLayer}
        />

        {/* Marker user location */}
        {location.lat && location.lng && (
          <Marker
            position={[parseFloat(location.lat), parseFloat(location.lng)]}
            icon={userIcon}
          />
        )}

        {/* Check LatLng nearby from user location */}
        {nearby
          ? data && Array.isArray(data) && data.map((label) => {
              if (!location.lat || !location.lng) return null;

              const lat1 = parseFloat(location.lat);
              const lon1 = parseFloat(location.lng);
              const lat2 = parseFloat(label.latitude);
              const lon2 = parseFloat(label.longitude);
              const R    = 6371e3; // earth radius in meter

              const φ1 = lat1 * (Math.PI / 180);
              const φ2 = lat2 * (Math.PI / 180);
              const Δφ = (lat2 - lat1) * (Math.PI / 180);
              const Δλ = (lon2 - lon1) * (Math.PI / 180);

              const a =
                Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) *
                  Math.cos(φ2) *
                  (Math.sin(Δλ / 2) * Math.sin(Δλ / 2));

              const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              let markerPlace = [];
              const distance = (R * c) / 1000;
              markerPlace.push(distance);

              if (markerPlace < 20) {
                return (
                  <Marker
                    key={label.map_id}
                    position={[parseFloat(label.latitude), parseFloat(label.longitude)]}
                    icon={companyIcon}
                    eventHandlers={{
                      click: () => setSelectedPlace(label)
                    }}
                  >
                    <Popup className="custom-popup">
                      <div className="bg-popup-company">
                        {/* <img alt="photomarker" className="img-popup-company" src={label.photo}/> */}
                        <img alt="photomarker" className="img-popup-company" src={gedung}/>
                        <div className="category-popup-company">Company</div>
                        <h2 className="name-popup-company !mx-[3px]">{label.name}</h2>
                        {label.phone1 ? (
                          <div className="d-flex part-company text-center mx-3">
                            {label.phone1 ? (
                              <span className="phone-popup-company ml-0"><i className="fas fa-phone-alt mr-2"/> {label.phone1} </span>
                            ): null}
                          </div>
                        ) : (
                          <div className="d-flex part-2-company mt-2">
                            {label.phone1 ? (
                              <span className="phone-popup-company ml-0"><i className="fas fa-phone-alt mr-2"/> {label.phone1} </span>
                            ): null}
                            <div className="category-popup-company">
                              Company
                            </div>
                          </div>
                        )}
                        {label.certificate.length > 0 ? (
                          <div className=" part-company text-center mt-2">
                            <Carousel>
                              {
                                label.certificate && label.certificate.length
                                ? label.certificate.map((item) => {
                                    return (
                                      <div key={item.certificate_id}>
                                        <img
                                          alt="detail certificate"
                                          className="logo-popup-company mt-2 mb-3"
                                          // src={item.certificate_file}
                                          src={ISO}
                                        />
                                      </div>
                                    );
                                  })
                                : null
                              }
                            </Carousel>
                            <div className="btn-detail-company"
                                onClick={() =>
                                  history.push(`/detail_place/${label.map_id}`)
                                }>
                                More Detail
                            </div>
                          </div>
                        ) : (
                          <div className=" part-2-company mt-2">
                            {label.certificate[0] != null && label.certificate[0].iso_id === "10" ? (
                              <div>
                                <img className="logo-popup-company mt-2 mb-3"
                                  src={ispo}
                                  alt="icon ispo"
                                />
                              </div>
                            ) : (
                              <div>
                                <img className="logo-popup-company mt-2 mb-3"
                                  src={ISO}
                                  alt="icon iso"
                                />
                              </div>
                            )}
                            <div className="btn-detail-company"
                              onClick={() =>
                                history.push(`/detail_place/${label.map_id}`)
                              }>
                              More Detail
                            </div>
                          </div>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                );
              }
              return null;
            })
          : data && Array.isArray(data) && data.map((label) => {
              return (
                <Marker
                  key={label.map_id}
                  position={[parseFloat(label.latitude), parseFloat(label.longitude)]}
                  icon={companyIcon}
                  eventHandlers={{
                    click: () => setSelectedPlace(label)
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="bg-popup-company">
                      {/* <img alt="photomarker" className="img-popup-company" src={label.photo}/> */}
                      <img alt="photomarker" className="img-popup-company" src={gedung}/>
                      <div className="category-popup-company">Company</div>
                      <h2 className="name-popup-company !m-[10px]">{label.name}</h2>
                      {label.phone1 ? (
                        <div className="d-flex part-company text-center !m-[10px] !mb-[20px]">
                          {label.phone1 ? (
                            <span className="phone-popup-company ml-0"><i className="fas fa-phone-alt mr-2"/> {label.phone1} </span>
                          ): null}
                        </div>
                      ) : (
                        <div className="d-flex part-2-company mt-2">
                          {label.phone1 ? (
                            <span className="phone-popup-company ml-0"><i className="fas fa-phone-alt mr-2"/> {label.phone1} </span>
                          ): null}
                          <div className="category-popup-company">
                            Company
                          </div>
                        </div>
                      )}
                      {label.certificate.length > 0 ? (
                        <div className=" part-company text-center mt-2">
                          <Carousel>
                            {
                              label.certificate && label.certificate.length
                              ? label.certificate.map((item) => {
                                  return (
                                    <div key={item.certificate_id}>
                                      <img
                                        alt="detail certificate"
                                        className="logo-popup-company mt-2 mb-3"
                                        // src={item.certificate_file}
                                        src={ISO}
                                      />
                                    </div>
                                  );
                                })
                              : null
                            }
                          </Carousel>
                          <div className="btn-detail-company"
                              onClick={() =>
                                history.push(`/detail_place/${label.map_id}`)
                              }>
                              More Detail
                          </div>
                        </div>
                      ) : (
                        <div className=" part-2-company mt-2">
                          {label.certificate[0] != null && label.certificate[0].iso_id === "10" ? (
                            <div>
                              <img className="logo-popup-company mt-2 mb-3"
                                src={ispo}
                                alt="icon ispo"
                              />
                            </div>
                          ) : (
                            <div>
                              <img className="logo-popup-company mt-2 mb-3"
                                src={ISO}
                                alt="icon iso"
                              />
                            </div>
                          )}
                          <div className="btn-detail-company"
                            onClick={() =>
                              history.push(`/detail_place/${label.map_id}`)
                            }>
                            More Detail
                          </div>
                        </div>
                      )}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
      </MapContainer>
    </div>
  );
}
