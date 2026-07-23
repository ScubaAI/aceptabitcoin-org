'use client';

import React from "react";

interface AceptaBitcoinLogoProps {
  className?: string;
  variant?: "standard" | "neon";
}

/**
 * Glifo oficial del símbolo Bitcoin (₿) — brand assets de bitcoin.org
 * (viewBox 32×32). NO se hace a mano: el path oficial es el canon del
 * ecosistema y cualquier versión casera queda peor.
 */
const BITCOIN_GLYPH =
  "M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z";

export default function AceptaBitcoinLogo({
  className = "w-64 h-auto",
  variant = "standard",
}: AceptaBitcoinLogoProps) {
  const isNeon = variant === "neon";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 420 130"
      className={className}
      role="img"
      aria-label="Acepta Bitcoin México"
    >
      <defs>
        {/* Glow reutilizable para modo neon (texto y elementos) */}
        <filter id="ab-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradiente Bitcoin usando variables CSS (Cero hex hardcodeados) */}
        <linearGradient id="ab-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--bitcoin)" />
          <stop offset="50%" stopColor="var(--bitcoin)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--bitcoin)" />
        </linearGradient>
      </defs>

      {/* Moneda — círculo en ambas variantes (consistencia de marca) */}
      <g transform="translate(10, 10)">
        <circle
          cx="55"
          cy="55"
          r="54"
          fill={isNeon ? "none" : "var(--bitcoin)"}
          stroke={isNeon ? "url(#ab-gradient)" : "none"}
          strokeWidth={isNeon ? "3" : "0"}
          filter={isNeon ? "url(#ab-glow)" : undefined}
          className={isNeon ? "animate-pulse" : undefined}
        />

        {/* Glifo ₿ escalado a 76×76 y centrado dentro del círculo */}
        <svg
          x="17"
          y="17"
          width="76"
          height="76"
          viewBox="0 0 32 32"
          fill={isNeon ? "url(#ab-gradient)" : "hsl(var(--foreground))"}
          filter={isNeon ? "url(#ab-glow)" : undefined}
          aria-hidden="true"
        >
          <path d={BITCOIN_GLYPH} />
        </svg>
      </g>

      {/* Wordmark */}
      <g transform="translate(140, 0)">
        <text
          x="0"
          y="68"
          fontFamily="var(--font-ibm-plex-serif), Georgia, serif"
          fontSize="52"
          fontWeight="700"
          fill={isNeon ? "url(#ab-gradient)" : "hsl(var(--foreground))"}
          filter={isNeon ? "url(#ab-glow)" : undefined}
          letterSpacing="0.5"
        >
          Acepta
        </text>
        <text
          x="0"
          y="108"
          fontFamily="var(--font-fira-code), monospace"
          fontSize="30"
          fontWeight="600"
          fill={isNeon ? "var(--bitcoin)" : "var(--matrix)"}
          letterSpacing="2"
        >
          México
        </text>
      </g>
    </svg>
  );
}