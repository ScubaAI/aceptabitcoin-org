"use client";

import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Globe, Users, Crown, Handshake, User, Search, MapPin } from "lucide-react";
import ProviderCard from "@/components/cards/ProviderCard";
import ProviderSkeleton from "@/components/cards/ProviderSkeleton";
import CategoryFilter from "@/components/filters/CategoryFilter";
import MatrixRain from "@/components/ui/MatrixRain";
import { type Proveedor, type Categoria, filterByCategory, getStats } from "@/lib/proveedores";

export default function ProveedoresPage() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Categoria | "todos">("todos");
  const [searchQuery, setSearchQuery] = useState("");

  // Load data
  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/data/proveedores.json");
        const data: Proveedor[] = await response.json();
        // Sort: patrocinadores first, then by name
        const sorted = data.sort((a, b) => {
          const tierOrder = { patrocinador: 0, partner: 1, miembro: 2 };
          if (tierOrder[a.tier] !== tierOrder[b.tier]) {
            return tierOrder[a.tier] - tierOrder[b.tier];
          }
          return a.nombre.localeCompare(b.nombre);
        });
        setProveedores(sorted);
      } catch (error) {
        console.error("Error loading proveedores:", error);
      } finally {
        // Minimum skeleton time for smooth UX
        setTimeout(() => setLoading(false), 600);
      }
    }
    load();
  }, []);

  // Filtered results
  const filtered = useMemo(() => {
    let result = proveedores;
    
    if (activeCategory !== "todos") {
      result = result.filter((p) => p.categoria === activeCategory);
    }
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.descripcion.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.ubicacion.toLowerCase().includes(q)
      );
    }
    
    return result;
  }, [proveedores, activeCategory, searchQuery]);

  // Stats
  const stats = useMemo(() => getStats(proveedores), [proveedores]);
  
  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    proveedores.forEach((p) => {
      counts[p.categoria] = (counts[p.categoria] || 0) + 1;
    });
    return counts;
  }, [proveedores]);

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <MatrixRain className="opacity-20" speed={0.5} density={15} />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(0, 255, 65, 0.06) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-bitcoin/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        
        {/* ═══════════════════════════════════════════════════════
            HEADER
            ═══════════════════════════════════════════════════════ */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 bg-matrix/10 border border-matrix/30 px-4 py-1.5 rounded-full text-matrix text-xs font-bold uppercase tracking-[0.2em] font-mono">
            <Globe className="h-3 w-3" />
            Directorio Sovereign
          </div>

          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight">
            Proveedores{" "}
            <span className="text-bitcoin drop-shadow-[0_0_25px_rgba(247,147,26,0.5)]">
              Bitcoin
            </span>
          </h1>

          <p className="font-mono text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Negocios y servicios en México comprometidos con la adopción de Bitcoin.
            <br />
            <span className="text-matrix">Sin intermediarios. Sin permiso.</span>
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════
            STATS BAR
            ═══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-black/60 border border-white/10 p-4 text-center backdrop-blur-md">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Users className="h-4 w-4 text-matrix" />
              <span className="font-vt323 text-2xl text-white">{stats.total}</span>
            </div>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Total</p>
          </Card>
          <Card className="bg-black/60 border border-bitcoin/20 p-4 text-center backdrop-blur-md">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Crown className="h-4 w-4 text-bitcoin" />
              <span className="font-vt323 text-2xl text-bitcoin">{stats.patrocinadores}</span>
            </div>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Patrocinadores</p>
          </Card>
          <Card className="bg-black/60 border border-matrix/20 p-4 text-center backdrop-blur-md">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Handshake className="h-4 w-4 text-matrix" />
              <span className="font-vt323 text-2xl text-matrix">{stats.partners}</span>
            </div>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Partners</p>
          </Card>
          <Card className="bg-black/60 border border-white/10 p-4 text-center backdrop-blur-md">
            <div className="flex items-center justify-center gap-2 mb-1">
              <User className="h-4 w-4 text-gray-400" />
              <span className="font-vt323 text-2xl text-gray-300">{stats.miembros}</span>
            </div>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Miembros</p>
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
              placeholder="Buscar proveedores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-3 text-sm font-mono text-white placeholder-gray-600 focus:border-matrix focus:ring-1 focus:ring-matrix/50 outline-none transition-all"
            />
          </div>

          {/* Category Filter */}
          <CategoryFilter
            active={activeCategory}
            onChange={setActiveCategory}
            counts={categoryCounts}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════
            RESULTS COUNT
            ═══════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-mono text-xs text-gray-500">
            <span className="text-matrix">❯</span> Mostrando{" "}
            <span className="text-white font-bold">{filtered.length}</span> de{" "}
            <span className="text-white">{proveedores.length}</span> proveedores
            {searchQuery && (
              <span className="text-bitcoin"> | Búsqueda: "{searchQuery}"</span>
            )}
          </p>
          
          {activeCategory !== "todos" && (
            <button
              onClick={() => setActiveCategory("todos")}
              className="text-[10px] font-mono text-gray-500 hover:text-matrix transition-colors"
            >
              Limpiar filtro ✕
            </button>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════
            GRID
            ═══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <ProviderSkeleton count={6} />
          ) : filtered.length > 0 ? (
            filtered.map((proveedor, index) => (
              <ProviderCard
                key={proveedor.id}
                proveedor={proveedor}
                index={index}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <MapPin className="h-12 w-12 text-gray-700 mx-auto mb-4" />
              <p className="font-mono text-sm text-gray-500">
                No se encontraron proveedores
                {searchQuery && <span className="text-bitcoin"> para "{searchQuery}"</span>}
              </p>
              <button
                onClick={() => { setActiveCategory("todos"); setSearchQuery(""); }}
                className="mt-4 text-xs font-mono text-matrix hover:text-bitcoin transition-colors"
              >
                Ver todos los proveedores →
              </button>
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════
            FOOTER CTA
            ═══════════════════════════════════════════════════════ */}
        <div className="mt-20 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-bitcoin/10 border border-bitcoin/30 px-4 py-2 rounded-full">
            <Crown className="h-4 w-4 text-bitcoin" />
            <span className="font-mono text-xs text-bitcoin font-bold uppercase tracking-wider">
              ¿Quieres aparecer aquí?
            </span>
          </div>
          <p className="font-mono text-sm text-gray-400 max-w-lg mx-auto">
            Si tu negocio acepta Bitcoin en México, únete al directorio sovereign.
            Sin costo para miembros, beneficios exclusivos para patrocinadores.
          </p>
          <a
            href="/crea-tu-tienda"
            className="inline-flex items-center gap-2 px-6 py-3 bg-bitcoin text-black font-vt323 text-lg tracking-wide rounded-lg hover:bg-bitcoin/90 transition-all shadow-[0_0_20px_rgba(247,147,26,0.3)]"
          >
            Registrar mi Negocio →
          </a>
        </div>
      </div>
    </main>
  );
}
