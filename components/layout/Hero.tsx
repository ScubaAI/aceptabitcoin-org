"use client";

import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

// Ya no necesitamos importar tipos si vamos a hardcodear el estado de transición
// import { HackathonEdition } from "@/lib/hackathon/editions/types";

export default function Hero({ nextEdition }: { nextEdition: any }) {
  // Mantenemos las variables por si acaso se usan en otras partes, 
  // pero para el botón usaremos valores fijos como pediste.
  const hackathonTitle = nextEdition?.title.split("Challenge")[0].trim() || "Bitcoin Self-Custody UI";
  const hackathonId = nextEdition?.id === "2026-2" ? "#2 — 2026" : (nextEdition?.id || "#2 — 2026");
  const hackathonSlug = nextEdition?.slug || "custody-ui-2026";

  return (
    <section className="min-h-screen pt-20 flex items-start md:items-center relative overflow-hidden bg-black">
      {/* FONDO MATRIX */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,255,65,0.15)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none" />
      
      {/* Ruido de fondo sutil */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDAsMjU1LDY1LCAwLjEpIiAvPgo8L3N2Zz4=')] opacity-30 pointer-events-none" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-10 pb-12 md:py-20 text-center relative z-10">
        
        {/* Header Terminal estilo Matrix */}
        <div className="inline-flex items-center gap-2 border border-matrix/30 bg-matrix/10 px-4 py-2 rounded text-xs font-mono text-matrix mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,65,0.2)]">
          <Terminal className="w-3 h-3" />
          <span className="opacity-80">root@aceptabitcoin:~# ./init_sequence.sh</span>
        </div>

        {/* Título Principal CON CURSOR VERDE PARPADEANTE */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-8xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
          Impulsando la Educación <br />
          <span className="text-bitcoin drop-shadow-[0_0_25px_rgba(247,147,26,0.6)]">
            de Bitcoin en México
          </span>
          {/* --- CURSOR MATRIX --- */}
          <span className="inline-block w-2 md:w-4 h-12 md:h-20 bg-matrix align-middle ml-2 animate-blink shadow-[0_0_10px_rgba(0,255,65,1)]"></span>
        </h1>

        {/* Subtítulo */}
        <p className="font-mono text-lg md:text-2xl text-gray-300 mb-12 tracking-wide max-w-3xl mx-auto border-l-2 border-matrix/50 pl-4 text-left md:text-center md:border-l-0 md:pl-0">
          <span className="text-matrix">➜</span> Aprende. Ahorra. Acepta Bitcoin.
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          
          {/* Botón 1: Hackathon — ESTADO DE TRANSICIÓN (Más discreto) */}
          <Link 
            href="/hackathon" 
            className="relative group w-full sm:w-auto"
          >
            {/* Efecto mucho más sutil: sin blur intenso, sin pulse constante */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-matrix/20 to-cyan-500/20 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
            
            <div className="relative flex items-center justify-center gap-3 px-8 py-4 bg-black border border-matrix/30 rounded-lg hover:border-matrix hover:bg-matrix/5 transition-all">
              <Terminal className="text-matrix/70 h-5 w-5" />
              <div className="flex flex-col items-start">
                <span className="font-vt323 text-xl text-matrix/90 tracking-widest leading-none">
                  PRÓXIMAMENTE HACKATÓN #3
                </span>
                <span className="font-mono text-xs text-gray-400 tracking-wide mt-1">
                  AceptaBitcoin Edition
                </span>
              </div>
              <ArrowRight className="text-matrix/50 h-5 w-5 group-hover:translate-x-1 group-hover:text-matrix transition-all" />
            </div>
          </Link>
          
          {/* Botón 2: Eventos (SECUNDARIO - Bitcoin Orange) */}
          <Link 
            href="https://luma.com/lunesdebitcoinMID"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-bitcoin/40 text-bitcoin font-serif font-bold rounded hover:border-bitcoin hover:bg-bitcoin/10 hover:shadow-[0_0_20px_rgba(247,147,26,0.3)] transition-all flex items-center justify-center gap-2 group"
          >
            <ArrowRight className="w-4 h-4 text-bitcoin/60 group-hover:text-bitcoin transition-colors" />
            EVENTOS
          </Link>
          
        </div>

        {/* Footer del Hero (Datos técnicos) */}
        <div className="mt-8 md:mt-16 pt-6 md:pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-left max-w-4xl mx-auto">
          <div>
            <div className="text-[10px] text-gray-500 font-mono mb-1 uppercase tracking-widest">System Status</div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-matrix animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.8)]"></div>
              <div className="font-mono text-sm text-matrix">ONLINE</div>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 font-mono mb-1 uppercase tracking-widest">Node Location</div>
            <div className="font-mono text-sm text-gray-300">MÉRIDA, MX</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 font-mono mb-1 uppercase tracking-widest">Encryption</div>
            <div className="font-mono text-matrix drop-shadow-[0_0_5px_rgba(0,255,65,0.8)]">AES-256</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 font-mono mb-1 uppercase tracking-widest">Protocol</div>
            <div className="font-mono text-sm text-bitcoin drop-shadow-[0_0_5px_rgba(247,147,26,0.8)]">LIGHTNING</div>
          </div>
        </div>

      </div>
    </section>
  );
}