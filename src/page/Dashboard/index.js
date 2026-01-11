import React, { useState, useEffect } from "react";
import { Navbar, useGeolocation } from "../../component";
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L from 'leaflet';
import axios from "axios";
import {
  URI,
  osmTileLayer,
  osmAttribution,
  markerUser,
  markerHotel,
  markerRestaurant,
  markerSPBU,
  markerCompany } from "../../utils";

const Dashboard = (props) => {

  //get user location(GPS)
  const location = useGeolocation();
  const [count, setCount] = useState('');

  // Custom icons for Leaflet
  const userIcon = L.icon({
    iconUrl: markerUser,
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
  });

  const hotelIcon = L.icon({
    iconUrl: markerHotel,
    iconSize: [25, 35],
    iconAnchor: [12, 35],
    popupAnchor: [0, -35]
  });

  const restaurantIcon = L.icon({
    iconUrl: markerRestaurant,
    iconSize: [25, 35],
    iconAnchor: [12, 35],
    popupAnchor: [0, -35]
  });

  const spbuIcon = L.icon({
    iconUrl: markerSPBU,
    iconSize: [25, 35],
    iconAnchor: [12, 35],
    popupAnchor: [0, -35]
  });

  const companyIcon = L.icon({
    iconUrl: markerCompany,
    iconSize: [25, 35],
    iconAnchor: [12, 35],
    popupAnchor: [0, -35]
  });

  useEffect(()=> {
    axios.get(URI)
    .then(result => {
        const ResponseAPI = result.data
        setCount(ResponseAPI)
    })
    .catch(err => {
        console.log('error: ', err)
    })
  },[])

  // Get marker icon based on category
  const getMarkerIcon = (catmap_id) => {
    if(catmap_id === "2") {
      return hotelIcon;
    } else if(catmap_id === "1") {
      return restaurantIcon;
    } else if(catmap_id === "3") {
      return spbuIcon;
    } else {
      return companyIcon;
    }
  }

  return (
    <>
      <div className="col-lg-12 row d-flex" style={{ overflow: "hidden" }}>
        <div style={{ position: "relative", zIndex: 99, marginTop: 70 }}>
          <Navbar />
        </div>
        <div style={{ position: "relative", zIndex: 1, marginTop: -150 }}>
          <div style={{ width: "100vw", height: "100vh" }}>
            <MapContainer
              center={[location.coordinates.lat, location.coordinates.lng]}
              zoom={11}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution={osmAttribution}
                url={osmTileLayer}
              />

              {/* Marker user location */}
              <Marker
                position={[parseFloat(location.coordinates.lat), parseFloat(location.coordinates.lng)]}
                icon={userIcon}
              />

              {/* Radius circle (optional - commented out like original) */}
              {/* <Circle
                center={[parseFloat(location.coordinates.lat), parseFloat(location.coordinates.lng)]}
                radius={25000}
                pathOptions={{
                  color: "#AFEEEE",
                  fillColor: "#AFEEEE",
                  fillOpacity: 0.35,
                }}
              /> */}

              {/* Determine the color according to each category */}
              {count.response ? count.response.map((items, index) => {
                return (
                  <Marker
                    key={index}
                    position={[parseFloat(items.latitude), parseFloat(items.longitude)]}
                    icon={getMarkerIcon(items.catmap_id)}
                  />
                )
              }): null}
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
