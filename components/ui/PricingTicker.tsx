"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function PricingTicker() {
  const [isMounted, setIsMounted] = useState(false);
  const [btcUsd, setBtcUsd] = useState("00,000.00");
  const [btcMxn, setBtcMxn] = useState("000,000.00");

  useEffect(() => {
    setIsMounted(true);

    const fetchPrices = async () => {
      try {
        // Fetch directo a Binance (sin necesidad de proxy para este endpoint público)
        const res = await fetch(
          'https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","BTCMXNT"]'
        );
        const data = await res.json();
        
        if (data && data[0] && data[1]) {
          const usd = parseFloat(data[0].price).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          const mxn = parseFloat(data[1].price).toLocaleString("es-MX", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          setBtcUsd(usd);
          setBtcMxn(mxn);
        }
      } catch (error) {
        console.warn("Ticker: Error fetching Binance prices, using fallback");
      }
    };

    fetchPrices();
    // Actualizar cada 30 segundos para mantenerlo "vivo" sin saturar
    const interval = setInterval(fetchPrices, 30000);

    return () => clearInterval(interval);
  }, []);

  // Mensajes intercalados (Wall Street style)
  const msg1 = "RECIBE PAGOS CON BITCOIN EN TU TIENDA EN 5 MINS!!";
  const msg2 = "CONOCE NUESTROS SERVICIOS Y PLANES DESDE $0 MXN ▸";

  // Fragmento reutilizable para el loop infinito
  const TickerSegment = () => (
    <>
      {/* BTC/USD */}
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-matrix animate-pulse" />
        <span className="text-matrix">BTC/USD</span>
        <span 
          className="text-bitcoin font-bold" 
          suppressHydrationWarning
        >
          ${isMounted ? btcUsd : "00,000.00"}
        </span>
      </span>
      
      <span className="text-matrix/50">///</span>
      
      {/* Mensaje 1 */}
      <span className="text-matrix font-bold">{msg1}</span>
      
      <span className="text-bitcoin">///</span>
      
      {/* BTC/MXN */}
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-matrix animate-pulse" />
        <span className="text-matrix">BTC/MXN</span>
        <span 
          className="text-bitcoin font-bold" 
          suppressHydrationWarning
        >
          ${isMounted ? btcMxn : "000,000.00"}
        </span>
      </span>
      
      <span className="text-matrix/50">///</span>
      
      {/* Mensaje 2 */}
      <span className="text-matrix font-bold">{msg2}</span>
      
      <span className="text-bitcoin">///</span>
    </>
  );

  return (
    <Link 
      href="/planes" 
      className="block w-full overflow-hidden bg-black/80 border-b border-matrix/30 hover:bg-matrix/10 transition-colors duration-300 group backdrop-blur-sm"
    >
      <div className="relative flex whitespace-nowrap">
        {/* Animación CSS pura para rendimiento óptimo */}
        <div className="animate-marquee flex items-center gap-6 py-2.5 font-vt323 text-sm md:text-base tracking-widest group-hover:[animation-play-state:paused]">
          
          {/* Segmento 1 */}
          <TickerSegment />
          
          {/* Segmento 2 (Duplicado exacto para efecto infinito seamless) */}
          <TickerSegment />
          
          {/* Segmento 3 (Refuerzo para pantallas ultra-anchas) */}
          <TickerSegment />
          
        </div>
      </div>
    </Link>
  );
}