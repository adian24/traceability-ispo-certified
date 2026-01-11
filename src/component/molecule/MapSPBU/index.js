import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import "./maps.css";
import { phone, PastiPas } from "../../../assets";
import { useHistory } from "react-router-dom";
import { useGeolocation } from "../../../component";
import { osmTileLayer, osmAttribution, markerSPBU, markerUser } from "../../../utils";

export default function MapSPBU({ map_id, nearby, data }) {
  // Gunakan data dari props (semua marker) bukan dari Redux
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapKey, setMapKey] = useState(0);
  const history = useHistory();

  //get user location(GPS)
  const location = useGeolocation();

  // Custom icons for Leaflet
  const userIcon = L.icon({
    iconUrl: markerUser,
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
  });

  const spbuIcon = L.icon({
    iconUrl: markerSPBU,
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
  const zoomLevel = location.lat && location.lng ? 11 : 4.3;

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
              const R = 6371e3; // earth radius in meter

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
                    icon={spbuIcon}
                    eventHandlers={{
                      click: () => setSelectedPlace(label)
                    }}
                  >
                    <Popup>
                      <div style={{ background: "#fff", textAlign: "center", width: 200 }}>
                        <img alt="icon"
                          src={label.photo}
                          style={{
                            width: "100%",
                            margin: 0,
                            height: 90,
                            borderRadius: 16,
                          }}
                        />
                        <h2 className="text-dark" style={{ fontSize: 14 }}>
                          {label.name}
                        </h2>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 4,
                          }}
                        >
                          <div style={{ marginRight: 18, fontSize: 13, display: "flex" }}>
                            {label.phone1 ? (
                            <img src={phone} width={15} height={15} alt="icon phone" />
                            ):null}
                            {label.phone1}
                          </div>
                          <div
                            style={{
                              backgroundColor: "#FF0000",
                              color: "white",
                              fontSize: 10,
                              borderRadius: 16,
                              padding: 3,
                              paddingLeft: 15,
                              paddingRight: 15,
                            }}
                          >
                            SPBU
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            padding: 5,
                            justifyContent: "center",
                            marginTop: 10,
                          }}
                        >
                          {label.certificate.length > 0 ? (
                            <div style={{ marginRight: 18 }}>
                              <img
                                src={PastiPas}
                                alt="icon pastipass"
                                width={"100%"}
                                height={45}
                              />
                            </div>
                          ) : null}
                          <div style={{ marginLeft: 20 }}>
                            <div>
                              <button
                                style={{
                                  fontSize: 12,
                                  backgroundColor: "#001C54",
                                  color: "white",
                                  borderRadius: 16,
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                }}
                                onClick={() =>
                                  history.push(`/detail_place/${label.map_id}`)
                                }
                              >
                                More Detail
                              </button>
                            </div>
                          </div>
                        </div>
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
                  icon={spbuIcon}
                  eventHandlers={{
                    click: () => setSelectedPlace(label)
                  }}
                >
                  <Popup>
                    <div style={{ background: "#fff", textAlign: "center", width: 200 }}>
                      <img alt="icon"
                        src={label.photo}
                        style={{
                          width: "100%",
                          margin: 0,
                          height: 90,
                          borderRadius: 16,
                        }}
                      />
                      <h2 className="text-dark" style={{ fontSize: 14 }}>
                        {label.name}
                      </h2>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: 4,
                        }}
                      >
                        <div style={{ marginRight: 18, fontSize: 13, display: "flex" }}>
                          {label.phone1 ? (
                          <img src={phone} width={15} height={15} alt="icon phone" />
                          ):null}
                          {label.phone1}
                        </div>
                        <div
                          style={{
                            backgroundColor: "#FF0000",
                            color: "white",
                            fontSize: 10,
                            borderRadius: 16,
                            padding: 3,
                            paddingLeft: 15,
                            paddingRight: 15,
                          }}
                        >
                          SPBU
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          padding: 5,
                          justifyContent: "center",
                          marginTop: 10,
                        }}
                      >
                        {label.certificate.length > 0 ? (
                          <div style={{ marginRight: 18 }}>
                            <img
                              src={PastiPas}
                              alt="icon pastipass"
                              width={"100%"}
                              height={45}
                            />
                          </div>
                        ) : null}
                        <div style={{ marginLeft: 20 }}>
                          <div>
                            <button
                              style={{
                                fontSize: 12,
                                backgroundColor: "#001C54",
                                color: "white",
                                borderRadius: 16,
                                paddingLeft: 10,
                                paddingRight: 10,
                              }}
                              onClick={() =>
                                history.push(`/detail_place/${label.map_id}`)
                              }
                            >
                              More Detail
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
      </MapContainer>
    </div>
  );
}
