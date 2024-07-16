import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

function Map({ onLocationChange }) {
  const initialPosition = [20.97537, -89.61696];
  const [markerPosition, setMarkerPosition] = useState(initialPosition);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const newPosition = [e.latlng.lat, e.latlng.lng];
        setMarkerPosition(newPosition);
        onLocationChange(newPosition);
      },
    });

    const locationIcon = L.icon({
      iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
      iconSize: [38, 38],
    });

    return <Marker position={markerPosition} icon={locationIcon} />;
  };

  return (
    <MapContainer
      style={{ height: "400px" }}
      center={initialPosition}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution="bullseye map"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}

export default Map;
