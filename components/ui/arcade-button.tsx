import Link from "next/link";
import React from "react";

interface ArcadeButtonProps {
  href: string;
  children: React.ReactNode;
  target?: string;
}

export default function ArcadeButton({ href, children, target = "_blank" }: ArcadeButtonProps) {
  return (
    <div className="relative group z-10">
      {/* Efecto de resplandor (Glow) detrás del botón */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-yellow-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200 group-hover:duration-200 animate-tilt"></div>
      
      <Link
        href={href}
        target={target}
        rel="noopener noreferrer"
        className="relative inline-flex items-center justify-center px-12 py-6 text-3xl font-bold text-white transition-all duration-200 bg-gray-900 font-vt323 border-2 border-orange-500 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 hover:scale-105 active:scale-95"
        style={{
          textShadow: "0 0 5px rgba(255, 165, 0, 0.7), 0 0 10px rgba(255, 165, 0, 0.5)",
          boxShadow: "inset 0 0 15px rgba(255, 69, 0, 0.3)"
        }}
      >
        {/* Elemento decorativo de línea de escaneo (Scanline) */}
        <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-50 animate-[scanline_2s_linear_infinite]"></span>
        
        <span className="flex items-center gap-3">
          {children}
          {/* Icono decorativo de "Power" o "Play" */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
      </Link>
    </div>
  );
}
