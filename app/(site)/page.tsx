import Hero from "@/components/layout/Hero";
import PriceConverter from "@/components/sections/PriceConverter";
import TipJarSection from "@/components/sections/TipJarSection";
import BtcMapSection from "@/components/sections/BtcMapSection";
import { AgendaSection } from "@/components/sections/AgendaSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Store, LayoutGrid, Gamepad2 } from "lucide-react";
import ArcadeButton from "@/components/ui/arcade-button"; // Importamos nuestro botón nuevo

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
                <h2 className="font-space text-4xl font-bold tracking-tight sm:text-5xl">
                  Bitcoin es el dinero <br />
                  <span className="text-secondary">de la libertad.</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  No importa si el precio sube o baja, la red sigue confirmando bloques cada 10 minutos. 
                  Usa nuestra calculadora para ver el valor actual en pesos mexicanos.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="h-0.5 w-12 bg-secondary/50" />
                  <span className="text-sm font-medium italic text-muted-foreground">Satoshi Nakamoto</span>
                </div>
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

              <h2 className="font-space text-5xl md:text-7xl font-bold tracking-tight mb-6">
                Aprende Bitcoin <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">
                  jugando.
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
                Olvida la teoría aburrida. Entra a la plataforma de <strong>Visionary AI</strong>: 
                laboratorios interactivos, simuladores de IA y retos de criptografía.
              </p>
              
              {/* AQUÍ ESTÁ EL CAMBIO: Usamos nuestro ArcadeButton en vez del Embed */}
              <ArcadeButton href="https://bitcoin.visionaryai.lat">
                INICIAR MISION
              </ArcadeButton>

              <p className="mt-6 text-sm text-gray-600 font-vt323">
                // SE REQUIERE CONEXIÓN A LA RED //
              </p>
            </div>
          </div>
        </section>

        {/* --- Mercados e Impacto (Crea tu tienda + Tianguis) --- */}
        <section className="py-24 bg-background">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Card 1: Crea tu Tienda */}
              <div className="group relative rounded-[2rem] border border-border bg-card p-10 overflow-hidden transition-all hover:border-bitcoin/50">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-bitcoin/5 blur-3xl transition-all group-hover:bg-bitcoin/10" />
                <Store className="h-12 w-12 text-bitcoin mb-6" />
                <h3 className="font-space text-3xl font-bold mb-4">Crea tu tienda en minutos</h3>
                <p className="text-muted-foreground mb-8">
                  Te proporcionamos infraestructura soberana: BTCPay Server + LNbits + Point of Sale listo para usar.
                </p>
                <Button asChild variant="secondary" className="rounded-full font-bold">
                  <Link href="/crea-tu-tienda">Solicitar Alta de Negocio</Link>
                </Button>
              </div>

              {/* Card 2: Tianguis Bitcoin */}
              <div className="group relative rounded-[2rem] border border-border bg-card p-10 overflow-hidden transition-all hover:border-secondary/50">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary/5 blur-3xl transition-all group-hover:bg-secondary/10" />
                <LayoutGrid className="h-12 w-12 text-secondary mb-6" />
                <h3 className="font-space text-3xl font-bold mb-4">Tianguis Bitcoin Mérida</h3>
                <p className="text-muted-foreground mb-8">
                  El primer marketplace descentralizado impulsado por Nostr y Lightning. Compra y vende sin intermediarios.
                </p>
                <Button asChild variant="outline" className="rounded-full font-bold border-secondary/50 text-secondary hover:bg-secondary/10">
                  <Link href="/tianguis">Explorar el Tianguis</Link>
                </Button>
              </div>

            </div>
          </div>
        </section>

        <TipJarSection />

        <BtcMapSection />

        <AgendaSection />

      </main>

      <Footer />
    </>
  );
}