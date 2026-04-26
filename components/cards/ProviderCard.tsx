"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, MapPin, ExternalLink, Zap } from "lucide-react";
import TierBadge from "@/components/badges/TierBadge";
import { TIER_CONFIG, type Proveedor } from "@/lib/proveedores";

interface ProviderCardProps {
  proveedor: Proveedor;
  index: number;
}

export default function ProviderCard({ proveedor, index }: ProviderCardProps) {
  const [imageError, setImageError] = useState(false);
  const tierConfig = TIER_CONFIG[proveedor.tier];
  const hasReferido = !!proveedor.urlReferido;

  // Staggered animation delay
  const animationDelay = `${index * 50}ms`;

  return (
    <Card
      className={`group relative overflow-hidden bg-black/60 backdrop-blur-md border border-white/10 hover:border-bitcoin/30 transition-all duration-500 ${tierConfig.glowColor} hover:shadow-[0_0_30px_rgba(247,147,26,0.15)]`}
      style={{ animationDelay }}
    >
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-matrix/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-matrix/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-matrix/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-matrix/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6 space-y-4">
        {/* Header: Logo + Tier */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Logo Placeholder / Image */}
            <div className={`relative w-12 h-12 rounded-lg border ${tierConfig.borderColor} ${tierConfig.bgColor} flex items-center justify-center overflow-hidden`}>
              {!imageError ? (
                <img
                  src={proveedor.logo}
                  alt={proveedor.nombre}
                  className="w-full h-full object-contain p-1"
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
              ) : (
                <span className="font-vt323 text-lg text-bitcoin">
                  {proveedor.nombre.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-bitcoin transition-colors">
                {proveedor.nombre}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <TierBadge tier={proveedor.tier} />
              </div>
            </div>
          </div>

          {/* Destacado Badge */}
          {proveedor.destacado && (
            <div className="flex items-center gap-1 bg-bitcoin/10 border border-bitcoin/30 px-2 py-1 rounded-full">
              <Zap className="h-3 w-3 text-bitcoin" />
              <span className="text-[9px] font-mono text-bitcoin uppercase tracking-wider">Destacado</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="font-mono text-xs text-gray-400 leading-relaxed line-clamp-3">
          {proveedor.descripcion}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {proveedor.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-gray-500 uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
          <MapPin className="h-3 w-3" />
          {proveedor.ubicacion}
        </div>

        {/* CTA Buttons */}
        <div className="pt-2 flex gap-2">
          <Button
            asChild
            variant="default"
            className={`flex-1 h-9 font-mono text-xs font-bold rounded-lg transition-all ${
              hasReferido
                ? "bg-bitcoin hover:bg-bitcoin/90 text-black"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
            }`}
          >
            <a
              href={hasReferido ? proveedor.urlReferido : proveedor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5"
            >
              {hasReferido ? (
                <>
                  Visitar <ArrowUpRight className="h-3 w-3" />
                </>
              ) : (
                <>
                  Visitar <ExternalLink className="h-3 w-3" />
                </>
              )}
            </a>
          </Button>

          {hasReferido && (
            <Button
              asChild
              variant="outline"
              className="h-9 px-3 font-mono text-[10px] border-matrix/30 text-matrix hover:bg-matrix/10 rounded-lg"
            >
              <a
                href={proveedor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                Directo
              </a>
            </Button>
          )}
        </div>

        {/* Referido Note */}
        {hasReferido && (
          <p className="text-[9px] text-gray-600 font-mono text-center">
            <span className="text-bitcoin">❯</span> Link con referido — apoyas al proyecto
          </p>
        )}
      </div>
    </Card>
  );
}
