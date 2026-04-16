"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function BtcMapComponent() {
  const [merchants, setMerchants] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.btcmap.org/v4/merchants?country=MX")
      .then(res => res.json())
      .then(data => setMerchants(data.slice(0, 50)));
  }, []);

  return (
    <MapContainer
      center={[20.967, -89.62]}
      zoom={7}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      
      {merchants.map((merchant: any) => (
        <Marker 
          key={merchant.id}
          position={[merchant.latitude, merchant.longitude]}
        >
          <Popup>
            <strong>{merchant.name}</strong><br />
            {merchant.address}<br />
            {merchant.tags?.category && <span>📍 {merchant.tags.category}</span>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}