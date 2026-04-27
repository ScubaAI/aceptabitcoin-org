"use client";

import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Code2, Zap, Users, Activity, GitBranch, Search, Sparkles } from "lucide-react";
import ProjectCard from "@/components/cards/ProjectCard";
import ProjectSkeleton from "@/components/cards/ProjectSkeleton";
import TypeFilter from "@/components/filters/TypeFilter";
import MatrixRain from "@/components/ui/MatrixRain";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { type Proyecto, type TipoProyecto, getStats } from "@/lib/proyectos";

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState<TipoProyecto | "todos">("todos");
  const [searchQuery, setSearchQuery] = useState("");

  // Load data
  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/data/proyectos.json");
        const data: Proyecto[] = await response.json();
        // Sort by date descending
        const sorted = data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        setProyectos(sorted);
      } catch (error) {
        console.error("Error loading proyectos:", error);
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    }
    load();
  }, []);

  // Filtered results
  const filtered = useMemo(() => {
    let result = proyectos;
    
    if (activeType !== "todos") {
      result = result.filter((p) => p.tipo === activeType);
    }
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.descripcion.toLowerCase().includes(q) ||
          p.descripcionCorta.toLowerCase().includes(q) ||
          p.stack.some((s) => s.toLowerCase().includes(q))
      );
    }
    
    return result;
  }, [proyectos, activeType, searchQuery]);

  // Stats
  const stats = useMemo(() => getStats(proyectos), [proyectos]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black relative overflow-hidden">
        {/* Background Effects */}
        <MatrixRain className="opacity-15" speed={0.4} density={12} />
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(0, 255, 65, 0.05) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-bitcoin/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-matrix/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
          
          {/* ═══════════════════════════════════════════════════════
              HEADER
              ═══════════════════════════════════════════════════════ */}
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 bg-bitcoin/10 border border-bitcoin/30 px-4 py-1.5 rounded-full text-bitcoin text-xs font-bold uppercase tracking-[0.2em] font-mono">
              <Code2 className="h-3 w-3" />
              Ecosistema de Desarrollo
            </div>

            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight">
              Proyectos{" "}
              <span className="text-matrix drop-shadow-[0_0_25px_rgba(0,255,65,0.4)]">
                Bitcoin
              </span>
            </h1>

            <p className="font-mono text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Software sovereign construido por y para la comunidad Bitcoin de México.
              <br />
              <span className="text-bitcoin">Código abierto. Sin permiso. Sin límites.</span>
            </p>
          </div>

          {/* ═══════════════════════════════════════════════════════
              STATS BAR
              ═══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
            <Card className="bg-black/60 border border-white/10 p-4 text-center backdrop-blur-md">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Code2 className="h-4 w-4 text-matrix" />
                <span className="font-vt323 text-2xl text-white">{stats.total}</span>
              </div>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Proyectos</p>
            </Card>
            <Card className="bg-black/60 border border-bitcoin/20 p-4 text-center backdrop-blur-md">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-bitcoin" />
                <span className="font-vt323 text-2xl text-bitcoin">{stats.internos}</span>
              </div>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Internos</p>
            </Card>
            <Card className="bg-black/60 border border-matrix/20 p-4 text-center backdrop-blur-md">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="h-4 w-4 text-matrix" />
                <span className="font-vt323 text-2xl text-matrix">{stats.comunidad}</span>
              </div>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Comunidad</p>
            </Card>
            <Card className="bg-black/60 border border-green-500/20 p-4 text-center backdrop-blur-md">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Activity className="h-4 w-4 text-green-400" />
                <span className="font-vt323 text-2xl text-green-400">{stats.activos}</span>
              </div>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Activos</p>
            </Card>
            <Card className="bg-black/60 border border-white/10 p-4 text-center backdrop-blur-md">
              <div className="flex items-center justify-center gap-2 mb-1">
                <GitBranch className="h-4 w-4 text-bitcoin" />
                <span className="font-vt323 text-2xl text-bitcoin">{stats.enDesarrollo}</span>
              </div>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">En Dev</p>
            </Card>
          </div>

          {/* ═══════════════════════════════════════════════════════
              FILTERS & SEARCH
              ═══════════════════════════════════════════════════════ */}
          <div className="space-y-6 mb-12">
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar proyectos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-3 text-sm font-mono text-white placeholder-gray-600 focus:border-bitcoin focus:ring-1 focus:ring-bitcoin/50 outline-none transition-all"
              />
            </div>

            {/* Type Filter */}
            <TypeFilter
              active={activeType}
              onChange={setActiveType}
              counts={{
                todos: stats.total,
                interno: stats.internos,
                comunidad: stats.comunidad,
              }}
            />
          </div>

          {/* ═══════════════════════════════════════════════════════
              RESULTS COUNT
              ═══════════════════════════════════════════════════════ */}
          <div className="flex items-center justify-between mb-6">
            <p className="font-mono text-xs text-gray-500">
              <span className="text-bitcoin">❯</span> Mostrando{" "}
              <span className="text-white font-bold">{filtered.length}</span> de{" "}
              <span className="text-white">{proyectos.length}</span> proyectos
              {searchQuery && (
                <span className="text-matrix"> | Búsqueda: "{searchQuery}"</span>
              )}
            </p>
            
            {activeType !== "todos" && (
              <button
                onClick={() => setActiveType("todos")}
                className="text-[10px] font-mono text-gray-500 hover:text-bitcoin transition-colors"
              >
                Limpiar filtro ✕
              </button>
            )}
          </div>

          {/* ═══════════════════════════════════════════════════════
              GRID
              ═══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <ProjectSkeleton count={4} />
            ) : filtered.length > 0 ? (
              filtered.map((proyecto, index) => (
                <ProjectCard
                  key={proyecto.id}
                  proyecto={proyecto}
                  index={index}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <Sparkles className="h-12 w-12 text-gray-700 mx-auto mb-4" />
                <p className="font-mono text-sm text-gray-500">
                  No se encontraron proyectos
                  {searchQuery && <span className="text-bitcoin"> para "{searchQuery}"</span>}
                </p>
                <button
                  onClick={() => { setActiveType("todos"); setSearchQuery(""); }}
                  className="mt-4 text-xs font-mono text-bitcoin hover:text-matrix transition-colors"
                >
                  Ver todos los proyectos →
                </button>
              </div>
            )}
          </div>

          {/* ═══════════════════════════════════════════════════════
              FOOTER CTA
              ═══════════════════════════════════════════════════════ */}
          <div className="mt-20 text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-matrix/10 border border-matrix/30 px-4 py-2 rounded-full">
              <Code2 className="h-4 w-4 text-matrix" />
              <span className="font-mono text-xs text-matrix font-bold uppercase tracking-wider">
                ¿Tienes un proyecto Bitcoin?
              </span>
            </div>
            <p className="font-mono text-sm text-gray-400 max-w-lg mx-auto">
              Si estás construyendo algo con Bitcoin en México, queremos destacarlo.
              Proyectos de comunidad, open source, o iniciativas sovereign.
            </p>
            <a
              href="mailto:proyectos@aceptabitcoin.org"
              className="inline-flex items-center gap-2 px-6 py-3 bg-matrix text-black font-vt323 text-lg tracking-wide rounded-lg hover:bg-matrix/90 transition-all shadow-[0_0_20px_rgba(0,255,65,0.3)]"
            >
              Enviar Proyecto →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}