import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, MapPin, Users, Zap } from "lucide-react";

const historyEvents = [
  {
    year: "2021",
    quarter: "Q4",
    title: "Genesis — La Semilla",
    desc: "Primera reunión informal en el centro histórico de Mérida. Un pequeño grupo de cypherpunks locales se reúne en un café para discutir el potencial de Bitcoin como herramienta de soberanía financiera en México. Nace la idea de construir una comunidad grassroots.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
    glow: "shadow-[0_0_20px_rgba(0,255,65,0.3)]",
    milestone: "🌱 Primera reunión comunitaria"
  },
  {
    year: "2022",
    quarter: "Q1",
    title: "Nodo Genesis — La Infraestructura",
    desc: "Despliegue del primer nodo Lightning Network público en Yucatán. El nodo 'AceptaBitcoin' comienza a enrutar pagos, demostrando que la red funciona en la península. Se establece el primer canal de pago con un nodo en la Ciudad de México.",
    img: "https://images.unsplash.com/photo-1558494949-efc535b5cec1?q=80&w=1000&auto=format&fit=crop",
    glow: "shadow-[0_0_20px_rgba(0,255,65,0.25)]",
    milestone: "⚡ Nodo Lightning activo"
  },
  {
    year: "2022",
    quarter: "Q3",
    title: "BTCPay Server — Primer Adopción",
    desc: "Primer comercio en Mérida acepta Bitcoin via BTCPay Server. Una pizzería local se convierte en el primer punto de venta de la red. Se realizan talleres presenciales de capacitación paradueños de negocio.",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop",
    glow: "shadow-[0_0_20px_rgba(247,147,26,0.3)]",
    milestone: "🏪 Primera tienda aceptando BTC"
  },
  {
    year: "2023",
    quarter: "Q1",
    title: "Tianguis Bitcoin — El Mercado",
    desc: "Lanzamiento de Tianguis Bitcoin, el primer mercado P2P descentralizado basado en Nostr y Lightning Network. Permite compra/venta directa sin intermediarios. Se construye sobre strfry relay y se integra con NWC para wallets móviles.",
    img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop",
    glow: "shadow-[0_0_20px_rgba(247,147,26,0.3)]",
    milestone: "🛒 Tianguis P2P上线"
  },
  {
    year: "2023",
    quarter: "Q4",
    title: "Hackathon Bitcoin México",
    desc: "Organización del primer Hackathon Bitcoin en Mérida. 5 equipos, 48 horas de código, proyectos innovadores. Nace B.O.B. Hotel (Bitcoin Operated Brain) como proyecto ganador. Se establece partnership con Blockchain University.",
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop",
    glow: "shadow-[0_0_20px_rgba(0,255,65,0.3)]",
    milestone: "🏆 Hackathon inaugural"
  },
  {
    year: "2024",
    quarter: "Q2",
    title: "Blink Integration — Pagos Instantáneos",
    desc: "Migración de LNbits a Blink API para pagos Instantáneos y Stablesats. Se implementa el sistema de TipJar con QR generado en tiempo real. Se añade soporte para Lightning Address y direcciones on-chain.",
    img: "https://images.unsplash.com/photo-1644361566696-3d442b5b4f59?q=80&w=1000&auto=format&fit=crop",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.3)]",
    milestone: "💸 API Blink integrada"
  },
  {
    year: "2024",
    quarter: "Q3",
    title: "Oracle System v2.0 — El Rediseño",
    desc: "Rebranding completo a estética Cypherpunk Bank / Matrix. Se implementa el diseño system con colores Matrix Green (#00FF41) y Bitcoin Orange (#F7931A). Se añaden efectos visuales: MatrixRain, scanlines, arcade buttons. Se crean nuevos componentes: Market Mood Widget (stochastic heatmap), Price Converter (live data), Projects Showcase.",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
    glow: "shadow-[0_0_20px_rgba(0,255,65,0.3)]",
    milestone: "🎨 Oracle v2.0 lanzado"
  },
  {
    year: "2024",
    quarter: "Q4",
    title: "Directorios — Ecosistema Completo",
    desc: "Lanzamiento del directorio de proveedores (8 empresas confirmadas) y showcase de proyectos (4 proyectos internos + comunidad). Se establece el proceso de onboarding para nuevos negocios via Resend email. Se integra Cal.com para agendar reuniones.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    glow: "shadow-[0_0_20px_rgba(34,211,238,0.3)]",
    milestone: "📋 Directorio activo"
  },
  {
    year: "2025",
    quarter: "Q1",
    title: "BTC Map — Adopción Visible",
    desc: "Integración con BTC Map para mostrar merchants que aceptan Bitcoin en Mérida y Yucatán. Mapa interactivo con Leaflet, tiles oscuros CARTO, marcadores personalizados. Llamado a acción para agregar negocios faltantes.",
    img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop",
    glow: "shadow-[0_0_20px_rgba(34,197,94,0.3)]",
    milestone: "🗺️ Mapa en vivo"
  },
  {
    year: "2025",
    quarter: "Q2",
    title: "Estado Actual — El Presente",
    desc: "Acepta Bitcoin México opera como plataforma soberana de adopción. 8 proveedores activos, 4 proyectos en desarrollo, +150 usuarios registrados en Tianguis. Se mantiene como recurso educativo y de infraestructura para la comunidad. Código open-source AGPL-3.0.",
    img: "https://images.unsplash.com/photo-1644361566696-3d442b5b4f59?q=80&w=1000&auto=format&fit=crop",
    glow: "shadow-[0_0_20px_rgba(247,147,26,0.3)]",
    milestone: "🚀 En producción"
  }
];

export default function NuestraHistoriaPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden">
        
        {/* Fondo animado estilo Matrix */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-bitcoin/10 via-black to-black opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:30px_30px] [transform:perspective(500px)_rotateX(60deg)] animate-[scanline_10s_linear_infinite] origin-top" />
        
        {/* Grid de fondo */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(rgba(0, 255, 65, 0.08) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />

        <div className="container mx-auto px-4 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 bg-matrix/10 border border-matrix/30 px-4 py-2 rounded-full font-mono text-matrix text-xs uppercase tracking-[0.2em]">
              <Calendar className="h-3 w-3" />
              Timeline
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-white">Nuestra </span>
              <span className="text-matrix drop-shadow-[0_0_25px_rgba(0,255,65,0.5)]">Historia</span>
            </h1>
            
            <p className="font-mono text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
              La evolución de un movimiento soberano. Desde una reunión informal hasta una plataforma completa de adopción Bitcoin.
              <br />
              <span className="text-bitcoin">Construyendo el futuro, un bloque a la vez.</span>
            </p>
          </div>

          {/* Timeline vertical con líneas conectadoras */}
          <div className="relative max-w-4xl mx-auto">
            {/* Línea central */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-matrix via-bitcoin to-matrix/50 transform md:-translate-x-1/2" />
            
            {/* Eventos */}
            <div className="space-y-12">
              {historyEvents.map((evt, idx) => (
                <div 
                  key={idx} 
                  className={`relative flex flex-col md:flex-row gap-8 items-start ${
                    idx % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Punto en la línea de tiempo */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-matrix border-2 border-black rounded-full transform -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(0,255,65,0.8)]" />
                  
                  {/* Tarjeta de evento */}
                  <div className={`flex-1 ml-12 md:ml-0 ${idx % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className={`group bg-black/80 border border-white/10 backdrop-blur-md overflow-hidden hover:border-matrix/50 transition-all duration-500 ${evt.glow}`}>
                      
                      {/* Imagen con filtro */}
                      <div className="h-56 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                        <img 
                          src={evt.img} 
                          alt={evt.title} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 group-hover:grayscale-0 grayscale"
                        />
                        <div className="absolute top-4 left-4 z-20 bg-black/90 border border-matrix/50 px-4 py-1.5 font-mono text-matrix font-bold text-lg shadow-lg">
                          {evt.year} {evt.quarter && <span className="text-matrix/70 text-sm ml-1">{evt.quarter}</span>}
                        </div>
                      </div>

                      <div className="p-6 relative z-20">
                        {/* Milestone badge */}
                        <div className={`inline-flex items-center gap-2 mb-3 text-matrix font-mono text-[10px] uppercase tracking-wider px-2 py-1 bg-matrix/10 border border-matrix/20 rounded`}>
                          <Zap className="w-3 h-3" />
                          {evt.milestone}
                        </div>
                        
                        <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-matrix transition-colors">
                          {evt.title}
                        </h3>
                        
                        <p className="font-mono text-gray-400 text-sm leading-relaxed">
                          {evt.desc}
                        </p>
                      </div>

                      {/* Decoración de esquinas */}
                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-matrix group-hover:border-matrix transition-colors" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-matrix group-hover:border-matrix transition-colors" />
                    </div>
                  </div>
                  
                  {/* Espaciado para la línea en desktop */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="mt-20 text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-bitcoin/10 border border-bitcoin/30 px-4 py-2 rounded-full">
                <Users className="h-4 w-4 text-bitcoin" />
                <span className="font-mono text-xs text-bitcoin font-bold uppercase tracking-[0.2em]">
                  Únete a la Historia
                </span>
              </div>
              <p className="font-mono text-sm text-gray-400 max-w-lg mx-auto">
                El próximo capítulo se escribe con código abierto, nodos soberanos y adoption grassroots.
              </p>
              <a
                href="/crea-tu-tienda"
                className="inline-flex items-center gap-2 px-8 py-4 bg-matrix text-black font-vt323 text-xl tracking-wide rounded-lg hover:bg-matrix/90 transition-all shadow-[0_0_25px_rgba(0,255,65,0.4)]"
              >
                <Zap className="h-5 w-5" />
                Sé Parte del Cambio →
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}