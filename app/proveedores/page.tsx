import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Globe, Cpu, Activity } from "lucide-react";

export default function ProveedoresPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white font-sans selection:bg-bitcoin selection:text-black">
        
        {/* Fondo Técnico */}
        <div className="fixed inset-0 bg-[radial-gradient(rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none z-0" />
        <div className="fixed inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-0" />

        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
          
          {/* Header */}
          <div className="mb-12 text-center md:text-left border-l-4 border-bitcoin pl-6 py-2 bg-white/5 backdrop-blur-sm max-w-4xl">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-2">
              Directorio <span className="text-bitcoin">Sovereign</span>
            </h1>
            <p className="font-mono text-cyan-400 text-sm md:text-base flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>// API_FEED: BTC_MAP_V2.0</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Panel Lateral de Datos */}
            <div className="lg:col-span-1 space-y-6">
              <div className="border border-white/10 bg-black/80 backdrop-blur-md p-6 rounded-sm">
                <h3 className="font-mono text-gray-400 text-xs uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                  System Status
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-300">Nodos Activos</span>
                    <span className="font-mono text-green-400 text-xs">● LIVE</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-300">Conexiones LN</span>
                    <span className="font-mono text-cyan-400 text-xs">1,024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-300">Comercios</span>
                    <span className="font-mono text-bitcoin text-xs">LOADING...</span>
                  </div>
                </div>
              </div>

              <div className="border border-white/10 bg-black/80 backdrop-blur-md p-6 rounded-sm">
                <h3 className="font-mono text-gray-400 text-xs uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                  Categorías
                </h3>
                <ul className="space-y-2 font-mono text-sm text-gray-300">
                  <li className="hover:text-bitcoin cursor-pointer transition-colors flex items-center gap-2">
                    <span className="text-bitcoin">➜</span> Cafeterías
                  </li>
                  <li className="hover:text-bitcoin cursor-pointer transition-colors flex items-center gap-2">
                    <span className="text-bitcoin">➜</span> Tecnología
                  </li>
                  <li className="hover:text-bitcoin cursor-pointer transition-colors flex items-center gap-2">
                    <span className="text-bitcoin">➜</span> Artesanías
                  </li>
                  <li className="hover:text-bitcoin cursor-pointer transition-colors flex items-center gap-2">
                    <span className="text-bitcoin">➜</span> Servicios
                  </li>
                </ul>
              </div>
            </div>

            {/* Área Principal del Mapa */}
            <div className="lg:col-span-2 h-[600px] border border-white/20 relative bg-gray-900/50 rounded-sm overflow-hidden group">
              {/* Overlay de interfaz sobre el mapa */}
              <div className="absolute top-4 left-4 z-20 bg-black/80 border border-cyan-500/30 px-3 py-1 font-mono text-xs text-cyan-400 flex items-center gap-2">
                <MapPin className="w-3 h-3 animate-pulse" />
                <span>SATELLITE_VIEW_ACTIVE</span>
              </div>
              
              <div className="absolute bottom-4 right-4 z-20 bg-black/80 border border-bitcoin/30 px-3 py-1 font-mono text-xs text-bitcoin">
                DATA_SOURCE: BTCMAP.ORG
              </div>

              {/* Aquí iría tu componente real de Mapa o Iframe de BTCMap */}
              {/* Simulación visual para el ejemplo */}
              <div className="w-full h-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-89.59,20.96,12,0/800x600?access_token=Pk.fake')] bg-cover bg-center grayscale opacity-60 group-hover:opacity-80 transition-all duration-500">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
              </div>
              
              {/* Nota técnica: Reemplaza el div de arriba por tu componente de mapa real */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="font-mono text-bitcoin/50 text-sm tracking-widest border border-bitcoin/30 bg-black/90 px-4 py-2">
                  [INITIALIZE_MAP_MODULE]
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
