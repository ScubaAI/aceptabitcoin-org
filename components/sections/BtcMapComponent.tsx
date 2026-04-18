"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet + Next.js
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

export default function BtcMapComponent() {
  const [merchants, setMerchants] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.btcmap.org/v4/merchants?country=MX")
      .then(res => res.json())
      .then(data => setMerchants(data.slice(0, 100))) // Increased limit
      .catch(err => console.error("Error loading BTC Map data", err));
  }, []);

  return (
    <MapContainer
      center={[20.967, -89.623]} // Mérida center
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
      className="z-0"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      
      {merchants.map((merchant: any) => (
        <Marker 
          key={merchant.id}
          position={[merchant.latitude, merchant.longitude]}
        >
          <Popup className="merchant-popup">
            <div className="p-1">
              <h4 className="font-bold text-bitcoin mb-1">{merchant.name}</h4>
              <p className="text-xs text-muted-foreground mb-2">{merchant.address || "Dirección no disponible"}</p>
              {merchant.tags?.category && (
                <span className="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary text-[10px] font-bold uppercase">
                  {merchant.tags.category}
                </span>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}