"use client";

import React from "react";

export default function MatrixLogo() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center rounded bg-bitcoin text-black shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-transform group-hover:scale-105 border border-white/10 overflow-hidden">
      <span className="text-2xl font-bold relative z-10">₿</span>
      
      {/* Efecto de lluvia de código Matrix en el fondo del logo */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-matrix to-transparent animate-[matrix-fall_2s_linear_infinite]" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-0 left-2/4 w-[1px] h-full bg-gradient-to-b from-transparent via-matrix to-transparent animate-[matrix-fall_2.5s_linear_infinite]" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-matrix to-transparent animate-[matrix-fall_1.8s_linear_infinite]" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Destello en la esquina */}
      <div className="absolute top-0 right-0 -mt-1 -mr-1 h-2 w-2 rounded-full bg-matrix shadow-[0_0_10px_rgba(0,255,65,0.8)]"></div>
    </div>
  );
}
