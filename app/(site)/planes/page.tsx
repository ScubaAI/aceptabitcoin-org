// ============================================
// 1. IMPORTS
// ============================================
import { Metadata } from "next";
import { PRICING_TIERS } from "@/data/pricing";
import PricingCard from "@/components/ui/PricingCard";
import PricingTicker from "@/components/ui/PricingTicker";
import Navbar from "@/components/layout/Navbar"; // ✅ Agregado
import { Check, X } from "lucide-react";

// ============================================
// 2. METADATA
// ============================================
export const metadata: Metadata = {
  title: "Planes y Precios | AceptaBitcoin",
  description: "Infraestructura de pago soberana con Bitcoin. Desde $0 de setup. Sin custodia, sin KYC. Lightning Network y BTCPay Server.",
};

// ============================================
// 3. COMPONENTE PRINCIPAL
// ============================================
export default function PlanesPage() {
  return (
    <>
      {/* ✅ Navbar — Consistente con todo el sitio */}
      <Navbar />
      
      {/* ✅ pt-16 para evitar overlap con el ticker */}
      <main className="min-h-screen bg-black text-gray-100 relative overflow-hidden pt-16">
        
        {/* Fondo de grilla sutil (Design System v2.1) */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,255,65,0.08)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Ticker de anuncio (Clickable y con pausa en hover) */}
        <div className="relative z-20">
          <PricingTicker />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">

          {/* HEADER DE SECCIÓN */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-matrix/30 rounded-sm bg-matrix/5 mb-6">
              <span className="w-2 h-2 rounded-full bg-matrix animate-pulse" />
              <span className="font-vt323 text-matrix text-sm tracking-widest">SYSTEM_STATUS: ONLINE</span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl text-white mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              MATRIZ DE <span className="text-bitcoin">PRECIOS</span>
            </h1>

            <p className="font-mono text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Infraestructura soberana de pago. Sin custodios, sin intermediarios, sin fricción.
              Elige el nivel de despliegue que tu negocio necesita para operar en la red Bitcoin.
            </p>
          </div>

          {/* GRID DE TARJETAS DE PRECIOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {PRICING_TIERS.map((tier) => (
              <PricingCard key={tier.id} tier={tier} />
            ))}
          </div>

          {/* MATRIZ DE CARACTERÍSTICAS (Estilo Terminal) */}
          <div className="border border-matrix/30 bg-black/80 backdrop-blur-md rounded-sm p-6 md:p-8 mb-24 shadow-[0_0_30px_rgba(0,255,65,0.05)]">
            <h2 className="font-vt323 text-2xl text-matrix mb-6 tracking-wider flex items-center gap-2">
              <span className="text-bitcoin">&gt;</span> MATRIZ_DE_CARACTERISTICAS.exe
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full font-mono text-sm text-left min-w-[600px]">
                <thead>
                  <tr className="border-b border-matrix/30 text-matrix">
                    <th className="py-3 px-4 font-vt323 text-lg">CARACTERÍSTICA</th>
                    <th className="py-3 px-4 text-center font-vt323 text-lg">BÁSICO</th>
                    <th className="py-3 px-4 text-center font-vt323 text-lg text-bitcoin">PRO</th>
                    <th className="py-3 px-4 text-center font-vt323 text-lg">PREMIUM</th>
                    <th className="py-3 px-4 text-center font-vt323 text-lg">ENTERPRISE</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <ComparisonRow feature="BTCPay Server / POS" basic pro premium enterprise />
                  <ComparisonRow feature="Links de Pago (Redes Sociales)" basic pro premium enterprise />
                  <ComparisonRow feature="Split Automático (Prism)" basic pro premium enterprise />
                  <ComparisonRow feature="Landing Page Profesional" pro premium enterprise />
                  <ComparisonRow feature="Hosting + Dominio (1 año)" pro premium enterprise />
                  <ComparisonRow feature="CMS / Panel No-Code" premium enterprise />
                  <ComparisonRow feature="Catálogo / Tienda Completa" premium enterprise />
                  <ComparisonRow feature="Asistente de IA (B.O.B.)" enterprise />
                  <ComparisonRow feature="VFX Reactivos & Soporte 24/7" enterprise />
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA FINAL */}
          <div className="text-center border-t border-white/10 pt-12">
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">
              ¿Listo para desplegar tu infraestructura?
            </h3>
            <p className="font-mono text-gray-400 mb-8 max-w-xl mx-auto">
              Habla directamente con nuestro equipo de ingeniería. Sin vendedores, solo soluciones técnicas.
            </p>
            <a
              href="https://wa.me/525586765117?text=Hola,%20quiero%20información%20sobre%20los%20planes%20de%20AceptaBitcoin."
              className="inline-flex items-center gap-2 font-vt323 text-xl bg-bitcoin text-black px-8 py-4 hover:bg-bitcoin/90 transition-all shadow-[0_0_20px_rgba(247,147,26,0.3)] hover:shadow-[0_0_30px_rgba(247,147,26,0.5)] uppercase tracking-widest"
            >
              [ INICIAR_SISTEMA ]
            </a>
          </div>

        </div>
      </main>
    </>
  );
}

// ─── Helper Component para mantener el código limpio ───
function ComparisonRow({
  feature,
  basic = false,
  pro = false,
  premium = false,
  enterprise = false
}: {
  feature: string;
  basic?: boolean;
  pro?: boolean;
  premium?: boolean;
  enterprise?: boolean;
}) {
  return (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
      <td className="py-4 px-4 text-gray-200">{feature}</td>
      <td className="py-4 px-4 text-center">
        {basic ? <Check className="w-5 h-5 text-matrix mx-auto" /> : <X className="w-5 h-5 text-gray-700 mx-auto" />}
      </td>
      <td className="py-4 px-4 text-center">
        {pro ? <Check className="w-5 h-5 text-matrix mx-auto" /> : <X className="w-5 h-5 text-gray-700 mx-auto" />}
      </td>
      <td className="py-4 px-4 text-center">
        {premium ? <Check className="w-5 h-5 text-matrix mx-auto" /> : <X className="w-5 h-5 text-gray-700 mx-auto" />}
      </td>
      <td className="py-4 px-4 text-center">
        {enterprise ? <Check className="w-5 h-5 text-matrix mx-auto" /> : <X className="w-5 h-5 text-gray-700 mx-auto" />}
      </td>
    </tr>
  );
}