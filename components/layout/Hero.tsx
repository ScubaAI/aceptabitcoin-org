"use client";

import Link from "next/link";
import { ArrowRight, Terminal, ShieldAlert } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen pt-20 flex items-center relative overflow-hidden bg-black">
      {/* Fondo: Rejilla Cypherpunk + Ruido de Fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(247,147,26,0.15)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LDI1NSwgMC4wMykiIC8+Cjwvc3ZnPg==')] opacity-30 pointer-events-none" />
      
      {/* Efecto de Viñeta Oscura (Apocalíptica) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 text-center relative z-10">
        
        {/* Header tipo Terminal/Código */}
        <div className="inline-flex items-center gap-2 border border-bitcoin/30 bg-bitcoin/5 px-4 py-2 rounded text-xs font-mono text-bitcoin mb-8 backdrop-blur-sm">
          <Terminal className="w-3 h-3" />
          <span className="opacity-70">root@aceptabitcoin:~# ./init_sequence.sh</span>
        </div>

        {/* Título Principal: Fuente Ubuntu (Tech/Bank) */}
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
          Impulsando la Educación <br />
          <span className="text-bitcoin drop-shadow-[0_0_15px_rgba(247,147,26,0.6)]">
            de Bitcoin en México
          </span>
        </h1>

        {/* Subtítulo Técnico: Fuente Fira Code (Cypherpunk) */}
        <p className="font-mono text-lg md:text-2xl text-gray-300 mb-12 tracking-wide max-w-3xl mx-auto border-l-2 border-bitcoin/50 pl-4 text-left md:text-center md:border-l-0 md:pl-0">
          <span className="text-bitcoin">➜</span> Aprende. Ahorra. Acepta Bitcoin.
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          
          {/* Botón Eventos (Estilo Arcade) */}
          <Link 
            href="https://luma.com/lunesdebitcoinMID?k=c" 
            target="_blank"
            rel="noopener noreferrer"
            className="relative group z-10 w-full sm:w-auto"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-yellow-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
            <div className="relative flex items-center justify-center gap-3 px-8 py-4 bg-black border border-orange-500 rounded-lg hover:bg-gray-900 transition-all">
              <span className="font-vt323 text-2xl text-white tracking-widest">
                EVENTOS
              </span>
              <ArrowRight className="text-orange-400 h-5 w-5" />
            </div>
          </Link>
          
          {/* Botón Educativo (Estilo Minimalista Tech) */}
          <Link 
            href="/aprende" 
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-gray-700 text-white font-sans font-bold rounded hover:border-gray-500 hover:bg-gray-900/50 transition-all flex items-center justify-center gap-2 group"
          >
            <ShieldAlert className="w-4 h-4 text-gray-400 group-hover:text-bitcoin transition-colors" />
            Plataforma Educativa
          </Link>
        </div>

        {/* Footer del Hero (Datos técnicos decorativos) */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 text-left max-w-4xl mx-auto">
          <div>
            <div className="text-[10px] text-gray-500 font-mono mb-1 uppercase">System Status</div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <div className="font-mono text-sm text-green-400">ONLINE</div>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 font-mono mb-1 uppercase">Node Location</div>
            <div className="font-mono text-sm text-gray-300">MÉRIDA, MX</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 font-mono mb-1 uppercase">Encryption</div>
            <div className="font-mono text-sm text-orange-400">AES-256</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 font-mono mb-1 uppercase">Protocol</div>
            <div className="font-mono text-sm text-blue-400">LIGHTNING</div>
          </div>
        </div>

      </div>
    </section>
  );
}