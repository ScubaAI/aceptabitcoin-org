import React from "react";

interface OriginalLogoProps {
  className?: string;
  variant?: "standard" | "neon";
}

export default function OriginalLogo({ 
  className = "w-32 h-auto",
  variant = "standard"
}: OriginalLogoProps) {
  
  const isNeon = variant === "neon";
  
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 420 130" 
      className={className}
      aria-label="Acepta Bitcoin"
    >
      {/* Definiciones de filtros y gradients */}
      <defs>
        {/* Glow effect para versión neon */}
        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Gradiente neon */}
        <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7931A" />
          <stop offset="50%" stopColor="#FFB347" />
          <stop offset="100%" stopColor="#F7931A" />
        </linearGradient>
      </defs>

      {/* Icono Bitcoin - Versión corregida con inclinación real */}
      <g transform="translate(15, 12)">
        {/* Círculo/Rectángulo de fondo */}
        {isNeon ? (
          // Versión Neon: Círculo con glow
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="url(#neon-gradient)"
            strokeWidth="3"
            filter="url(#neon-glow)"
            className="animate-pulse"
          />
        ) : (
          // Versión Standard: Rectángulo redondeado
          <rect 
            x="8" 
            y="8" 
            width="104" 
            height="104" 
            rx="20" 
            fill="#F7931A"
            className="drop-shadow-[0_0_15px_rgba(247,147,26,0.4)]"
          />
        )}

        {/* Símbolo Bitcoin (₿) con inclinación corregida */}
        <g 
          transform="rotate(-9, 60, 60)" 
          fill={isNeon ? "url(#neon-gradient)" : "#FFFFFF"}
          stroke={isNeon ? "url(#neon-gradient)" : "none"}
          strokeWidth={isNeon ? "2" : "0"}
          filter={isNeon ? "url(#neon-glow)" : "none"}
        >
          {/* 
            Bitcoin Symbol Geometry - Versión simplificada y precisa
            Construida para verse bien con la rotación aplicada
          */}
          
          {/* Líneas verticales superiores */}
          <rect x="38" y="18" width="5" height="16" rx="2" />
          <rect x="57" y="18" width="5" height="16" rx="2" />
          
          {/* Cuerpo de la B - simplificado */}
          <path d="
            M 35 34 
            L 68 34 
            C 76 34, 80 39, 80 46 
            C 80 52, 77 56, 72 58 
            C 78 60, 82 65, 82 73 
            C 82 82, 76 87, 67 87 
            L 35 87 
            Z
            M 43 42 
            L 43 54 
            L 64 54 
            C 68 54, 71 51, 71 47 
            C 71 44, 68 42, 64 42 
            Z
            M 43 61 
            L 43 79 
            L 64 79 
            C 69 79, 72 76, 72 71 
            C 72 66, 69 61, 64 61 
            Z
          " />
          
          {/* Líneas verticales inferiores */}
          <rect x="38" y="87" width="5" height="16" rx="2" />
          <rect x="57" y="87" width="5" height="16" rx="2" />
        </g>
      </g>

      {/* Texto "Acepta" */}
      <text 
        x="140" 
        y={isNeon ? "68" : "65"} 
        fontFamily="IBM Plex Serif, Georgia, serif" 
        fontSize={isNeon ? "52" : "48"} 
        fontWeight="700" 
        fill={isNeon ? "url(#neon-gradient)" : "#FAFAFA"}
        filter={isNeon ? "url(#neon-glow)" : "none"}
        letterSpacing="0.5"
        style={{
          textShadow: isNeon ? "0 0 20px rgba(247,147,26,0.6)" : "0 0 10px rgba(255,255,255,0.1)"
        }}
      >
        Acepta
      </text>

      {/* Texto "Bitcoin.org" */}
      <text 
        x="140" 
        y={isNeon ? "113" : "110"} 
        fontFamily="Fira Code, monospace" 
        fontSize={isNeon ? "34" : "32"} 
        fontWeight="600" 
        fill={isNeon ? "#FFB347" : "#00FF41"}
        letterSpacing="1"
        style={{
          textShadow: isNeon ? "0 0 15px rgba(255,179,71,0.5)" : "none"
        }}
      >
        Bitcoin.org
      </text>
    </svg>
  );
}