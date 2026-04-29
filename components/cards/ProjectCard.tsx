"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, GitFork, ExternalLink, Zap, MapPin, Users, ChevronDown, ChevronUp, Check, Sparkles, Target, Rocket } from "lucide-react";
import StatusBadge from "@/components/badges/StatusBadge";
import { ESTADO_CONFIG, HACKATHON_CONFIG, TIPO_CONFIG, type Proyecto } from "@/lib/proyectos";

interface ProjectCardProps {
  proyecto: Proyecto;
  index: number;
}

export default function ProjectCard({ proyecto, index }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const estadoConfig = ESTADO_CONFIG[proyecto.estado];
  const tipoConfig = TIPO_CONFIG[proyecto.tipo];
  const hasUrl = !!proyecto.url;
  const hasRepo = !!proyecto.repoUrl;

  // Staggered animation delay
  const animationDelay = `${index * 80}ms`;

  return (
    <Card
      className={`group relative overflow-hidden bg-black/60 backdrop-blur-md border border-white/10 hover:border-bitcoin/30 transition-all duration-500 ${estadoConfig.glowColor} hover:shadow-[0_0_40px_rgba(247,147,26,0.12)]`}
      style={{ animationDelay }}
    >
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-matrix/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-matrix/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-matrix/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-matrix/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header Image */}
      {proyecto.imagen && !imageError && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={proyecto.imagen}
            alt={proyecto.nombre}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            onError={() => setImageError(true)}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* Hackathon Badge */}
          {proyecto.hackathon?.lugar && (
            <div className="absolute top-3 right-3">
              <div className={`px-3 py-1.5 rounded-full border bg-black/80 backdrop-blur-md ${HACKATHON_CONFIG[proyecto.hackathon.lugar].color} border-current`}>
                <span className="text-sm">{HACKATHON_CONFIG[proyecto.hackathon.lugar].icon}</span>
                <span className="ml-1 text-[10px] font-mono font-bold uppercase tracking-wider">
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
      )}

      <div className="p-6 space-y-4">
        {/* Title Row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className={`relative w-10 h-10 rounded-lg border ${tipoConfig.borderColor} ${tipoConfig.bgColor} flex items-center justify-center overflow-hidden flex-shrink-0`}>
              {!imageError ? (
                <img
                  src={proyecto.logo}
                  alt={proyecto.nombre}
                  className="w-full h-full object-contain p-1"
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
              ) : (
                <span className="font-vt323 text-lg text-bitcoin">
                  {proyecto.nombre.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-bitcoin transition-colors">
                {proyecto.nombre}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${tipoConfig.bgColor} ${tipoConfig.color} ${tipoConfig.borderColor}`}>
                  {tipoConfig.label}
                </span>
                {!proyecto.imagen && <StatusBadge estado={proyecto.estado} />}
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
              className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-gray-500 uppercase tracking-wider"
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

        {/* Metrics (for internal projects) */}
        {proyecto.metricas && proyecto.metricas.length > 0 && (
          <div className="grid grid-cols-4 gap-2 py-2 border-y border-white/5">
            {proyecto.metricas.map((m) => (
              <div key={m.label} className="text-center">
                <div className="font-vt323 text-lg text-bitcoin">{m.valor}</div>
                <div className="text-[9px] font-mono text-gray-600 uppercase">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Team / Location (for community projects) */}
        {proyecto.equipo && proyecto.equipo.length > 0 && (
          <div className="flex items-center gap-3 text-[10px] font-mono text-gray-500">
            <Users className="h-3 w-3" />
            <span>{proyecto.equipo[0].nombre}</span>
            {proyecto.equipo[0].ubicacion && (
              <>
                <span className="text-gray-700">·</span>
                <MapPin className="h-3 w-3" />
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
              className="flex-1 h-9 bg-bitcoin hover:bg-bitcoin/90 text-black font-mono text-xs font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(247,147,26,0.2)]"
            >
              <a href={proyecto.url!} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5">
                <Zap className="h-3 w-3" />
                Visitar Proyecto
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </Button>
          ) : (
            <Button
              disabled
              className="flex-1 h-9 bg-white/5 text-gray-600 font-mono text-xs font-bold rounded-lg cursor-not-allowed border border-white/10"
            >
              <Sparkles className="h-3 w-3 mr-1.5" />
              Próximamente
            </Button>
          )}

          {hasRepo && (
            <Button
              asChild
              variant="outline"
              className="h-9 px-3 font-mono text-xs border-white/10 text-gray-400 hover:border-matrix/30 hover:text-matrix rounded-lg"
            >
              <a href={proyecto.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                <GitFork className="h-3.5 w-3.5" />
                Repo
              </a>
            </Button>
          )}
        </div>

        {/* Expand Review Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1.5 py-2 text-[10px] font-mono text-gray-500 hover:text-matrix transition-colors border-t border-white/5"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3 w-3" />
              Ocultar Review
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3" />
              Ver Review
            </>
          )}
        </button>

        {/* Expanded Review Section */}
        {expanded && (
          <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Fortalezas */}
            <div className="border-l-2 border-matrix/50 pl-3">
              <div className="flex items-center gap-1.5 mb-2">
                <Check className="h-3 w-3 text-matrix" />
                <span className="text-[10px] font-mono text-matrix uppercase tracking-wider font-bold">Fortalezas</span>
              </div>
              <ul className="space-y-1.5">
                {proyecto.review.fortalezas.map((f, i) => (
                  <li key={i} className="text-xs text-gray-400 font-mono leading-relaxed flex gap-2">
                    <span className="text-matrix flex-shrink-0">❯</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Oportunidades */}
            <div className="border-l-2 border-bitcoin/50 pl-3">
              <div className="flex items-center gap-1.5 mb-2">
                <Target className="h-3 w-3 text-bitcoin" />
                <span className="text-[10px] font-mono text-bitcoin uppercase tracking-wider font-bold">Oportunidades</span>
              </div>
              <ul className="space-y-1.5">
                {proyecto.review.oportunidades.map((o, i) => (
                  <li key={i} className="text-xs text-gray-400 font-mono leading-relaxed flex gap-2">
                    <span className="text-bitcoin flex-shrink-0">→</span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            {/* Impacto */}
            <div className="border-l-2 border-white/20 pl-3">
              <div className="flex items-center gap-1.5 mb-2">
                <Rocket className="h-3 w-3 text-gray-400" />
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider font-bold">Impacto</span>
              </div>
              <p className="text-xs text-gray-500 font-mono leading-relaxed italic">
                "{proyecto.review.impacto}"
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
