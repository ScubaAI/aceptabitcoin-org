import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArcadeButton from "@/components/ui/arcade-button";
import { Zap, Users, Lock } from "lucide-react";

export default function TianguisPage() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center relative overflow-hidden bg-black pt-16">
        
        {/* Fondo: Grid Tron */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none" />
        
        <div className="container relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
          
          <div className="mb-6 inline-flex items-center gap-2 border border-purple-500/30 bg-purple-950/20 px-4 py-2 rounded text-xs font-mono text-purple-400 backdrop-blur-sm">
            <Zap className="w-3 h-3" />
            <span className="uppercase tracking-widest">Protocol: Nostr + Lightning</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white leading-[1.1]">
            El <span className="text-purple-500 drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]">Tianguis</span> Bitcoin
          </h1>

          <p className="font-mono text-lg md:text-xl text-gray-300 mb-10 max-w-3xl leading-relaxed border-l-2 border-purple-500/50 pl-4">
            Una economía P2P descentralizada impulsada por <span className="text-cyan-400">Nostr</span> y liquidada en <span className="text-bitcoin">Lightning Network</span>.<br />
            Sin intermediarios. Sin censura. Solo comercio entre pares.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
            <div className="bg-white/5 border border-white/10 p-6 rounded-sm hover:border-purple-500/50 transition-colors">
              <Users className="w-8 h-8 text-purple-400 mb-4 mx-auto" />
              <h3 className="font-serif text-xl mb-2 text-white">Identidad Soberana</h3>
              <p className="font-mono text-xs text-gray-400">Tu clave privada es tu identidad. No hay registro centralizado.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-sm hover:border-bitcoin/50 transition-colors">
              <Zap className="w-8 h-8 text-bitcoin mb-4 mx-auto" />
              <h3 className="font-serif text-xl mb-2 text-white">Pagos Instantáneos</h3>
              <p className="font-mono text-xs text-gray-400">Settlement final en segundos a través de la red Lightning.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-sm hover:border-cyan-500/50 transition-colors">
              <Lock className="w-8 h-8 text-cyan-400 mb-4 mx-auto" />
              <h3 className="font-serif text-xl mb-2 text-white">Código Abierto</h3>
              <p className="font-mono text-xs text-gray-400">Infraestructura auditable y comunitaria.</p>
            </div>
          </div>

          <ArcadeButton href="https://github.com/aceptabitcoin/tianguis-btc" target="_blank">
            ACCEDER AL MERCADO
          </ArcadeButton>

        </div>
      </div>
      <Footer />
    </>
  );
}