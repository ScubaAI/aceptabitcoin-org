"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, GitFork, Zap, MapPin, Users, ChevronDown, ChevronUp, 
  Check, Target, Rocket, Trophy, Medal, Award, Code 
} from "lucide-react";
import StatusBadge from "@/components/badges/StatusBadge";
import { ESTADO_CONFIG, HACKATHON_CONFIG, TIPO_CONFIG, type Proyecto, type HackathonLugar } from "@/lib/proyectos";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  proyecto: Proyecto;
  index?: number; // Opcional, para animaciones escalonadas si se usa en grid
}

// Mapeo semántico de iconos para hackathons (Regla V3: No emojis en chrome)
const getHackathonIcon = (lugar: HackathonLugar) => {
  switch (lugar) {
    case "winner": return <Trophy className="h-3.5 w-3.5" />;
    case "second": return <Medal className="h-3.5 w-3.5" />;
    case "third": return <Award className="h-3.5 w-3.5" />;
    default: return <Code className="h-3.5 w-3.5" />;
  }
};

export default function ProjectCard({ proyecto, index = 0 }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [coverImageError, setCoverImageError] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  const estadoConfig = ESTADO_CONFIG[proyecto.estado];
  const tipoConfig = TIPO_CONFIG[proyecto.tipo];
  const hasUrl = !!proyecto.url;
  const hasRepo = !!proyecto.repoUrl;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden bg-black/80 backdrop-blur-md border border-white/10",
        "hover:border-bitcoin/40 transition-all duration-500",
        // Regla V3 §2.4: Usar tokens de sombra, no inline shadows
        "hover:shadow-bitcoin-hover"
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Corner Accents - Regla V3 §4.5: Solo pareja diagonal (top-right + bottom-left) */}
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-matrix/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-matrix/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Header Image */}
      {proyecto.imagen && !coverImageError ? (
        <div className="relative h-48 overflow-hidden">
          <img
            src={proyecto.imagen}
            alt={proyecto.nombre}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            onError={() => setCoverImageError(true)}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          
          {/* Hackathon Badge */}
          {proyecto.hackathon?.lugar && (
            <div className="absolute top-3 right-3">
              <div className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-black/90 backdrop-blur-md",
                HACKATHON_CONFIG[proyecto.hackathon.lugar].color,
                "border-current"
              )}>
                {getHackathonIcon(proyecto.hackathon.lugar)}
                <span className="text-[10px] font-vt323 uppercase tracking-wider font-bold">
                  {HACKATHON_CONFIG[proyecto.hackathon.lugar].label}
                </span>
              </div>
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <StatusBadge estado={proyecto.estado} />
          </div>
        </div>
      ) : (
        // Fallback si no hay imagen o falla la carga
        <div className="relative h-48 bg-gradient-to-br from-black via-gray-950 to-black flex items-center justify-center border-b border-white/10">
          <div className="absolute inset-0 bg-matrix-grid bg-grid-50 opacity-10" />
          <div className="absolute top-3 left-3">
            <StatusBadge estado={proyecto.estado} />
          </div>
          {proyecto.hackathon?.lugar && (
            <div className="absolute top-3 right-3">
              <div className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-black/90 backdrop-blur-md",
                HACKATHON_CONFIG[proyecto.hackathon.lugar].color,
                "border-current"
              )}>
                {getHackathonIcon(proyecto.hackathon.lugar)}
                <span className="text-[10px] font-vt323 uppercase tracking-wider font-bold">
                  {HACKATHON_CONFIG[proyecto.hackathon.lugar].label}
                </span>
              </div>
            </div>
          )}
          <span className="font-serif text-6xl text-white/10 group-hover:text-bitcoin/20 transition-colors duration-500">
            {proyecto.nombre.charAt(0)}
          </span>
        </div>
      )}

      <div className="p-6 space-y-4">
        {/* Title Row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className={cn(
              "relative w-10 h-10 rounded-lg border flex items-center justify-center overflow-hidden flex-shrink-0 bg-black/50",
              tipoConfig.borderColor, tipoConfig.bgColor
            )}>
              {!logoError && proyecto.logo ? (
                <img
                  src={proyecto.logo}
                  alt={`Logo de ${proyecto.nombre}`}
                  className="w-full h-full object-contain p-1.5"
                  onError={() => setLogoError(true)}
                  loading="lazy"
                />
              ) : (
                <span className="font-vt323 text-xl text-bitcoin">
                  {proyecto.nombre.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-bitcoin transition-colors">
                {proyecto.nombre}
              </h3>
              <div className="flex items-center gap-2 mt-1.5">
                <span className={cn(
                  "text-[10px] font-vt323 uppercase tracking-wider px-2 py-0.5 rounded border",
                  tipoConfig.bgColor, tipoConfig.color, tipoConfig.borderColor
                )}>
                  {tipoConfig.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Short Description */}
        <p className="font-mono text-xs text-gray-400 leading-relaxed">
          {proyecto.descripcionCorta}
        </p>

        {/* Stack Tags */}
        <div className="flex flex-wrap gap-1.5">
          {proyecto.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-gray-500 uppercase tracking-wider hover:border-matrix/30 hover:text-matrix transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
          {proyecto.stack.length > 5 && (
            <span className="px-2 py-0.5 text-[9px] font-mono text-gray-600">
              +{proyecto.stack.length - 5}
            </span>
          )}
        </div>

        {/* Métricas y Validación (Aplica a cualquier proyecto que las tenga) */}
        {proyecto.metricas && proyecto.metricas.length > 0 && (
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10">
            {proyecto.metricas.map((m) => (
              <div key={m.label} className="text-center">
                <div className="font-vt323 text-lg text-bitcoin">{m.valor}</div>
                <div className="text-[9px] font-mono text-gray-600 uppercase tracking-wider">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Team / Location */}
        {proyecto.equipo && proyecto.equipo.length > 0 && (
          <div className="flex items-center gap-3 text-[10px] font-mono text-gray-500">
            <Users className="h-3 w-3 text-matrix" />
            <span className="truncate">{proyecto.equipo[0].nombre}</span>
            {proyecto.equipo[0].ubicacion && (
              <>
                <span className="text-gray-700">·</span>
                <MapPin className="h-3 w-3 text-bitcoin" />
                <span>{proyecto.equipo[0].ubicacion}</span>
              </>
            )}
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex gap-2 pt-2">
          {hasUrl ? (
            <Button
              asChild
              // Regla V3 §2.4: Token de sombra en lugar de inline
              className="flex-1 h-9 bg-bitcoin hover:bg-bitcoin/90 text-black font-mono text-xs font-bold rounded-lg transition-all shadow-bitcoin hover:shadow-bitcoin-hover"
            >
              <a href={proyecto.url!} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5">
                <Zap className="h-3 w-3" />
                Visitar
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </Button>
          ) : (
            <Button
              disabled
              className="flex-1 h-9 bg-white/5 text-gray-600 font-mono text-xs font-bold rounded-lg cursor-not-allowed border border-white/10"
            >
              Próximamente
            </Button>
          )}

          {hasRepo && (
            <Button
              asChild
              variant="outline"
              className="h-9 px-3 font-mono text-xs border-white/10 text-gray-400 hover:border-matrix/30 hover:text-matrix hover:bg-matrix/5 rounded-lg transition-all"
            >
              <a href={proyecto.repoUrl!} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                <GitFork className="h-3.5 w-3.5" />
                Código
              </a>
            </Button>
          )}
        </div>

        {/* Expand Review Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1.5 py-2 text-[10px] font-mono text-gray-500 hover:text-matrix transition-colors border-t border-white/10 group/btn mt-2"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3 w-3 group-hover/btn:text-matrix transition-colors" />
              Ocultar Review
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3 group-hover/btn:text-matrix transition-colors" />
              Ver Review Técnica
            </>
          )}
        </button>

        {/* Expanded Review Section */}
        {expanded && proyecto.review && (
          <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Fortalezas */}
            <div className="border-l-2 border-matrix/50 pl-3">
              <div className="flex items-center gap-1.5 mb-2">
                <Check className="h-3 w-3 text-matrix" />
                <span className="text-[10px] font-vt323 text-matrix uppercase tracking-wider font-bold">Fortalezas</span>
              </div>
              <ul className="space-y-1.5">
                {proyecto.review.fortalezas.map((f, i) => (
                  <li key={i} className="text-xs text-gray-400 font-mono leading-relaxed flex gap-2">
                    <span className="text-matrix flex-shrink-0 mt-0.5">▸</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Oportunidades */}
            <div className="border-l-2 border-bitcoin/50 pl-3">
              <div className="flex items-center gap-1.5 mb-2">
                <Target className="h-3 w-3 text-bitcoin" />
                <span className="text-[10px] font-vt323 text-bitcoin uppercase tracking-wider font-bold">Oportunidades</span>
              </div>
              <ul className="space-y-1.5">
                {proyecto.review.oportunidades.map((o, i) => (
                  <li key={i} className="text-xs text-gray-400 font-mono leading-relaxed flex gap-2">
                    <span className="text-bitcoin flex-shrink-0 mt-0.5">▸</span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            {/* Impacto */}
            <div className="border-l-2 border-white/20 pl-3">
              <div className="flex items-center gap-1.5 mb-2">
                <Rocket className="h-3 w-3 text-gray-400" />
                <span className="text-[10px] font-vt323 text-gray-400 uppercase tracking-wider font-bold">Impacto</span>
              </div>
              <p className="text-xs text-gray-500 font-mono leading-relaxed italic border border-white/5 bg-white/5 p-3 rounded">
                "{proyecto.review.impacto}"
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}