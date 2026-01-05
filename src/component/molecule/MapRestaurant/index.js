import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import "./mapsRestaurant.css";
import { halal } from "../../../assets";
import { useHistory } from "react-router-dom";
import { useGeolocation } from "../../../component";
import { osmTileLayer, osmAttribution, markerRestaurant, markerUser } from "../../../utils";
import Carousel from "react-elastic-carousel";

export default function MapRestaurant({ map_id, nearby, data }) {
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

  const restaurantIcon = L.icon({
    iconUrl: markerRestaurant,
    iconSize: [25, 35],
    iconAnchor: [12, 35],
    popupAnchor: [0, -35]
  });

  // Recenter map when nearby changes
  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, [nearby]);

  // Calculate center position with fallback
  const centerLat = location.lat ? parseFloat(location.lat) : 2.0;
  const centerLng = location.lng ? parseFloat(location.lng) : 130.0;

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

              if (markerPlace < 10) {
                return (
                  <Marker
                    key={label.map_id}
                    position={[parseFloat(label.latitude), parseFloat(label.longitude)]}
                    icon={restaurantIcon}
                    eventHandlers={{
                      click: () => setSelectedPlace(label)
                    }}
                  >
                    <Popup>
                      <div className="bg-popup-restaurant">
                        <img alt="photomarker" className="img-popup-restaurant"
                          src={label.photo}
                        />
                        <h2 className="name-popup-restaurant mx-3">
                          {label.name}
                        </h2>
                        {label.phone1 ? (
                          <div className="d-flex part-restaurant mt-2">
                            {label.phone1 ? (
                              <span className="phone-popup-restaurant"><i className="fas fa-phone-alt mr-2"/> {label.phone1} </span>
                            ): null}
                            <div className="category-popup-restaurant">
                              Restaurant
                            </div>
                          </div>
                        ) : (
                          <div className="d-flex part-2-restaurant mt-2">
                            {label.phone1 ? (
                              <i className="fas fa-phone-alt phone-popup-restaurant"> {label.phone1}</i>
                            ): null}
                            <div className="category-popup-restaurant">
                              Restaurant
                            </div>
                          </div>
                        )}
                        {label.certificate.length > 0 ? (
                          <div className="part-restaurant mt-2">
                            <Carousel>
                              {label.certificate && label.certificate.length
                                ? label.certificate.map((item) => {
                                    return (
                                      <div key={item.certificate_id}>
                                        <img
                                          alt="detail certificate"
                                          className="logo-popup-company mt-2 mb-3"
                                          // src={item.certificate_file}
                                          src={halal}
                                        />
                                      </div>
                                    );
                                  })
                                : null}
                            </Carousel>
                            <div className="btn-detail-restaurant"
                                onClick={() =>
                                  history.push(`/detail_place/${label.map_id}`)
                                }>
                                More Detail
                            </div>
                          </div>
                        ) : (
                          <div className="d-flex part-2-restaurant mt-2">
                            {label.certificate.length > 0 ? (
                              <div>
                                <img
                                  src={halal}
                                  alt="icon restaurant"
                                  width={"100%"}
                                  height={25}
                                />
                              </div>
                            ) : null}
                            <div className="btn-detail-restaurant"
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
                  icon={restaurantIcon}
                  eventHandlers={{
                    click: () => setSelectedPlace(label)
                  }}
                >
                  <Popup>
                    <div className="bg-popup-restaurant">
                      <img alt="photomarker" className="img-popup-restaurant"
                        src={label.photo}
                      />
                      <h2 className="name-popup-restaurant mx-3">
                        {label.name}
                      </h2>
                      {label.phone1 ? (
                        <div className="d-flex part-restaurant mt-2">
                          {label.phone1 ? (
                            <span className="phone-popup-restaurant"><i className="fas fa-phone-alt mr-2"/> {label.phone1} </span>
                          ): null}
                          <div className="category-popup-restaurant">
                            Restaurant
                          </div>
                        </div>
                      ) : (
                        <div className="d-flex part-2-restaurant mt-2">
                          {label.phone1 ? (
                            <i className="fas fa-phone-alt phone-popup-restaurant"> {label.phone1}</i>
                          ): null}
                          <div className="category-popup-restaurant">
                            Restaurant
                          </div>
                        </div>
                      )}
                      {label.certificate.length > 0 ? (
                        <div className="part-restaurant mt-2">
                          <Carousel>
                            {label.certificate && label.certificate.length
                              ? label.certificate.map((item) => {
                                  return (
                                    <div key={item.certificate_id}>
                                      <img
                                        alt="detail certificate"
                                        className="logo-popup-company mt-2 mb-3"
                                        // src={item.certificate_file}
                                        src={halal}
                                      />
                                    </div>
                                  );
                                })
                              : null}
                          </Carousel>
                          <div className="btn-detail-restaurant"
                              onClick={() =>
                                history.push(`/detail_place/${label.map_id}`)
                              }>
                              More Detail
                          </div>
                        </div>
                      ) : (
                        <div className="d-flex part-2-restaurant mt-2">
                          {label.certificate.length > 0 ? (
                            <div>
                              <img
                                src={halal}
                                alt="icon restaurant"
                                width={"100%"}
                                height={25}
                              />
                            </div>
                          ) : null}
                          <div className="btn-detail-restaurant"
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
