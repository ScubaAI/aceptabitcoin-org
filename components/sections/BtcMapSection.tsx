"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./BtcMapComponent"), { ssr: false });

export default function BtcMapSection() {
  return (
    <section className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Dónde se acepta Bitcoin en México</h2>
          <p className="text-gray-400">Datos en tiempo real de BTC Map</p>
        </div>

        <div className="h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-xl">
          <Map />
        </div>

        <div className="text-center mt-8">
          <a 
            href="https://btcmap.org" 
            target="_blank"
            className="text-turquesa hover:underline"
          >
            Ver mapa completo en btcmap.org →
          </a>
        </div>
      </div>
    </section>
  );
}