import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";

export default function CreaTuTiendaPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white py-20 relative">
        {/* Efectos de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-bitcoin/5 to-black pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          
          <div className="border border-white/10 bg-black/80 backdrop-blur-lg p-8 md:p-12 rounded-sm shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            
            {/* Encabezado del Formulario */}
            <div className="mb-10 border-b border-white/10 pb-6">
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Onboarding Comercial</h1>
              <p className="font-mono text-sm text-cyan-400">
                <span className="text-gray-500">root@system:</span> ~/config/merchant-setup.sh
              </p>
              <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                Para diseñar la solución adecuada para tu negocio, necesitamos diagnosticar tu capacidad técnica actual. Selecciona la opción que mejor describa tu estado actual.
              </p>
            </div>

            <form className="space-y-8">
              
              {/* Pregunta 1 */}
              <div className="space-y-4">
                <label className="block font-mono text-sm text-bitcoin uppercase tracking-wider">
                  01. Nivel de Experiencia Técnica
                </label>
                <div className="grid gap-3">
                  <label className="flex items-center gap-4 p-4 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-bitcoin/50 cursor-pointer transition-all rounded-sm group">
                    <input type="radio" name="tech_level" className="accent-bitcoin w-4 h-4" />
                    <div className="flex-1">
                      <span className="block text-white font-bold group-hover:text-bitcoin transition-colors">Novato / Soy solo el dueño</span>
                      <span className="block font-mono text-xs text-gray-500">Necesito una solución llave en mano (POS, Soporte).</span>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-4 p-4 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50 cursor-pointer transition-all rounded-sm group">
                    <input type="radio" name="tech_level" className="accent-cyan-500 w-4 h-4" />
                    <div className="flex-1">
                      <span className="block text-white font-bold group-hover:text-cyan-400 transition-colors">Intermedio / Tengo POS</span>
                      <span className="block font-mono text-xs text-gray-500">Ya uso LNbits o BTCPay pero necesito integración web.</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-500/50 cursor-pointer transition-all rounded-sm group">
                    <input type="radio" name="tech_level" className="accent-purple-500 w-4 h-4" />
                    <div className="flex-1">
                      <span className="block text-white font-bold group-hover:text-purple-400 transition-colors">Avanzado / Run Node</span>
                      <span className="block font-mono text-xs text-gray-500">Ejecuto mi propio nodo y quiero arquitectura personalizada.</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Pregunta 2 */}
              <div className="space-y-4">
                <label className="block font-mono text-sm text-bitcoin uppercase tracking-wider">
                  02. Infraestructura Actual
                </label>
                <select className="w-full bg-black border border-white/20 text-white p-3 font-mono text-sm focus:border-bitcoin focus:outline-none focus:ring-1 focus:ring-bitcoin rounded-sm">
                  <option>-- SELECCIONAR SISTEMA --</option>
                  <option>Tienda Física (Solo Presencial)</option>
                  <option>E-commerce (Sitio Web existente)</option>
                  <option>Solo Redes Sociales</option>
                  <option>Estoy starting from scratch</option>
                </select>
              </div>

              {/* Inputs de Contacto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-mono text-xs text-gray-500 uppercase">Identificación (Nombre)</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 text-white p-3 font-mono text-sm focus:border-cyan-400 focus:outline-none rounded-sm transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="block font-mono text-xs text-gray-500 uppercase">Canal Seguro (Email)</label>
                  <input type="email" placeholder="john@business.com" className="w-full bg-white/5 border border-white/10 text-white p-3 font-mono text-sm focus:border-cyan-400 focus:outline-none rounded-sm transition-colors" />
                </div>
              </div>

              {/* Botón de Envío */}
              <Button className="w-full bg-bitcoin hover:bg-bitcoin/90 text-black font-bold font-mono py-6 mt-4 text-lg uppercase tracking-widest border border-transparent shadow-[0_0_20px_rgba(247,147,26,0.4)]">
                Iniciar Protocolo de Instalación
              </Button>

            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}