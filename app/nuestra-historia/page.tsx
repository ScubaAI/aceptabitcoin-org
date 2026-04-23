import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, MapPin } from "lucide-react";

const historyEvents = [
  {
    year: "2021",
    title: "Genesis Block",
    desc: "Primera reunión informal en el centro de Mérida. El inicio de todo.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop", // Placeholder tech
    glow: "shadow-[0_0_20px_rgba(34,211,238,0.3)]"
  },
  {
    year: "2022",
    title: "Primer LN Node",
    desc: "Despliegue del primer nodo Lightning público para la comunidad.",
    img: "https://images.unsplash.com/photo-1558494949-efc535b5cec1?q=80&w=1000&auto=format&fit=crop", // Placeholder server
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.3)]"
  },
  {
    year: "2023",
    title: "Tianguis BTC",
    desc: "Lanzamiento del mercado P2P descentralizado basado en Nostr.",
    img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop", // Placeholder crypto art
    glow: "shadow-[0_0_20px_rgba(247,147,26,0.3)]"
  },
  {
    year: "2024",
    title: "Oracle System",
    desc: "Evolución a la plataforma v2.0. Estética Cypherpunk Bank.",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop", // Placeholder matrix
    glow: "shadow-[0_0_20px_rgba(34,197,94,0.3)]"
  },
];

export default function NuestraHistoriaPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden">
        
        {/* Fondo animado estilo Tron */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-bitcoin/10 via-black to-black opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:30px_30px] [transform:perspective(500px)_rotateX(60deg)] animate-[scanline_10s_linear_infinite] origin-top" />

        <div className="container mx-auto px-4 relative z-10">
          
          <div className="text-center mb-16">
            <span className="font-mono text-cyan-400 tracking-[0.5em] text-sm uppercase">System Log</span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mt-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
              Nuestra Historia
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {historyEvents.map((evt, idx) => (
              <div key={idx} className={`group relative bg-black/80 border border-white/10 backdrop-blur-md overflow-hidden hover:border-white/40 transition-all duration-500 ${evt.glow}`}>
                
                {/* Imagen con filtro */}
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                  <img 
                    src={evt.img} 
                    alt={evt.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-black/80 border border-cyan-500/50 px-3 py-1 font-mono text-cyan-400 font-bold text-xl">
                    {evt.year}
                  </div>
                </div>

                <div className="p-8 relative z-20">
                  <div className="flex items-center gap-2 mb-3 text-bitcoin/80 font-mono text-xs uppercase tracking-widest">
                    <Calendar className="w-3 h-3" />
                    <span>Checkpoint {idx + 1}</span>
                  </div>
                  
                  <h3 className="font-serif text-3xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                    {evt.title}
                  </h3>
                  
                  <p className="font-mono text-gray-400 text-sm leading-relaxed border-l-2 border-white/20 pl-4">
                    {evt.desc}
                  </p>
                </div>

                {/* Decoración de esquinas */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}