import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArcadeButton from "@/components/ui/arcade-button";
import { Terminal, Cpu, Lock, Zap, FileCheck, BarChart3, Hash } from "lucide-react";

export default function AprendePage() {
  // Lista de Labs derivada del README de Bitcoin Agent
  const modules = [
    { name: "Seed Phrase Lab", icon: Lock, desc: "Generación de frases semilla y entropía HD wallets." },
    { name: "Mining Lab", icon: Zap, desc: "Simulación de Proof of Work y dificultad de red." },
    { name: "Signing Lab", icon: Hash, desc: "Firma y verificación de transacciones (UTXOs)." },
    { name: "Taxes Lab", icon: BarChart3, desc: "Calculadora de ganancias y compliance fiscal MX." },
  ];

  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center relative overflow-hidden bg-black pt-16 mt-16">

        {/* Fondo: Rejilla Matrix + Ruido Digital */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,255,65,0.15)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDAsMjU1LDY1LCAwLjEpIiAvPgo8L3N2Zz4=')] opacity-30 pointer-events-none" />
        
        {/* Viñeta Oscura */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />

        <div className="container relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto py-20">

          {/* Badge Superior: Estilo Terminal */}
          <div className="mb-8 inline-flex items-center gap-2 border border-matrix/30 bg-matrix/10 px-4 py-2 rounded text-xs font-mono text-matrix backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,65,0.2)]">
            <Terminal className="w-3 h-3" />
            <span className="uppercase tracking-widest">root@aceptabitcoin:~# ./connect_agent.sh</span>
          </div>

          {/* Título Principal: Serif + Bitcoin + Cursor */}
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
            Domina el <span className="text-bitcoin drop-shadow-[0_0_25px_rgba(247,147,26,0.6)]">Bitcoin</span>
            {/* Cursor Parpadeante Verde */}
            <span className="inline-block w-2 md:w-4 h-12 md:h-20 bg-matrix align-middle ml-2 animate-blink shadow-[0_0_10px_rgba(0,255,65,1)]"></span>
          </h1>

          {/* Descripción del Chat Bot B.O.B. */}
          <p className="font-mono text-lg md:text-xl text-gray-300 mb-8 max-w-3xl leading-relaxed border-l-2 border-bitcoin/50 pl-4 text-left md:text-center md:border-l-0 md:pl-0">
            Interactúa con <span className="text-matrix font-bold">B.O.B.</span> (Bitcoin Operated Brain), nuestra IA entrenada con el Whitepaper. 
            Accede a laboratorios interactivos y herramientas de cumplimiento real.
          </p>

          {/* GRID DE MÓDULOS DEL SISTEMA (Reflejo del README) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mb-10">
            {modules.map((mod, index) => (
              <div key={index} className="group flex items-start gap-4 p-4 border border-white/10 bg-white/5 hover:bg-matrix/5 hover:border-matrix/30 transition-all rounded-sm backdrop-blur-sm">
                <div className="mt-1 text-matrix group-hover:text-bitcoin transition-colors">
                  <mod.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-mono text-sm text-white font-bold mb-1 group-hover:text-matrix transition-colors">
                    <span className="text-gray-600 mr-2">0{index + 1}</span>
                    {mod.name}
                  </h4>
                  <p className="text-xs font-sans text-gray-400 leading-tight">
                    {mod.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* El Botón Arcade Solicitado */}
          <ArcadeButton href="https://bitcoin.visionaryai.lat" className="relative z-20">
            INICIAR SISTEMA
          </ArcadeButton>

          {/* Footer de Página: Datos del Sistema */}
          <div className="mt-16 grid grid-cols-2 gap-8 w-full max-w-lg border-t border-white/10 pt-8">
            <div className="text-left">
              <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-1">Server Status</div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-matrix animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.8)]"></div>
                <div className="font-mono text-sm text-matrix">ONLINE</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-1">AI Model</div>
              <div className="font-mono text-sm text-bitcoin">LLaMA 3.3</div>
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