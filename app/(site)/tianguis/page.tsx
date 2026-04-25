import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArcadeButton from "@/components/ui/arcade-button";
import { Zap, Users, Lock, Server, Map, Smartphone, Hammer } from "lucide-react";

export default function TianguisPage() {
  // Stack Técnico derivado del README + Pilares Comunitarios
  const features = [
    {
      icon: Server,
      title: "Infraestructura Robusta",
      desc: "Powered by Nostr Relay (strfry) y Docker. Escalable y censorship-resistant.",
      color: "text-matrix",
      border: "hover:border-matrix/50"
    },
    {
      icon: Map,
      title: "Geolocalización Real",
      desc: "Mapa interactivo de comerciantes en Mérida con soporte NIP-15 para coordenadas.",
      color: "text-bitcoin",
      border: "hover:border-bitcoin/50"
    },
    {
      icon: Smartphone,
      title: "Experiencia Móvil",
      desc: "PWA nativa. Llévalo en tu bolsillo, funciona offline y se integra al sistema.",
      color: "text-matrix",
      border: "hover:border-matrix/50"
    },
    {
      icon: Lock,
      title: "Privacidad & NWC",
      desc: "Conexión vía Nostr Wallet Connect. Tú controlas tus claves, siempre.",
      color: "text-bitcoin",
      border: "hover:border-bitcoin/50"
    },
  ];

  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center relative overflow-hidden bg-black pt-16">
        
        {/* Fondo: Grid Matrix + Patrón técnico */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,255,65,0.15)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
        
        <div className="container relative z-10 flex flex-col items-center text-center px-4 max-w-6xl mx-auto py-12">
          
          {/* Badge Superior: Status del Protocolo */}
          <div className="mb-8 inline-flex items-center gap-3 border border-matrix/30 bg-matrix/10 px-6 py-2 rounded-full text-xs font-mono text-matrix backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,65,0.15)]">
            <div className="h-2 w-2 rounded-full bg-matrix animate-pulse" />
            <span className="uppercase tracking-widest">Protocol Stack: Nostr + Lightning</span>
          </div>

          {/* Título Principal */}
          <h1 className="font-serif text-5xl md:text-8xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
            El <span className="text-bitcoin drop-shadow-[0_0_30px_rgba(247,147,26,0.5)]">Tianguis</span> Bitcoin
          </h1>

          {/* Subtítulo: Visión */}
          <p className="font-mono text-lg md:text-xl text-gray-300 mb-12 max-w-3xl leading-relaxed border-l-2 border-matrix/50 pl-4 text-left md:text-center md:border-l-0 md:pl-0">
            Marketplace P2P para Mérida. Sin intermediarios, sin censura, sin fronteras.<br />
            Donde la <span className="text-matrix">tecnología</span> se encuentra con el <span className="text-bitcoin">comercio real</span>.
          </p>

          {/* GRID DE ARQUITECTURA (Tech Stack Visual) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl mb-10">
            {features.map((feat, idx) => (
              <div key={idx} className={`group bg-black/40 border border-white/10 p-5 rounded-sm transition-all duration-300 ${feat.border} hover:bg-white/5`}>
                <div className="flex items-start gap-4">
                  <div className={`p-2 bg-white/5 rounded-sm ${feat.color} group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all`}>
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-bold text-white text-sm md:text-base mb-1 font-serif">
                      {feat.title}
                    </h3>
                    <p className="font-mono text-xs text-gray-400 leading-snug">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SECCIÓN ESPECIAL: Esfuerzo Comunitario */}
          <div className="w-full max-w-3xl bg-gradient-to-r from-matrix/5 to-bitcoin/5 border border-white/10 rounded-sm p-8 mb-12 relative overflow-hidden">
            {/* Decoración de fondo del bloque */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Hammer className="w-24 h-24 text-white" />
            </div>
            
            <div className="relative z-10">
              <h3 className="font-serif text-2xl text-white mb-3">Código Abierto & Comunidad</h3>
              <p className="font-mono text-sm text-gray-300 leading-relaxed mb-6">
                Este esfuerzo es <span className="text-bitcoin font-bold">AGPL-3.0</span>. <br/>
                Acepta Bitcoin proporciona la infraestructura base (Relay, BTCPay), pero es la <span className="text-matrix">comunidad</span> quien construye esta economía circular.
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start font-mono text-[10px] text-gray-500">
                <span className="px-2 py-1 border border-white/10 rounded">NEXT.JS 15</span>
                <span className="px-2 py-1 border border-white/10 rounded">POSTGRESQL</span>
                <span className="px-2 py-1 border border-white/10 rounded">STRFRY RELAY</span>
                <span className="px-2 py-1 border border-white/10 rounded">DOCKER</span>
              </div>
            </div>
          </div>

          {/* Botón Arcade de Acción */}
          <ArcadeButton href="https://github.com/aceptabitcoin/tianguis-btc" target="_blank">
            EXPLORAR MERCADO
          </ArcadeButton>

          {/* Meta-info */}
          <div className="mt-12 text-xs font-mono text-gray-600">
            NODE LOCATION: MÉRIDA, YUCATÁN // STATUS: OPERATIONAL
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}