import type { Metadata } from "next";
import { type Proyecto, getProyectos } from "@/lib/proyectos";
import ProyectosClient from "./ProyectosClient";
import ArcadeButton from "@/components/ui/ArcadeButton";
import Link from "next/link";

// 1. Cargar proyectos ya sanitizados (sin "interno") y ordenar por fecha (más reciente primero)
const proyectosRaw = await getProyectos();
const proyectosComunidad = [...proyectosRaw].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

// 2. Separar los 3 ganadores del resto del historial
// NOTA: Si tu tipo `Proyecto` tiene un campo específico como `puesto: 1 | 2 | 3` o `ganador: true`, 
// puedes cambiar la lógica a: const ganadores = proyectosComunidad.filter(p => p.puesto <= 3);
const ganadores = proyectosComunidad.slice(0, 3);
const historialProyectos = proyectosComunidad.slice(3);

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return {
    metadataBase: new URL(baseUrl),
    title: 'Proyectos Ganadores — Ecosistema Bitcoin México',
    description: 'Acepta Bitcoin organiza 3 hackatones al año. Conoce a los 3 proyectos destacados que están escribiendo el futuro de Bitcoin en México.',
    openGraph: {
      title: 'Proyectos Ganadores — Ecosistema Bitcoin México',
      description: '3 hackatones anuales. Software Bitcoin hecho en México. Código abierto, soberano, sin permiso.',
      images: [{ url: '/og/proyectos.svg', width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Proyectos Ganadores Bitcoin México',
      description: 'Conoce a los ganadores de nuestros hackatones anuales.',
      images: ['/og/proyectos.svg'],
    },
  };
}

export default function ProyectosPage() {
  return (
    <main className="relative z-10 min-h-screen bg-black">
      
      {/* Hero Section - Estilo Terminal V3 */}
      <section className="relative border-b border-white/10 bg-black/90">
        {/* Efecto scanline en el borde inferior */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-matrix/50 to-transparent animate-scanline" />
        
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="text-center">
            {/* Badge de estado del sistema (font-vt323 para labels del sistema) */}
            <div className="inline-flex items-center gap-2 rounded-full border border-matrix/30 bg-matrix/10 px-3 py-1 mb-6">
              <span className="h-2 w-2 rounded-full bg-matrix animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.6)]" />
              <span className="font-vt323 text-sm text-matrix uppercase tracking-wider">
                Oracle System v3.0 — Ganadores
              </span>
            </div>
            
            {/* Título principal - Serif institucional */}
            <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Proyectos <span className="text-bitcoin">Ganadores</span>
            </h1>
            
            {/* Subtítulo - Mono técnico */}
            <p className="mt-6 font-mono text-sm text-gray-400 md:text-base max-w-3xl mx-auto leading-relaxed">
              Acepta Bitcoin organiza <span className="text-bitcoin font-bold">3 hackatones al año</span> para impulsar el desarrollo de software Bitcoin en México. 
              <br className="hidden md:block" />
              Honoramos a los <span className="text-matrix">3 proyectos destacados</span> que lideran la innovación soberana.
            </p>
            
            {/* Stats rápidas - Mono */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 font-mono text-xs">
              <span className="text-gray-500">
                <span className="text-bitcoin">3</span> ganadores destacados
              </span>
              <span className="text-gray-700">|</span>
              <span className="text-gray-500">
                <span className="text-matrix">{historialProyectos.length}</span> en historial
              </span>
              <span className="text-gray-700">|</span>
              <span className="text-gray-500">
                <span className="text-matrix">{proyectosComunidad.filter(p => p.estado === 'active').length}</span> activos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido principal - Grid de ganadores */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        {/* 
          NOTA: Si deseas que `ProyectosClient` resalte visualmente a los ganadores, 
          puedes añadirle una prop como `isWinnersShowcase={true}` para que aplique 
          un borde `border-bitcoin` o un badge especial a las tarjetas.
        */}
        <ProyectosClient proyectos={ganadores} />
        
        {/* CTA para ver el historial completo */}
        <div className="mt-16 flex justify-center">
          <Link href="/proyectos/historial">
            <ArcadeButton size="lg" variant="matrix">
              VER HISTORIAL COMPLETO DE PROYECTOS
            </ArcadeButton>
          </Link>
        </div>
      </div>

      {/* Footer decorativo - Estilo terminal */}
      <footer className="border-t border-white/10 bg-black/90">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-matrix">❯</span>
              <span>proyectos.json loaded • {proyectosComunidad.length} entries (internos excluidos)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-matrix animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.6)]" />
              <span>Status: <span className="text-matrix">OPERATIONAL</span></span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}