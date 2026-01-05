import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { useSelector } from "react-redux";
import { osmTileLayer, osmAttribution, markerHotel, markerRestaurant, markerCompany, markerUser } from "../../../utils";
import useGeoLocation from "../../../component/molecule/UseGeoLocation";


const MapDetail = ({ map_id }) => {
  const location  = useGeoLocation();
  const { data }  = useSelector((state) => state.GetById);

  // Custom icons for Leaflet
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

  const companyIcon = L.icon({
    iconUrl: markerCompany,
    iconSize: [25, 35],
    iconAnchor: [12, 35],
    popupAnchor: [0, -35]
  });

  const userIcon = L.icon({
    iconUrl: markerUser,
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
  });

  // Determine marker icon based on category
  const getMarkerIcon = () => {
    if (data.catmap_id === "2") {
      return hotelIcon;
    } else if (data.catmap_id === "1") {
      return restaurantIcon;
    } else {
      return companyIcon;
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapContainer
        center={[parseFloat(data.latitude), parseFloat(data.longitude)]}
        zoom={11}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution={osmAttribution}
          url={osmTileLayer}
        />

        {/* Place marker */}
        <Marker
          position={[parseFloat(data.latitude), parseFloat(data.longitude)]}
          icon={getMarkerIcon()}
        />

        {/* User location marker */}
        {location.lat && location.lng && (
          <Marker
            position={[parseFloat(location.lat), parseFloat(location.lng)]}
            icon={userIcon}
          />
        )}
      </MapContainer>
    </div>
  );
}


export default MapDetail
