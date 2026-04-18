import { Hero } from "@/components/layout/Hero";
import PriceConverter from "@/components/sections/PriceConverter";
import BitcoinAgentEmbed from "@/components/embeds/BitcoinAgentEmbed";
import TipJarSection from "@/components/sections/TipJarSection";
import BtcMapSection from "@/components/sections/BtcMapSection";
import { AgendaSection } from "@/components/sections/AgendaSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Store, LayoutGrid } from "lucide-react";

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

        {/* --- Bitcoin Agent / Aprende Section --- */}
        <section id="aprende" className="py-24 bg-background relative overflow-hidden">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-96 w-96 bg-bitcoin/5 blur-[120px] rounded-full" />
          
          <div className="container relative z-10 px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-space text-4xl font-bold tracking-tight sm:text-6xl mb-6">
                Aprende Bitcoin <span className="text-bitcoin">jugando.</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Olvida la teoría aburrida. Nuestra plataforma interactiva con IA te guía a través de 
                laboratorios reales: desde crear tu primera wallet hasta entender la criptografía.
              </p>
            </div>
            
            <div className="rounded-[2.5rem] overflow-hidden border border-border bg-card/50 backdrop-blur-sm shadow-2xl shadow-bitcoin/5">
              <BitcoinAgentEmbed />
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild size="lg" className="rounded-full bg-bitcoin hover:bg-bitcoin/90 font-bold px-8">
                <a href="https://bitcoinbot-five.vercel.app/es" target="_blank" rel="noopener noreferrer">
                  Entrar a la Academia Completa <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
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