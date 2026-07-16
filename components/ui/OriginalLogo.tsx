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

        {/* Símbolo Bitcoin (₿) — rotación real del logo oficial: -12° */}
        <g
          transform="rotate(-12, 60, 60)"
          fill={isNeon ? "url(#neon-gradient)" : "#FFFFFF"}
          stroke={isNeon ? "url(#neon-gradient)" : "none"}
          strokeWidth={isNeon ? "2" : "0"}
          filter={isNeon ? "url(#neon-glow)" : "none"}
        >
          {/* Barras verticales superiores (serifs del ₿)
              Barra izquierda alineada con el borde izq. del tronco (x=36)
              Barra derecha alineada con la "cintura" entre los dos bumps (x=52) */}
          <rect x="36" y="19" width="8" height="15" rx="2.5" />
          <rect x="52" y="19" width="8" height="15" rx="2.5" />

          {/* Cuerpo de la B con fillRule="evenodd":
              CRÍTICO — sin esto los huecos internos se rellenan sólidos
              y la B queda como un bloque macizo (el bug original).
              Los sub-paths interiores "restan" área al exterior. */}
          <path
            fillRule="evenodd"
            d="
              M 36,34
              L 64,34
              C 76,34 81,39 81,47
              C 81,54 77,58 71,60
              C 78,62 83,68 83,76
              C 83,85 77,90 65,90
              L 36,90
              Z

              M 44,42
              L 62,42
              C 68,42 72,45 72,48
              C 72,52 68,55 62,55
              L 44,55
              Z

              M 44,63
              L 63,63
              C 70,63 74,67 74,73
              C 74,79 70,83 63,83
              L 44,83
              Z
            "
          />

          {/* Barras verticales inferiores (mismas x que las superiores) */}
          <rect x="36" y="90" width="8" height="15" rx="2.5" />
          <rect x="52" y="90" width="8" height="15" rx="2.5" />
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