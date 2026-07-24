"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ExternalLink, Filter, Search, Trophy, Users, GitFork, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type Proyecto,
  type EstadoProyecto,
  filterByStatus,
  sortProyectos,
  ESTADO_CONFIG,
  TIPO_CONFIG,
} from "@/lib/proyectos";

// ── Project Card Component (V3 Cypherpunk Bank) ──
function ProjectCard({ proyecto, isWinner = false }: { proyecto: Proyecto; isWinner?: boolean }) {
  const estadoConfig = ESTADO_CONFIG[proyecto.estado];
  const tipoConfig = TIPO_CONFIG[proyecto.tipo];

  return (
    <div
      className={cn(
        "group relative bg-black/80 backdrop-blur-md border rounded-xl overflow-hidden transition-all duration-300",
        isWinner 
          ? "border-bitcoin/40 shadow-bitcoin hover:shadow-bitcoin-hover" 
          : "border-white/10 hover:border-matrix/40 hover:shadow-matrix"
      )}
    >
      {/* Header con textura de grid */}
      <div className="relative h-40 bg-gradient-to-br from-black via-gray-950 to-black overflow-hidden">
        <div className="absolute inset-0 bg-matrix-grid bg-grid-50 opacity-20" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn(
            "text-5xl font-serif font-bold opacity-40 group-hover:opacity-80 transition-all duration-300",
            isWinner ? "text-bitcoin" : "text-matrix"
          )}>
            {proyecto.nombre.charAt(0)}
          </div>
        </div>

        {/* Badges Superiores */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span
            className={cn(
              "px-2 py-1 rounded text-[10px] font-vt323 uppercase tracking-wider flex items-center gap-1.5 border",
              estadoConfig.bgColor,
              estadoConfig.color,
              estadoConfig.borderColor
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", proyecto.estado === "active" ? "bg-current animate-pulse" : "bg-current")} />
            {estadoConfig.label}
          </span>

          <span
            className={cn(
              "px-2 py-1 rounded text-[10px] font-vt323 uppercase tracking-wider border",
              tipoConfig.bgColor,
              tipoConfig.color,
              tipoConfig.borderColor
            )}
          >
            {tipoConfig.label}
          </span>
        </div>

        {/* Badge de Ganador */}
        {isWinner && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 rounded text-[10px] font-vt323 uppercase tracking-wider flex items-center gap-1.5 bg-bitcoin/10 border border-bitcoin/40 text-bitcoin shadow-terminal">
              <Award className="w-3 h-3" />
              Ganador
            </span>
          </div>
        )}
        
        {/* Premio (Fallback si no es winner explícito pero tiene premio) */}
        {proyecto.premio && !isWinner && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-black/90 backdrop-blur-sm border border-yellow-400/30 rounded px-3 py-1.5">
              <p className="text-[10px] font-vt323 uppercase tracking-wider text-yellow-400 text-center">
                {proyecto.premio}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-serif text-xl text-white group-hover:text-bitcoin transition-colors duration-300">
            {proyecto.nombre}
          </h3>
          <p className="text-sm font-mono text-gray-400 mt-2 line-clamp-2 leading-relaxed">
            {proyecto.descripcionCorta}
          </p>
        </div>

        {/* Stack Tecnológico */}
        <div className="flex flex-wrap gap-1.5">
          {proyecto.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[9px] font-mono bg-matrix/5 text-matrix/70 border border-matrix/20 rounded"
            >
              {tech}
            </span>
          ))}
          {proyecto.stack.length > 4 && (
            <span className="px-2 py-0.5 text-[9px] font-mono text-gray-500">
              +{proyecto.stack.length - 4}
            </span>
          )}
        </div>

        {/* Metadatos del Hackathon */}
        {proyecto.hackathon && (
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 border-t border-white/5 pt-3">
            <Trophy className="w-3 h-3 text-bitcoin" />
            <span>{proyecto.hackathon.evento}</span>
            <span>•</span>
            <span>{proyecto.hackathon.año}</span>
          </div>
        )}

        {/* Equipo */}
        {proyecto.equipo && proyecto.equipo.length > 0 && (
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
            <Users className="w-3 h-3" />
            <span className="truncate">
              {proyecto.equipo.map((m) => m.nombre).join(", ")}
            </span>
          </div>
        )}

        {/* Acciones */}
        <div className="flex gap-2 pt-2">
          {proyecto.url && (
            <Link
              href={proyecto.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-mono font-bold bg-bitcoin text-black hover:bg-bitcoin/90 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Demo
            </Link>
          )}
          {proyecto.repoUrl && (
            <Link
              href={proyecto.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-mono border border-matrix/30 text-matrix hover:bg-matrix/10 transition-colors"
            >
              <GitFork className="w-3 h-3" />
              Código
            </Link>
          )}
          {!proyecto.url && !proyecto.repoUrl && (
            <span className="flex-1 text-center text-[10px] font-mono text-gray-600 py-2 border border-white/5 rounded">
              Sin enlaces públicos
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Client Component ──
interface ProyectosClientProps {
  proyectos: Proyecto[];
  isWinnersShowcase?: boolean;
}

export default function ProyectosClient({ proyectos, isWinnersShowcase = false }: ProyectosClientProps) {
  const [statusFilter, setStatusFilter] = useState<EstadoProyecto | "todos">("todos");
  const [searchQuery, setSearchQuery] = useState("");

  // ── Filtrado y Ordenamiento ──
  const filteredProjects = useMemo(() => {
    return sortProyectos(
      filterByStatus(proyectos, statusFilter)
    ).filter((p) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.nombre.toLowerCase().includes(q) ||
        p.descripcionCorta.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [proyectos, statusFilter, searchQuery]);

  // ── Vista de Podio (Solo para la página principal de ganadores) ──
  if (isWinnersShowcase && filteredProjects.length > 0) {
    const winner = filteredProjects.find(p => p.hackathon?.lugar === "winner" || (p as any).puesto === 1);
    const runnersUp = filteredProjects.filter(p => p !== winner);

    return (
      <div className="relative space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* 2do Lugar (Izquierda) */}
          {runnersUp[0] && (
            <div className="md:mt-8 order-2 md:order-1">
              <ProjectCard proyecto={runnersUp[0]} />
            </div>
          )}
          
          {/* 1er Lugar (Centro, Elevado) */}
          {winner ? (
            <div className="order-1 md:order-2 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <span className="px-3 py-1 bg-bitcoin text-black text-[10px] font-vt323 uppercase tracking-wider font-bold rounded-full shadow-bitcoin flex items-center gap-1.5">
                  <Trophy className="w-3 h-3" />
                  Primer Lugar
                </span>
              </div>
              <div className="relative z-0">
                <ProjectCard proyecto={winner} isWinner={true} />
              </div>
            </div>
          ) : (
            runnersUp[0] && (
              <div className="order-1 md:order-2 relative">
                 <ProjectCard proyecto={runnersUp[0]} isWinner={true} />
              </div>
            )
          )}

          {/* 3er Lugar (Derecha) */}
          {runnersUp[1] && (
            <div className="md:mt-12 order-3 md:order-3">
              <ProjectCard proyecto={runnersUp[1]} />
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Vista de Cuadrícula con Filtros (Para la página de Historial) ──
  return (
    <div className="relative space-y-8">
      {/* Filtros (Estilo V3) */}
      <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 space-y-4">
        <div className="flex items-center gap-2 text-matrix">
          <Filter className="w-4 h-4" />
          <span className="text-[10px] font-vt323 uppercase tracking-wider">Filtros del Sistema</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar por nombre, descripción o stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-2.5 text-sm font-mono text-white placeholder:text-gray-600 focus:outline-none focus:border-matrix focus:ring-1 focus:ring-matrix transition-colors"
            />
          </div>

          {/* Filtro de Estado */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as EstadoProyecto | "todos")}
            className="bg-white/5 border border-white/20 rounded-lg px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-matrix focus:ring-1 focus:ring-matrix transition-colors appearance-none cursor-pointer"
          >
            <option value="todos" className="bg-black">Todos los estados</option>
            <option value="active" className="bg-black">● Activo</option>
            <option value="development" className="bg-black">◐ En Desarrollo</option>
            <option value="abandoned" className="bg-black">○ Pausado</option>
          </select>
        </div>
      </div>

      {/* Grid de Proyectos */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proyecto) => (
            <ProjectCard key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>
      ) : (
        /* Estado Vacío (In-Character V3) */
        <div className="text-center py-20 space-y-4 border border-white/5 rounded-lg bg-black/40">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-matrix/5 border border-matrix/20 mb-2">
            <Search className="w-8 h-8 text-matrix/60" />
          </div>
          <p className="font-mono text-matrix text-sm uppercase tracking-wider">
            Sin resultados en la base de datos
          </p>
          <p className="font-mono text-gray-500 text-xs max-w-md mx-auto">
            No se encontraron proyectos que coincidan con los parámetros de búsqueda.
          </p>
          <button
            onClick={() => {
              setStatusFilter("todos");
              setSearchQuery("");
            }}
            className="mt-4 text-matrix font-mono text-xs hover:text-white hover:underline transition-colors"
          >
            &gt; Reiniciar filtros del sistema
          </button>
        </div>
      )}
    </div>
  );
}