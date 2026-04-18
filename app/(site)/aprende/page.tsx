import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BitcoinAgentEmbed from "@/components/embeds/BitcoinAgentEmbed";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Beaker, Bot, Zap, ArrowUpRight, GraduationCap } from "lucide-react";

export default function AprendePage() {
  const features = [
    {
      icon: Beaker,
      title: "Labs Interactivos",
      desc: "Práctica real: Seed phrases, Merkle Trees, Minería y Firmas Digitales explicadas paso a paso.",
      color: "text-bitcoin"
    },
    {
      icon: Bot,
      title: "Chat con B.O.B.",
      desc: "Tu mentor personal de Inteligencia Artificial que no duerme, especializado en Bitcoin (Español).",
      color: "text-secondary"
    },
    {
      icon: Zap,
      title: "Sats Reales",
      desc: "Experimenta la red Lightning Network enviando y recibiendo pagos reales mientras avanzas.",
      color: "text-bitcoin"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-32 pb-24 overflow-hidden bg-background">
        
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-bitcoin/5 blur-[150px] -z-10 rounded-full" />

        <div className="container px-4 mx-auto relative z-10">
          
          {/* Header Section */}
          <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider border border-secondary/20">
              <GraduationCap className="h-3 w-3" />
              Sovereign Academy
            </div>
            <h1 className="font-space text-5xl md:text-7xl font-bold tracking-tight">
              Aprende sin <span className="text-bitcoin">Límites.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Bienvenido al laboratorio de Acepta Bitcoin. No leas sobre el futuro, 
              constrúyelo tú mismo con nuestras herramientas interactivas.
            </p>
          </div>

          {/* Main Embed Unit */}
          <div className="relative group mb-20">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-bitcoin to-secondary rounded-[3rem] blur opacity-20 group-hover:opacity-30 transition duration-1000" />
            <div className="relative rounded-[3rem] overflow-hidden border border-border bg-card shadow-inner">
               <BitcoinAgentEmbed />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feat, i) => (
              <Card key={i} className="group p-8 border-border bg-card/50 backdrop-blur-xl transition-all hover:border-secondary/30 hover:-translate-y-1">
                <div className="mb-6 h-12 w-12 rounded-xl bg-background border border-border flex items-center justify-center group-hover:bg-secondary/10 group-hover:border-secondary/20 transition-all">
                  <feat.icon className={`h-6 w-6 ${feat.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3 font-space flex items-center gap-2">
                  {feat.title}
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feat.desc}
                </p>
              </Card>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="mt-20 p-10 rounded-[2.5rem] border border-border bg-secondary/5 text-center space-y-6">
            <h2 className="text-2xl font-bold font-space">¿Listo para profundizar?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Si ya completaste los laboratorios básicos, entra a nuestra plataforma completa 
              para certificarte como usuario soberano.
            </p>
            <Button asChild size="lg" className="rounded-full bg-secondary hover:bg-secondary/90 font-bold px-10">
              <a href="https://bitcoinbot-five.vercel.app/es" target="_blank" rel="noopener noreferrer">
                Plataforma de Academia Completa
              </a>
            </Button>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}