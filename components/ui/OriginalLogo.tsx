import React from "react";

interface OriginalLogoProps {
  className?: string;
}

export default function OriginalLogo({ className = "w-32 h-auto" }: OriginalLogoProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 420 130" 
      className={className}
      aria-label="Acepta Bitcoin"
    >
      {/* Cuadrado redondeado naranja */}
      <rect x="10" y="10" width="110" height="110" rx="22" ry="22" fill="#E8772E"/>

      {/* Símbolo Bitcoin (₿) en blanco */}
      <g fill="#FFFFFF">
        {/* Cuerpo principal de la B */}
        <path d="M 42 38 L 68 38 C 76 38 80 42 80 48 C 80 53 77 56 73 58 C 78 59 82 63 82 69 C 82 76 77 80 69 80 L 42 80 Z
                 M 50 44 L 50 54 L 64 54 C 68 54 70 52 70 49 C 70 46 68 44 64 44 Z
                 M 50 60 L 50 74 L 66 74 C 71 74 73 72 73 68 C 73 64 71 60 66 60 Z"/>
        {/* Líneas verticales */}
        <rect x="46" y="30" width="4" height="12" rx="1"/>
        <rect x="46" y="76" width="4" height="12" rx="1"/>
        <rect x="60" y="30" width="4" height="12" rx="1"/>
        <rect x="60" y="76" width="4" height="12" rx="1"/>
      </g>

      {/* Texto "Acepta" en verde */}
      <text x="135" y="62" fontFamily="Arial, Helvetica, sans-serif" fontSize="46" fontWeight="bold" fill="#7CB342" letterSpacing="1">
        Acepta
      </text>

      {/* Texto "Bitcoin.org" en verde */}
      <text x="135" y="108" fontFamily="Arial, Helvetica, sans-serif" fontSize="46" fontWeight="bold" fill="#7CB342" letterSpacing="1">
        Bitcoin.org
      </text>
    </svg>
  );
}
