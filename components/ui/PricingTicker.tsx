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
        // Intentar primero con CoinGecko por ser más confiable para MXN
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,mxn"
        );
        const data = await res.json();
        
        if (data && data.bitcoin) {
          setBtcUsd(data.bitcoin.usd.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }));
          setBtcMxn(data.bitcoin.mxn.toLocaleString("es-MX", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }));
        } else {
          throw new Error("Invalid CoinGecko response");
        }
      } catch (error) {
        console.warn("Ticker: CoinGecko failed, falling back to Binance");
        try {
          const res = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
          const data = await res.json();
          if (data && data.price) {
            setBtcUsd(parseFloat(data.price).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }));
          }
        } catch (binanceError) {
          console.error("Ticker: All price sources failed");
        }
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);

    return () => clearInterval(interval);
  }, []);

  const msg1 = "RECIBE PAGOS CON BITCOIN EN TU TIENDA EN 5 MINS!!";
  const msg2 = "CONOCE NUESTROS SERVICIOS Y PLANES DESDE $0 MXN ▸";

  const TickerSegment = () => (
    <>
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
      
      <span className="text-matrix font-bold">{msg1}</span>
      
      <span className="text-bitcoin">///</span>
      
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
        <div className="animate-marquee flex items-center gap-6 py-2.5 font-vt323 text-sm md:text-base tracking-widest group-hover:[animation-play-state:paused]">
          <TickerSegment />
          <TickerSegment />
          <TickerSegment />
        </div>
      </div>
    </Link>
  );
}