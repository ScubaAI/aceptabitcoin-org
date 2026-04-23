import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArcadeButton from "@/components/ui/arcade-button";
import { Terminal, Cpu } from "lucide-react";

export default function AprendePage() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center relative overflow-hidden bg-black pt-16 mt-16">

        {/* Fondo: Rejilla Tron/Cyan + Ruido */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDYsMTgyLDIxMiwgMC4xKSIgLz4KPC9zdmc+')] opacity-30 pointer-events-none" />
        
        {/* Viñeta Apocalíptica */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />

        <div className="container relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto py-20">

          {/* Badge Superior: Estilo Terminal */}
          <div className="mb-8 inline-flex items-center gap-2 border border-cyan-500/30 bg-cyan-950/20 px-4 py-2 rounded text-xs font-mono text-cyan-400 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Terminal className="w-3 h-3" />
            <span className="uppercase tracking-widest">root@aceptabitcoin:~# ./start_training.sh</span>
          </div>

          {/* Título Principal: Fuente Serif (Patillas) + Cursor Parpadeante */}
          <h1 className="font-serif text-5xl md:text-8xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
            Domina el <span className="text-bitcoin drop-shadow-[0_0_25px_rgba(247,147,26,0.6)]">Bitcoin</span>
            {/* Cursor Parpadeante */}
            <span className="inline-block w-2 md:w-4 h-12 md:h-20 bg-cyan-400 align-middle ml-2 animate-blink shadow-[0_0_10px_rgba(34,211,238,1)]"></span>
          </h1>

          {/* Subtítulo Técnico: Fuente Mono + Texto Corregido */}
          <p className="font-mono text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed border-l-2 border-bitcoin/50 pl-4 text-left md:text-center md:border-l-0 md:pl-0">
            <span className="text-bitcoin">➜</span> Accede a laboratorios interactivos, simuladores de IA y herramientas avanzadas. <br />
            Plataforma Educativa Oficial de <span className="text-white font-bold bg-bitcoin/10 px-1">Acepta Bitcoin</span>.
          </p>

          {/* El Botón Arcade Solicitado */}
          <ArcadeButton href="https://bitcoin.visionaryai.lat">
            INICIAR SISTEMA
          </ArcadeButton>

          {/* Footer de Página: Datos del Sistema */}
          <div className="mt-16 grid grid-cols-2 gap-8 w-full max-w-lg border-t border-white/10 pt-8">
            <div className="text-left">
              <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-1">Server Status</div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                <div className="font-mono text-sm text-green-400">ONLINE</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-1">Provider</div>
              <div className="font-mono text-sm text-cyan-400">Acepta Bitcoin</div>
            </div>
          </div>
        </div>

        {/* Decoración de fondo inferior */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bitcoin/10 to-transparent pointer-events-none"></div>
      </div>
      <Footer />
    </>
  );
}