"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Store, Zap, ShieldCheck, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function CreaTuTienda() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success("¡Solicitud recibida! Te contactaremos por WhatsApp en menos de 24 horas.", {
        description: "Un asesor de Acepta Bitcoin revisará tu mensaje.",
      });
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const benefits = [
    {
      icon: Zap,
      title: "Pagos Instantáneos",
      desc: "Recibe pagos en segundos a través de Lightning Network con comisiones casi nulas.",
      color: "text-secondary"
    },
    {
      icon: ShieldCheck,
      title: "Soberanía Total",
      desc: "Tus llaves, tus bitcoins. Sin intermediarios bancarios ni congelamiento de fondos.",
      color: "text-bitcoin"
    },
    {
      icon: Globe,
      title: "Instancia Pro",
      desc: "Configuramos BTCPay Server + LNbits en servidores de alta disponibilidad (Voltage).",
      color: "text-secondary"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-32 pb-24 overflow-hidden bg-background">
        
        {/* Background Glows */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-bitcoin/5 blur-[120px] -z-10 rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/5 blur-[120px] -z-10 rounded-full" />

        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column: Info & Benefits */}
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bitcoin/10 text-bitcoin text-xs font-bold uppercase tracking-wider border border-bitcoin/20">
                  <Store className="h-3 w-3" />
                  Business Onboarding
                </div>
                <h1 className="font-space text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
                  Digitaliza tu negocio con <span className="text-bitcoin">Bitcoin</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Únete a la economía circular de Mérida. Te ayudamos a implementar la mejor 
                  infraestructura de pagos del mundo en minutos.
                </p>
              </div>

              <div className="grid gap-8">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm transition-all hover:border-border/80 group">
                    <div className={`mt-1 h-12 w-12 shrink-0 rounded-xl bg-background border border-border flex items-center justify-center transition-colors group-hover:border-foreground/20`}>
                      <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 rounded-3xl bg-secondary/10 border border-secondary/20 border-dashed">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-secondary" />
                  <span className="font-bold text-secondary uppercase tracking-widest text-xs">Sin Costos Ocultos</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Nuestra meta es la adopción. No cobramos comisiones por tus ventas. 
                  Solo pagas el costo de mantenimiento del servidor si decides escalar.
                </p>
              </div>
            </div>

            {/* Right Column: Form */}
            <Card className="relative p-8 md:p-12 border-border bg-card shadow-2xl overflow-hidden group">
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-bitcoin/5 blur-3xl rounded-full" />
              
              <div className="relative z-10 space-y-8">
                <div className="text-center lg:text-left mb-8">
                  <h2 className="font-space text-3xl font-bold">Solicitud de Alta</h2>
                  <p className="text-muted-foreground mt-2">Completa el formulario y un asesor te contactará.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="text-xs font-bold uppercase tracking-wider">Negocio *</Label>
                      <Input id="nombre" placeholder="Nombre comercial" className="h-12 bg-background/50 border-border focus-visible:ring-bitcoin" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tipo" className="text-xs font-bold uppercase tracking-wider">Giro *</Label>
                      <Input id="tipo" placeholder="Restaurante, Hotel..." className="h-12 bg-background/50 border-border focus-visible:ring-bitcoin" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp" className="text-xs font-bold uppercase tracking-wider">WhatsApp Contacto *</Label>
                    <Input id="whatsapp" placeholder="+52 ..." className="h-12 bg-background/50 border-border focus-visible:ring-bitcoin" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider">Email (Opcional)</Label>
                    <Input id="email" type="email" placeholder="hola@negocio.com" className="h-12 bg-background/50 border-border focus-visible:ring-bitcoin" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje" className="text-xs font-bold uppercase tracking-wider">¿Qué necesitas?</Label>
                    <Textarea 
                      id="mensaje" 
                      rows={4} 
                      placeholder="Quiero un POS físico, integrar en mi sitio web, capacitación para mis empleados..." 
                      className="bg-background/50 border-border focus-visible:ring-secondary min-h-[120px]" 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-14 text-md font-bold bg-bitcoin text-primary-foreground hover:bg-bitcoin/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Zap className="h-4 w-4 animate-bounce" /> Procesando solicitud...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Enviar Solicitud <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>

                  <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
                    Seguridad Blindada por la red Bitcoin
                  </p>
                </form>
              </div>
            </Card>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}