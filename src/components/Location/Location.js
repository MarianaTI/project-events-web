import React from 'react'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

function Location({ position }) {
    const defaultIcon = L.icon({
        iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
    
      return (
        <MapContainer
          style={{ height: '200px', width: '30%', boxShadow: "0px 10px 20px 0px rgba(0,0,0,0.1)", marginLeft: "28px"}}
          center={position}
          zoom={15}
          scrollWheelZoom={false}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={defaultIcon} />
        </MapContainer>
      );
}

export default Location;
