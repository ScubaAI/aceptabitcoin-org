import Hero from "@/components/layout/Hero";
import PriceConverter from "@/components/sections/PriceConverter";
import TipJarSection from "@/components/sections/TipJarSection";
// BtcMapSection importado pero NO usado
import { AgendaSection } from "@/components/sections/AgendaSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Store, LayoutGrid, Gamepad2 } from "lucide-react";
import ArcadeButton from "@/components/ui/arcade-button";

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="space-y-0">
        <Hero />

        {/* --- Calculadora Section --- */}
        <section className="relative py-24 bg-background">
          <div className="container px-4">
            <div className="grid lg:grid-cols-[1fr,1.2fr] gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider border border-secondary/20">
                  Market Data
                </div>
                <h2 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
                  Bitcoin es el dinero <br />
                  <span className="text-bitcoin">de la libertad.</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  No importa si el precio sube o baja, la red sigue confirmando bloques cada 10 minutos. 
                  Usa nuestra calculadora para ver el valor actual en pesos mexicanos.
                </p>
              </div>
              <PriceConverter />
            </div>
          </div>
        </section>

        {/* --- Bitcoin Agent / Aprende Section (ACTUALIZADO) --- */}
        <section id="aprende" className="py-24 bg-background relative overflow-hidden border-y border-border/50">
          {/* Fondo decorativo estilo Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
          
          <div className="container relative z-10 px-4">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              
              <div className="mb-4 flex items-center gap-2 text-bitcoin animate-pulse">
                <Gamepad2 className="h-6 w-6" />
                <span className="text-sm font-bold tracking-widest uppercase">Nueva Experiencia</span>
              </div>

              <h2 className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-6">
                Aprende Bitcoin <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">
                  jugando.
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
                Olvida la teoría aburrida. Entra a la plataforma de <strong>Visionary AI</strong>: 
                laboratorios interactivos, simuladores de IA y retos de criptografía.
              </p>
              
              <ArcadeButton href="https://bitcoin.visionaryai.lat">
                INICIAR MISION
              </ArcadeButton>

              <p className="mt-6 text-sm text-gray-600 font-vt323">
                // SE REQUIERE CONEXIÓN A LA RED //
              </p>
            </div>
          </div>
        </section>

        {/* --- Mercados e Impacto (Estilo Cypherpunk Bank) --- */}
        <section className="py-24 bg-black relative overflow-hidden">
          {/* Fondo decorativo sutil */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
          
          <div className="container relative z-10 px-4">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Card 1: Crea tu Tienda (Estilo Bitcoin) */}
              <div className="group relative rounded-xl border border-bitcoin/20 bg-black/40 p-10 overflow-hidden transition-all duration-300 hover:border-bitcoin/50 hover:shadow-[0_0_30px_rgba(247,147,26,0.15)] hover:-translate-y-1">
                {/* Glow decorativo */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-bitcoin/5 blur-3xl transition-all group-hover:bg-bitcoin/10" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="h-12 w-12 mb-6 rounded-lg bg-bitcoin/10 border border-bitcoin/20 flex items-center justify-center text-bitcoin">
                    <Store className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-3xl font-bold mb-4 text-white">
                    Crea tu tienda en minutos
                  </h3>
                  <p className="font-mono text-sm text-gray-400 mb-8 leading-relaxed flex-grow">
                    Infraestructura soberana: BTCPay Server + LNbits + Point of Sale listo para usar.
                  </p>
                  <Button asChild variant="outline" className="w-full md:w-auto border-bitcoin/30 text-bitcoin font-bold hover:bg-bitcoin hover:text-black font-serif transition-all rounded">
                    <Link href="/crea-tu-tienda">Solicitar Alta de Negocio</Link>
                  </Button>
                </div>
              </div>

              {/* Card 2: Tianguis Bitcoin (Estilo Cypherpunk/Cyan) */}
              <div className="group relative rounded-xl border border-cyan-500/20 bg-black/40 p-10 overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1">
                {/* Glow decorativo */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl transition-all group-hover:bg-cyan-500/10" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="h-12 w-12 mb-6 rounded-lg bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <LayoutGrid className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-3xl font-bold mb-4 text-white">
                    Tianguis Bitcoin Mérida
                  </h3>
                  <p className="font-mono text-sm text-gray-400 mb-8 leading-relaxed flex-grow">
                    El primer marketplace descentralizado impulsado por Nostr y Lightning. Compra y vende sin intermediarios.
                  </p>
                  <Button asChild variant="outline" className="w-full md:w-auto border-cyan-500/30 text-cyan-400 font-bold hover:bg-cyan-500 hover:text-black font-serif transition-all rounded">
                    <Link href="/tianguis">Explorar el Tianguis</Link>
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </section>

        <TipJarSection />

        {/* MAPA ELIMINADO DE LA HOME PARA DAR PROTAGONISMO A LA AGENDA */}

        <AgendaSection />

      </main>

      <Footer />
    </>
  );
}