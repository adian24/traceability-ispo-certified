import { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { osmTileLayer, osmAttribution, markerUser } from '../../../utils';

// Component to handle map clicks
function LocationMarker({ position, onPositionChange }) {
  useMapEvents({
    click(e) {
      onPositionChange(e.latlng);
    },
  });

  const userIcon = L.icon({
    iconUrl: markerUser,
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
  });

  return position === null ? null : (
    <Marker position={position} icon={userIcon} />
  );
}

export default function MapPicker({ center, onLocationSelect }) {
  const [position, setPosition] = useState(center);

  const handlePositionChange = useCallback((latlng) => {
    setPosition(latlng);
    if (onLocationSelect) {
      onLocationSelect(latlng.lat, latlng.lng);
    }
  }, [onLocationSelect]);

  return (
    <MapContainer
      center={center}
      zoom={11.5}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution={osmAttribution}
        url={osmTileLayer}
      />
      <LocationMarker position={position} onPositionChange={handlePositionChange} />
    </MapContainer>
  );
}
