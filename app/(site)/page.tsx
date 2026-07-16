// ============================================
// 1. IMPORTS DE NEXT.JS / REACT
// ============================================
import dynamic from "next/dynamic";
import Link from "next/link";

// ============================================
// 2. COMPONENTES DE LAYOUT
// ============================================
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import PricingTicker from "@/components/ui/PricingTicker"; // 🆕 Ticker de Servicios/Precios

// ============================================
// 3. SECCIONES PRINCIPALES
// ============================================
import PriceConverter from "@/components/sections/PriceConverter";
import TipJarSection from "@/components/sections/TipJarSection";

// ============================================
// 4. UI COMPONENTS & ICONOS
// ============================================
import { Button } from "@/components/ui/button";
import { Store, LayoutGrid } from "lucide-react";

// ============================================
// 5. HEADERS DE SECCIÓN (Design System v2.0)
// ============================================
import BobSectionHeader from "@/components/widgets/bob-chat/BobSectionHeader";
import AhorraSectionHeader from "@/components/widgets/AhorraSectionHeader";
import AceptaBitcoinSectionHeader from "@/components/widgets/AceptaBitcoinSectionHeader";

// ============================================
// 6. NUEVOS COMPONENTES (Educational & Partners)
// ============================================
import { PartnersCarousel } from "@/components/ui/PartnersCarousel";

// ============================================
// 7. DYNAMIC IMPORTS (Client-only components)
// ============================================

// 🤖 B.O.B. Chat Widget: Client-only (sessionStorage + typing)
const BobChatWidget = dynamic(
  () => import('@/components/widgets/bob-chat/BobChatWidget'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] bg-black/40 border border-white/10 rounded-2xl animate-pulse" 
           aria-busy="true" 
           aria-label="Cargando B.O.B..." />
    ),
  }
);

// 📊 Market Mood Widget: Client-only con skeleton
const MarketMoodWidget = dynamic(
  () => import("@/components/widgets/MarketMoodWidget"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-black/60 border border-white/10 rounded-xl p-6 animate-pulse">
        <div className="h-4 bg-white/5 rounded w-24 mb-4" />
        <div className="h-16 bg-white/5 rounded w-16 mx-auto mb-4" />
        <div className="h-6 bg-white/5 rounded w-32 mx-auto" />
      </div>
    ),
  }
);

// 💬 WhatsApp Button: Client-only (Canvas + AudioContext)
const MatrixArcadeWhatsApp = dynamic(
  () => import("@/components/ui/MatrixArcadeWhatsApp"),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed bottom-6 right-6 z-40 w-24 h-24 rounded-3xl bg-black/40 border border-white/10 animate-pulse"
        aria-label="Cargando contacto..."
        role="status"
      />
    ),
  }
);

// ============================================
// 8. UTILIDADES
// ============================================
import { getNextEdition } from "@/lib/hackathon/editions";

// ============================================
// 9. COMPONENTE PRINCIPAL
// ============================================
export default async function Home() {
  const nextEdition = await getNextEdition();

  return (
    <>
      <Navbar />
      
      {/* ✅ pt-16 agrega 64px (4rem) de padding superior para evitar overlap con el ticker */}
      <main className="flex flex-col bg-black text-[#FAFAFA] scroll-smooth pt-16">
        
        {/* 🆕 PRICING TICKER — Barra de estado soberana (Above Hero) */}
        <PricingTicker />

        {/* 1️⃣ HERO — Primera impresión */}
        <Hero nextEdition={nextEdition} />

        {/* 2️⃣ "APRENDE" — Header introductorio para B.O.B. */}
        <section 
          id="aprende" 
          className="relative z-10 py-20 sm:py-28 bg-black scroll-mt-24"
          aria-labelledby="aprende-title"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <BobSectionHeader
                id="aprende-title"
                title="Aprende"
                subtitle="Pregunta a B.O.B. — tu tutor cypherpunk"
                activeContext="fundamentos"
              />
            </div>
          </div>
        </section>

        {/* 3️⃣ B.O.B. Chat Widget — Núcleo educativo */}
        <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-12 bg-black">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <BobChatWidget 
                mode="hero" 
                defaultContext="fundamentos" 
                lang="es" 
              />
            </div>
          </div>
        </section>

        {/* 4️⃣ "AHORRA" — Market Mood Widget (DCA indicator) + Partners Carousel */}
        <section 
          id="ahorra" 
          className="py-20 sm:py-28 bg-black border-y border-white/5 scroll-mt-24"
          aria-labelledby="ahorra-title"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <AhorraSectionHeader
                id="ahorra-title"
                title="Ahorra"
                subtitle="Indicadores en tiempo real • Toma decisiones informadas"
                marketTrend="bullish"
              />
              
              <div className="mt-12 space-y-12">
                {/* Widget DCA */}
                <div className="max-w-md mx-auto">
                  <MarketMoodWidget />
                </div>

                {/* Carrusel de Partners (Aliados Soberanos) */}
                <div className="pt-8 border-t border-white/10">
                  <PartnersCarousel />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5️⃣ "ACEPTA" — Header Calculadora */}
        <section 
          id="calculadora" 
          className="relative z-10 py-20 sm:py-28 bg-black border-y border-white/5 scroll-mt-24"
          aria-labelledby="calculadora-title"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <AceptaBitcoinSectionHeader
                id="calculadora-title"
                title="Acepta Bitcoin"
                subtitle="Calculadora de pagos, conversiones y ahorros en tiempo real"
                fiatCurrency="MXN"
                calculationMode="conversion"
              />
            </div>
          </div>
        </section>

        {/* 6️⃣ Calculadora — Price Converter */}
        <section className="relative py-20 sm:py-28 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 sm:gap-16 items-center">
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-matrix text-xs font-mono uppercase tracking-wider border border-matrix/20">
                  Market Data
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFAFA]">
                  Convierte al instante <br />
                  <span className="text-bitcoin">tu Bitcoin a fiat.</span>
                </h2>
                <p className="text-base sm:text-lg text-gray-400 font-mono leading-relaxed">
                  Nuestra calculadora te permite saber en tiempo real cuánto vale tu Bitcoin, 
                  con datos de los mejores proveedores de inteligencia financiera. 
                  Ideal para comercios, ahorros y transacciones diarias.
                </p>
              </div>
              <PriceConverter />
            </div>
          </div>
        </section>

        {/* 7️⃣ "NEGOCIA" — Cards: Crea tu Tienda + Tianguis */}
        <section 
          id="negocia" 
          className="py-20 sm:py-28 bg-black relative overflow-hidden scroll-mt-24"
          aria-labelledby="negocia-title"
        >
          {/* Fondo grid sutil */}
          <div 
            className="absolute inset-0 bg-[radial-gradient(rgba(0,255,65,0.035)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50 pointer-events-none" 
            aria-hidden="true" 
          />
          
          <div className="container relative z-10 mx-auto px-4">
            <h2 id="negocia-title" className="sr-only">Negocia con Bitcoin</h2>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              
              {/* Card 1: Crea tu Tienda (Bitcoin Orange) */}
              <article className="group relative bg-black/60 border border-bitcoin/20 rounded-2xl p-8 sm:p-10 backdrop-blur-md hover:border-bitcoin/40 hover:shadow-[0_0_40px_rgba(247,147,26,0.15)] transition-all duration-500 hover:-translate-y-1">
                <div className="absolute -right-12 -top-12 w-64 h-64 bg-bitcoin/5 rounded-full blur-3xl group-hover:bg-bitcoin/10 transition-all duration-500" aria-hidden="true" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="h-14 w-14 rounded-xl bg-bitcoin/10 border border-bitcoin/30 flex items-center justify-center mb-6 text-bitcoin">
                    <Store className="h-7 w-7" aria-hidden="true" />
                  </div>
                  
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-[#FAFAFA]">
                    Crea tu tienda en minutos
                  </h3>
                  
                  <p className="font-mono text-gray-400 mb-8 flex-grow leading-relaxed">
                    Infraestructura soberana con BTCPay Server + Point of Sale listo para usar.
                  </p>
                  
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full font-serif font-bold bg-bitcoin hover:bg-bitcoin/90 text-black transition-colors rounded-xl"
                  >
                    <Link href="/crea-tu-tienda">Solicitar Alta de Negocio</Link>
                  </Button>
                </div>
              </article>

              {/* Card 2: Tianguis Bitcoin (Matrix Green) */}
              <article className="group relative bg-black/60 border border-matrix/20 rounded-2xl p-8 sm:p-10 backdrop-blur-md hover:border-matrix/40 hover:shadow-[0_0_40px_rgba(0,255,65,0.15)] transition-all duration-500 hover:-translate-y-1">
                <div className="absolute -right-12 -top-12 w-64 h-64 bg-matrix/5 rounded-full blur-3xl group-hover:bg-matrix/10 transition-all duration-500" aria-hidden="true" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="h-14 w-14 rounded-xl bg-matrix/10 border border-matrix/30 flex items-center justify-center mb-6 text-matrix">
                    <LayoutGrid className="h-7 w-7" aria-hidden="true" />
                  </div>
                  
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-[#FAFAFA]">
                    Tianguis Bitcoin Mérida
                  </h3>
                  
                  <p className="font-mono text-gray-400 mb-8 flex-grow leading-relaxed">
                    El primer marketplace descentralizado impulsado por Nostr y Lightning. 
                    Compra y vende sin intermediarios.
                  </p>
                  
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full font-serif font-bold bg-matrix hover:bg-matrix/90 text-black transition-colors rounded-xl"
                  >
                    <Link href="/tianguis">Explorar el Tianguis</Link>
                  </Button>
                </div>
              </article>

            </div>
          </div>
        </section>

        {/* 8️ TipJar — Donaciones Lightning */}
        <TipJarSection />

        {/* Botón flotante de contacto (siempre accesible) */}
        <MatrixArcadeWhatsApp
          phoneNumber="+525586765117"
          message="Hola, quiero aprender sobre Bitcoin 🟢"
          label="Soporte técnico"
          size="lg"
          enableSound={false}
          onlineStatus="online"
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 pb-safe-ios"
        />

      </main>

    </>
  );
}