import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, Share2, Shield, ShoppingBag, Terminal, MessageSquare, ArrowRight } from "lucide-react";

export default function TianguisPage() {
  const steps = [
    {
      icon: Terminal,
      title: "Identidad Nostr",
      desc: "Usa tu llave pública (NPUB) para identificarte sin necesidad de correos o teléfonos."
    },
    {
      icon: MessageSquare,
      title: "NIP-99 Classifieds",
      desc: "Publicaciones resistentes a la censura enviadas directamente a relays de la red Nostr."
    },
    {
      icon: Zap,
      title: "Liquidación LN",
      desc: "Pagos directos P2P a través de Lightning Network. Cero intermediarios, cero esperas."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-32 pb-24 overflow-hidden bg-background">
        
        {/* Nostr-Specific Glows (Purple/Teal) */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[130px] -z-10 rounded-full" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-secondary/10 blur-[130px] -z-10 rounded-full" />

        <div className="container px-4 mx-auto">
          
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider border border-purple-500/20 mb-6">
              <Share2 className="h-3 w-3" />
              Powered by Nostr Protocol
            </div>
            <h1 className="font-space text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Tianguis <span className="text-secondary">Bitcoin</span> Mérida
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              El primer marketplace descentralizado de México. Comercio Soberano, 
              Censorship-Resistant y nativo de Lightning Network.
            </p>
          </div>

          {/* Main Visual / Mockup */}
          <div className="relative group max-w-6xl mx-auto mb-24">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-secondary rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-card rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/5">
              <Image 
                src="/tianguis_marketplace_mockup_1776530257992.png" 
                alt="Tianguis Bitcoin Marketplace Visual" 
                width={1600} 
                height={900}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
                <div>
                  <h3 className="text-2xl font-bold font-space text-white">Versión 2.0 (Próximamente)</h3>
                  <p className="text-white/60 text-sm">Explora productos reales en la red de Nostr.</p>
                </div>
                <Button className="rounded-full bg-white text-black hover:bg-white/90 font-bold px-8 h-12">
                  Suscribirse al Lanzamiento <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {steps.map((step, i) => (
              <Card key={i} className="p-8 border-border bg-card/40 backdrop-blur-xl relative overflow-hidden group hover:border-purple-500/30 transition-all">
                <div className="absolute -right-4 -top-4 text-purple-500/5 group-hover:text-purple-500/10 transition-colors">
                  <step.icon size={120} />
                </div>
                <step.icon className="h-10 w-10 text-secondary mb-6" />
                <h3 className="text-xl font-bold mb-3 font-space">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
                  {step.desc}
                </p>
              </Card>
            ))}
          </div>

          {/* Call to Action Section */}
          <div className="rounded-[3rem] bg-gradient-to-br from-card to-background border border-border p-12 lg:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-6">
                <h2 className="font-space text-4xl font-bold">Únete a la Revolución del Comercio</h2>
                <p className="text-lg text-muted-foreground">
                  Estamos construyendo un futuro donde el comercio es libre de intermediarios bancarios 
                  y silos tecnológicos. Bitcoin + Nostr es la única combinación verdaderamente global.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" className="rounded-full h-12 px-8 font-bold border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-400">
                    Guía Técnica Completa
                  </Button>
                  <Button className="rounded-full h-12 px-8 font-bold bg-secondary hover:bg-secondary/90">
                    Empezar a Vender <ShoppingBag className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-background/50 border border-border">
                  <Shield className="h-6 w-6 text-purple-400 mb-4" />
                  <span className="block font-bold text-lg">P2P Real</span>
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Sin Custodia</span>
                </div>
                <div className="p-6 rounded-2xl bg-background/50 border border-border">
                  <ShoppingBag className="h-6 w-6 text-secondary mb-4" />
                  <span className="block font-bold text-lg">Global</span>
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Nativo Digital</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}