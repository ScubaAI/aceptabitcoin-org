"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Terminal, Clock } from "lucide-react";
import dynamic from "next/dynamic";

// Importación Dinámica para evitar errores de SSR con Cal.com
const CalComEmbed = dynamic(() => import("@/components/embeds/CalComEmbed"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-black/40 border border-cyan-500/20 rounded-xl animate-pulse flex items-center justify-center">
      <span className="font-mono text-cyan-400 text-sm">Loading Booking Terminal...</span>
    </div>
  ),
});

export function AgendaSection() {
  return (
    <section id="agenda" className="relative py-24 bg-black overflow-hidden border-t border-white/5">
      {/* Fondo: Grid Cypherpunk sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
      
      <div className="container relative z-10 px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* COLUMNA IZQUIERDA: Información y Contexto (4 columnas) */}
          <div className="lg:col-span-4 space-y-8 flex flex-col h-full">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-cyan-950/30 border border-cyan-500/30 px-3 py-1 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-widest font-mono">
                <Calendar className="h-3 w-3" />
                Booking System
              </div>

              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Agenda tu <br />
                <span className="text-bitcoin drop-shadow-[0_0_15px_rgba(247,147,26,0.6)]">
                  Asesoría
                </span>
              </h2>

              <p className="font-mono text-sm text-gray-400 leading-relaxed border-l-2 border-bitcoin/30 pl-4">
                Reserva un espacio en nuestro calendario para implementar Bitcoin 
                en tu negocio o resolver dudas técnicas. Sesiones 1-a-1 vía videollamada.
              </p>
            </div>

            {/* Info del Sistema (Decorativo) */}
            <div className="p-4 rounded-lg border border-white/5 bg-white/5 backdrop-blur-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-bitcoin/10 flex items-center justify-center text-bitcoin">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-mono uppercase">Duration</div>
                  <div className="text-sm font-bold text-white font-serif">30 Minutes</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-cyan-950/30 flex items-center justify-center text-cyan-400">
                  <Terminal className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-mono uppercase">Platform</div>
                  <div className="text-sm font-bold text-white font-serif">Google Meet</div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <p className="font-mono text-[10px] text-gray-600 uppercase tracking-widest mb-2">
                // System Status: Online
              </p>
              <div className="h-1 w-12 bg-bitcoin rounded-full"></div>
            </div>

          </div>

          {/* COLUMNA DERECHA: Cal.com Embed (8 columnas) */}
          <div className="lg:col-span-8">
            <Card className="border-cyan-500/20 bg-black/40 backdrop-blur-md shadow-2xl overflow-hidden relative group">
              
              {/* Cabecera de la Tarjeta (Estilo Ventana de Sistema) */}
              <div className="bg-black/80 border-b border-white/5 p-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="font-mono text-[10px] text-cyan-500/80 uppercase tracking-widest">
                    root@aceptabitcoin:~# ./calendar_client
                  </span>
                </div>
              </div>

              {/* El Embed de Cal.com */}
              <div className="p-4 md:p-6 bg-black/20 min-h-[600px]">
                <CalComEmbed 
                  className="w-full"
                  // Asegúrate de que estos valores coincidan con tu setup real en Cal.com
                  username="aceptabitcoin" 
                  eventSlug="asesoria-30min" 
                />
              </div>

              {/* Efecto de brillo en el borde */}
              <div className="absolute inset-0 border border-cyan-500/0 group-hover:border-cyan-500/20 transition-colors duration-500 pointer-events-none rounded-xl"></div>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}