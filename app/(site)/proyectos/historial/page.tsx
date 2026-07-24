import type { Metadata } from "next";
import { type Proyecto } from "@/lib/proyectos";
import ProyectosClient from "../ProyectosClient";
import { ArcadeButton } from "@/components/ui/ArcadeButton";
import Link from "next/link";

import proyectosRaw from '@/data/proyectos.json';

// Mismos filtros para mantener consistencia de datos
const proyectosComunidad = (proyectosRaw as Proyecto[])
  .filter(p => p.tipo !== 'interno')
  .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

const historialProyectos = proyectosComunidad.slice(3);

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return {
    metadataBase: new URL(baseUrl),
    title: 'Historial de Proyectos — Ecosistema Bitcoin México',
    description: 'Explora todos los proyectos de la comunidad que han participado en los hackatones de Acepta Bitcoin México.',
  };
}

export default function HistorialProyectosPage() {
  return (
    <main className="relative z-10 min-h-screen bg-black">
      <section className="relative border-b border-white/10 bg-black/90">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-matrix/50 to-transparent animate-scanline" />
        
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-matrix/30 bg-matrix/10 px-3 py-1 mb-6">
              <span className="h-2 w-2 rounded-full bg-matrix animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.6)]" />
              <span className="font-vt323 text-sm text-matrix uppercase tracking-wider">
                Oracle System v3.0 — Historial
              </span>
            </div>
            
            <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Historial de <span className="text-bitcoin">Proyectos</span>
            </h1>
            
            <p className="mt-6 font-mono text-sm text-gray-400 md:text-base max-w-3xl mx-auto leading-relaxed">
              Código abierto, soberano y sin permiso. 
              <br className="hidden md:block" />
              Explora el ecosistema completo de desarrolladores que construyen el futuro de Bitcoin en México.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        {historialProyectos.length > 0 ? (
          <ProyectosClient proyectos={historialProyectos} />
        ) : (
          <div className="text-center font-mono text-gray-500 py-12">
            <p>No hay más proyectos en el historial por el momento.</p>
          </div>
        )}
        
        <div className="mt-16 flex justify-center">
          <Link href="/proyectos">
            <ArcadeButton tier="low" variant="matrix">
              ← VOLVER A GANADORES
            </ArcadeButton>
          </Link>
        </div>
      </div>
    </main>
  );
}