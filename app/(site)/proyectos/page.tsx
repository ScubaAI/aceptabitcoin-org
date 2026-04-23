import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ExternalLink, GitBranch as Github } from "lucide-react";

const projects = [
  {
    title: "Bitcoin Yucatán",
    status: "ACTIVE",
    tech: ["Node.js", "Lightning"],
    desc: "Nodo principal de liquidación para la península.",
    color: "text-bitcoin",
    glow: "bg-bitcoin/20",
    border: "border-bitcoin/30"
  },
  {
    title: "Maya DAO",
    status: "BETA",
    tech: ["Solidity", "Nostr"],
    desc: "Gobernanza descentralizada para fondos comunitarios.",
    color: "text-cyan-400",
    glow: "bg-cyan-500/20",
    border: "border-cyan-500/30"
  },
  {
    title: "Dev Merida",
    status: "RECRUITING",
    tech: ["React", "Rust"],
    desc: "Hub de desarrolladores cypherpunk en la región.",
    color: "text-purple-400",
    glow: "bg-purple-500/20",
    border: "border-purple-500/30"
  },
];

export default function ProyectosPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white py-20 relative">
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="container mx-auto px-4 relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6 mb-12">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">
                Proyectos <span className="text-gray-500">.json</span>
              </h1>
              <p className="font-mono text-gray-400"> Repositorios activos en la red de Acepta Bitcoin.</p>
            </div>
            <div className="font-mono text-xs text-bitcoin mt-4 md:mt-0">
              // INDEX: 01-03
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <div key={idx} className={`group bg-black/50 border ${proj.border} backdrop-blur-sm p-6 hover:bg-white/5 transition-all duration-300 relative overflow-hidden`}>
                
                {/* Efecto Glow en hover */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 ${proj.glow} blur-[50px] group-hover:opacity-100 opacity-50 transition-all`} />

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span className={`font-mono text-xs border ${proj.border} px-2 py-0.5 rounded ${proj.color}`}>
                    {proj.status}
                  </span>
                  <Github className="w-5 h-5 text-gray-500 hover:text-white transition-colors cursor-pointer" />
                </div>

                <h3 className="font-serif text-2xl font-bold mb-2 relative z-10 group-hover:translate-x-1 transition-transform">
                  {proj.title}
                </h3>

                <p className="font-mono text-sm text-gray-400 mb-6 leading-relaxed relative z-10">
                  {proj.desc}
                </p>

                <div className="flex gap-2 mb-6 relative z-10">
                  {proj.tech.map((t, i) => (
                    <span key={i} className="text-[10px] font-mono bg-white/10 px-2 py-1 rounded text-gray-300">
                      #{t}
                    </span>
                  ))}
                </div>

                <a href="#" className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest hover:text-bitcoin transition-colors relative z-10">
                  ACCESS_REPO <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}