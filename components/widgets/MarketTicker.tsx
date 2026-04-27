
"use client";

import React from "react";
import { useMarketData } from "@/hooks/useMarketData";
import { Activity, Cpu, Zap, Box, TrendingUp } from "lucide-react";
import MatrixRain from "@/components/ui/MatrixRain";

export const MarketTicker = () => {
  const { data, loading, error } = useMarketData();

  if (error) return null;

  return (
    <div className="relative w-full bg-black border-y border-matrix/20 backdrop-blur-md py-2 overflow-hidden select-none h-12 flex items-center">
      {/* Subtle Matrix Rain Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <MatrixRain />
      </div>

      <div className="container mx-auto px-4 flex items-center justify-between gap-8 animate-in fade-in duration-700 relative z-10">
        
        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-matrix shadow-[0_0_8px_#00FF41]'}`} />
          <span className="font-mono text-[10px] text-matrix uppercase tracking-widest hidden lg:inline">
            Oracle.System.Online
          </span>
        </div>

        {/* Data Stream */}
        <div className="flex-1 flex items-center justify-end md:justify-center gap-6 overflow-x-auto no-scrollbar font-mono text-sm">
          
          {/* BTC Price */}
          <div className="flex items-center gap-2 whitespace-nowrap group">
            <TrendingUp className="w-4 h-4 text-bitcoin group-hover:scale-110 transition-transform" />
            <span className="text-gray-500 text-[10px]">BTC/USD:</span>
            <span className="text-bitcoin font-bold">
              {data ? `$${data.priceUsd.toLocaleString()}` : '-------'}
            </span>
          </div>

          {/* MXN Price */}
          <div className="flex items-center gap-2 whitespace-nowrap group">
            <span className="text-gray-500 text-[10px]">BTC/MXN:</span>
            <span className="text-matrix">
              {data ? `$${data.priceMxn.toLocaleString()}` : '-------'}
            </span>
          </div>

          {/* Fees */}
          <div className="flex items-center gap-2 whitespace-nowrap group">
            <Zap className="w-4 h-4 text-matrix animate-pulse" />
            <span className="text-gray-500 text-[10px]">FEES:</span>
            <span className="text-matrix">
              {data ? `${data.fees.fast} sat/vB` : '--'}
            </span>
          </div>

          {/* Block Height */}
          <div className="flex items-center gap-2 whitespace-nowrap group">
            <Box className="w-4 h-4 text-gray-400" />
            <span className="text-gray-500 text-[10px]">BLOCK:</span>
            <span className="text-white font-vt323 text-lg">
              {data ? data.blockHeight.toLocaleString() : '-------'}
            </span>
          </div>

          {/* Hashrate */}
          <div className="hidden xl:flex items-center gap-2 whitespace-nowrap group">
            <Cpu className="w-4 h-4 text-matrix/60" />
            <span className="text-gray-500 text-[10px]">HASH:</span>
            <span className="text-matrix/80">
              {data ? `${(data.hashrate / 1e18).toFixed(2)} EH/s` : '--'}
            </span>
          </div>

        </div>

        {/* System Time */}
        <div className="hidden md:block">
          <span className="font-mono text-[10px] text-gray-600">
            {new Date().toLocaleTimeString('es-MX', { hour12: false })}
          </span>
        </div>
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] z-20" />
    </div>
  );
};

