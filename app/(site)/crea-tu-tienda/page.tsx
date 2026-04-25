"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Terminal, Store, DollarSign, MapPin, Cpu } from "lucide-react";
import { useState } from "react";
import { submitOnboarding } from "@/app/actions/submit-onboarding";

export default function CreaTuTiendaPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    category: "",
    volume: "",
    techLevel: "",
    currentInfra: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Crear un objeto FormData nativo del navegador
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Llamar al Server Action directamente
    const result = await submitOnboarding(formData);

    if (result.success) {
      alert(">> PROTOCOLO EXITOSO. CHEQUEA TU CORREO.");
      // Aquí podrías redirigir al usuario: router.push('/gracias');
    } else {
      alert(">> ERROR EN LA TRANSMISIÓN: " + result.error);
    }
  };


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white py-20 relative">
        
        {/* Efectos de fondo Matrix */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-matrix/5 to-black pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30 pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          
          <div className="border border-white/10 bg-black/90 backdrop-blur-xl p-8 md:p-12 rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.9)] relative overflow-hidden">
            
            {/* Línea decorativa superior */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-matrix to-transparent opacity-50" />

            {/* Encabezado del Formulario */}
            <div className="mb-10 border-b border-white/10 pb-6">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-5 h-5 text-matrix" />
                <span className="font-mono text-xs text-matrix tracking-widest">&gt;&gt; MERCHANT_ONBOARDING_PROTOCOL_v2.0</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Conecta tu Negocio</h1>
              <p className="font-mono text-sm text-gray-400">
                Diagnóstico técnico y comercial. Nuestra IA recomendará la stack adecuada para tu soberanía financiera.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* SECCIÓN 1: DATOS COMERCIALES (Nuevos Campos) */}
              <div className="space-y-6 p-6 border border-white/5 bg-white/[0.02] rounded-sm">
                <h3 className="font-mono text-xs text-bitcoin uppercase tracking-wider flex items-center gap-2">
                  <Store className="w-3 h-3" /> Identificación Comercial
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] text-gray-500 uppercase">Contacto Principal</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-black border border-white/20 text-white p-3 font-mono text-sm focus:border-matrix focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] rounded-sm transition-all"
                      placeholder="Tu Nombre"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] text-gray-500 uppercase">Canal Seguro (Email)</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-black border border-white/20 text-white p-3 font-mono text-sm focus:border-matrix focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] rounded-sm transition-all"
                      placeholder="nombre@negocio.com"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block font-mono text-[10px] text-gray-500 uppercase">Nombre del Negocio / Proyecto</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-black border border-white/20 text-white p-3 font-mono text-sm focus:border-bitcoin focus:outline-none focus:shadow-[0_0_10px_rgba(247,147,26,0.2)] rounded-sm transition-all"
                      placeholder="Ej: Tacos El Satoshi / Cyber Café Merida"
                      name="businessName"
                      value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="block font-mono text-[10px] text-gray-500 uppercase">Rubro / Categoría</label>
                    <select 
                      className="w-full bg-black border border-white/20 text-white p-3 font-mono text-sm focus:border-matrix focus:outline-none rounded-sm"
                      name="category"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="">-- SELECCIONAR --</option>
                      <option value="gastronomia">Gastronomía & Bebidas</option>
                      <option value="retail">Retail & Tiendas</option>
                      <option value="servicios">Servicios Profesionales</option>
                      <option value="tecnologia">Tecnología & SaaS</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                   <div className="space-y-2">
                    <label className="block font-mono text-[10px] text-gray-500 uppercase">Volumen Mensual Estimado</label>
                    <select 
                      className="w-full bg-black border border-white/20 text-white p-3 font-mono text-sm focus:border-bitcoin focus:outline-none rounded-sm"
                      name="volume"
                      value={formData.volume}
                      onChange={(e) => setFormData({...formData, volume: e.target.value})}
                    >
                      <option value="">-- SELECCIONAR --</option>
                      <option value="micro">Micro (&lt; $10k MXN)</option>
                      <option value="medio">Medio ($10k - $100k MXN)</option>
                      <option value="alto">Alto (&gt; $100k MXN)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECCIÓN 2: DIAGNÓSTICO TÉCNICO */}
              <div className="space-y-6">
                <label className="block font-mono text-sm text-matrix uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> 01. Nivel de Experiencia Técnica
                </label>
                
                <div className="grid gap-3">
                  {/* Opción Novato */}
                  <label className={`flex items-center gap-4 p-4 border ${formData.techLevel === 'novato' ? 'border-bitcoin bg-bitcoin/5' : 'border-white/10 bg-white/5'} hover:border-bitcoin/50 cursor-pointer transition-all rounded-sm group`}>
                    <input 
                      type="radio" 
                      name="techLevel" 
                      value="novato"
                      checked={formData.techLevel === 'novato'}
                      onChange={(e) => setFormData({...formData, techLevel: e.target.value})}
                      className="accent-bitcoin w-4 h-4" 
                    />
                    <div className="flex-1">
                      <span className="block text-white font-bold group-hover:text-bitcoin transition-colors">Novato / Soy solo el dueño</span>
                      <span className="block font-mono text-xs text-gray-500">Necesito una solución llave en mano (POS, Soporte).</span>
                    </div>
                  </label>
                  
                  {/* Opción Intermedio (Ahora Matrix) */}
                  <label className={`flex items-center gap-4 p-4 border ${formData.techLevel === 'intermedio' ? 'border-matrix bg-matrix/5' : 'border-white/10 bg-white/5'} hover:border-matrix/50 cursor-pointer transition-all rounded-sm group`}>
                    <input 
                      type="radio" 
                      name="techLevel" 
                      value="intermedio"
                      checked={formData.techLevel === 'intermedio'}
                      onChange={(e) => setFormData({...formData, techLevel: e.target.value})}
                      className="accent-matrix w-4 h-4" 
                    />
                    <div className="flex-1">
                      <span className="block text-white font-bold group-hover:text-matrix transition-colors">Intermedio / Tengo POS</span>
                      <span className="block font-mono text-xs text-gray-500">Ya uso BTCPay pero necesito integración web.</span>
                    </div>
                  </label>

                  {/* Opción Avanzado */}
                  <label className={`flex items-center gap-4 p-4 border ${formData.techLevel === 'avanzado' ? 'border-bitcoin bg-bitcoin/5' : 'border-white/10 bg-white/5'} hover:border-bitcoin/50 cursor-pointer transition-all rounded-sm group`}>
                    <input 
                      type="radio" 
                      name="techLevel" 
                      value="avanzado"
                      checked={formData.techLevel === 'avanzado'}
                      onChange={(e) => setFormData({...formData, techLevel: e.target.value})}
                      className="accent-bitcoin w-4 h-4" 
                    />
                    <div className="flex-1">
                      <span className="block text-white font-bold group-hover:text-bitcoin transition-colors">Avanzado / Run Node</span>
                      <span className="block font-mono text-xs text-gray-500">Ejecuto mi propio nodo y quiero arquitectura personalizada.</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Pregunta Final */}
              <div className="space-y-4">
                <label className="block font-mono text-sm text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> 02. Infraestructura Actual
                </label>
                <select 
                  className="w-full bg-black border border-white/20 text-white p-3 font-mono text-sm focus:border-matrix focus:outline-none focus:ring-1 focus:ring-matrix rounded-sm"
                  name="currentInfra"
                  value={formData.currentInfra}
                  onChange={(e) => setFormData({...formData, currentInfra: e.target.value})}
                >
                  <option value="">-- SELECCIONAR SISTEMA --</option>
                  <option>Tienda Física (Solo Presencial)</option>
                  <option>E-commerce (Sitio Web existente)</option>
                  <option>Solo Redes Sociales</option>
                  <option>Starting from scratch</option>
                </select>
              </div>

              {/* Botón de Envío */}
              <Button 
                type="submit"
                className="w-full bg-bitcoin hover:bg-bitcoin/90 text-black font-bold font-mono py-6 mt-4 text-lg uppercase tracking-widest border border-transparent shadow-[0_0_20px_rgba(247,147,26,0.4)] hover:shadow-[0_0_30px_rgba(247,147,26,0.6)] transition-all"
              >
                Iniciar Protocolo de Instalación
              </Button>

              {/* Nota de Privacidad */}
              <p className="text-center font-mono text-[10px] text-gray-600 mt-4">
                [SYS.LOG] Los datos se procesan localmente y se transmiten de forma encriptada. No compartimos tu información con terceros.
              </p>

            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}