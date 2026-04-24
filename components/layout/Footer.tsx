import Link from "next/link";
import { Terminal, MapPin, Mail, X, Cpu, Hash } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      {/* Fondo decorativo sutil - Ahora con tinte verde Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 border-b border-white/5 pb-12">

          {/* --- Columna 1: Branding & System ID --- */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded border border-bitcoin bg-bitcoin text-black shadow-[0_0_15px_rgba(247,147,26,0.3)]">
                <span className="font-serif font-bold text-xl">₿</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white font-serif">
                  aceptabitcoin
                </span>
                <span className="text-[10px] text-bitcoin font-mono uppercase tracking-widest">
                  Financial_Systems
                </span>
              </div>
            </div>
            
            <p className="font-mono text-xs text-gray-400 leading-relaxed">
              Educación y adopción real de Bitcoin desde Mérida, Yucatán.
            </p>

            {/* Simulación de Status de Nodo */}
            <div className="p-3 rounded bg-white/5 border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase">
                <span>Node Status</span>
                <span className="text-matrix flex items-center gap-1">
                  <span className="block w-1.5 h-1.5 rounded-full bg-matrix animate-pulse"></span> Online
                </span>
              </div>
              <div className="font-mono text-[10px] text-gray-600 truncate">
                ID: 02f34a...8b2a
              </div>
            </div>
          </div>

          {/* --- Columna 2: Explorar (Directorio) --- */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Terminal className="h-4 w-4 text-matrix" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
                /Directorio
              </h4>
            </div>
            <ul className="space-y-4 font-mono text-sm">
              <li><Link href="/aprende" className="text-gray-400 hover:text-matrix transition-colors flex items-center gap-2 group">
                <span className="opacity-0 group-hover:opacity-100 text-matrix/60">➜</span> ./aprende
              </Link></li>
              <li><Link href="/tianguis" className="text-gray-400 hover:text-matrix transition-colors flex items-center gap-2 group">
                <span className="opacity-0 group-hover:opacity-100 text-matrix/60">➜</span> ./tianguis
              </Link></li>
              <li><Link href="/crea-tu-tienda" className="text-gray-400 hover:text-matrix transition-colors flex items-center gap-2 group">
                <span className="opacity-0 group-hover:opacity-100 text-matrix/60">➜</span> ./crear_tienda
              </Link></li>
              <li><Link href="/proyectos" className="text-gray-400 hover:text-matrix transition-colors flex items-center gap-2 group">
                <span className="opacity-0 group-hover:opacity-100 text-matrix/60">➜</span> ./proyectos
              </Link></li>
              <li><Link href="/nuestra-historia" className="text-gray-400 hover:text-matrix transition-colors flex items-center gap-2 group">
                <span className="opacity-0 group-hover:opacity-100 text-matrix/60">➜</span> ./historia
              </Link></li>
            </ul>
          </div>

          {/* --- Columna 3: Infraestructura (Tech Stack) --- */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Cpu className="h-4 w-4 text-bitcoin" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
                /Infraestructura
              </h4>
            </div>
            <ul className="space-y-4 font-mono text-sm">
              <li>
                <a href="https://btcmap.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bitcoin transition-colors flex items-center gap-2 group">
                  <Hash className="h-3 w-3 opacity-50" /> BTC_Map_Protocol
                </a>
              </li>
              <li>
                <a href="https://dev.blink.sv" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bitcoin transition-colors flex items-center gap-2 group">
                  <Hash className="h-3 w-3 opacity-50" /> Lightning_Liquidity
                </a>
              </li>
              <li>
                <a href="https://bitcoin.visionaryai.lat" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bitcoin transition-colors flex items-center gap-2 group">
                  <Hash className="h-3 w-3 opacity-50" /> AI_Education_Module
                </a>
              </li>
            </ul>
          </div>

          {/* --- Columna 4: Contacto & Uplink --- */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Terminal className="h-4 w-4 text-gray-500" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
                /Uplink
              </h4>
            </div>
            
            <div className="space-y-4 font-mono text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-bitcoin mt-0.5" />
                <div>
                  <div className="text-white text-xs font-bold">Mérida, Yucatán</div>
                  <div className="text-[10px] text-gray-600">Lat: 20.96 N // Lon: 89.62 W</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-bitcoin" />
                <a href="mailto:hola@aceptabitcoin.org" className="hover:text-white transition-colors">
                  hola@aceptabitcoin.org
                </a>
              </div>

              <div className="pt-4 flex flex-col gap-3 border-t border-white/5">
                <a
                  href="https://x.com/AceptaBitcoin21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-matrix transition-colors group"
                >
                  <X className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>@AceptaBitcoin21</span>
                </a>

                <Link href="/#agenda" className="inline-flex items-center gap-2 text-bitcoin hover:text-white transition-colors bg-bitcoin/5 px-2 py-1 rounded border border-bitcoin/20 group-hover:border-bitcoin/50">
                  <Terminal className="h-3 w-3" />
                  <span>Book_Terminal</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* --- System Log (Copyright) --- */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">
            <span className="text-matrix">root@system:~$</span> ./init_shutdown_sequence
          </div>
          <div className="flex items-center gap-4 font-mono text-[10px] text-gray-500">
            <span>© {new Date().getFullYear()} Acepta Bitcoin</span>
            <span className="text-gray-700">|</span>
            <span className="text-matrix/80">Protocol: Lightning</span>
            <span className="text-gray-700">|</span>
            <span className="text-bitcoin">Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}