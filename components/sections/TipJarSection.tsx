"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function TipJarSection() {
  // Dirección de ejemplo o estado real del wallet
  const [amount, setAmount] = useState("1000");
  
  // Dirección Lightning (Debería venir de una API o ENV, aquí pongo un ejemplo)
  const lightningAddress = "tu-wallet@blink.sv";

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Fondo: Rejilla Cypherpunk + Glow Naranja */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(247,147,26,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-bitcoin/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-bitcoin/20 bg-black/60 backdrop-blur-xl p-8 md:p-12 shadow-2xl overflow-hidden">
            {/* Efecto de línea escaneo (Scanline) */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-bitcoin to-transparent opacity-50 animate-scanline pointer-events-none" />

            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              {/* Lado Izquierdo: Texto y Mensaje */}
              <div className="space-y-6 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-bitcoin/10 border border-bitcoin/30 px-3 py-1 rounded-full text-bitcoin text-xs font-bold uppercase tracking-widest font-mono">
                  <Zap className="h-3 w-3" /> Soporta el Proyecto
                </div>

                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
                  Impulsando la Educación <br />
                  <span className="text-bitcoin drop-shadow-[0_0_15px_rgba(247,147,26,0.6)]">
                    de Bitcoin en México
                  </span>
                </h2>

                <p className="font-mono text-sm md:text-base text-gray-300 leading-relaxed">
                  Si crees en este proyecto, ayúdanos a crecer. <br />
                  Tu contribución permite mantener la infraestructura y crear nuevos contenidos educativos de forma gratuita.
                </p>

                {/* Input de monto (Opcional, visual) */}
                <div className="pt-4">
                  <label className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mb-2 block">Monto sugerido (SATS)</label>
                  <div className="flex gap-2">
                    {["100", "1000", "10000"].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setAmount(amt)}
                        className={`flex-1 py-2 text-xs font-mono border rounded transition-all ${
                          amount === amt 
                            ? "bg-bitcoin text-black border-bitcoin" 
                            : "border-white/10 text-gray-400 hover:border-white/30"
                        }`}
                      >
                        {amt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lado Derecho: QR y Acción */}
              <div className="flex flex-col items-center justify-center space-y-6">
                
                {/* Contenedor del QR */}
                <div className="relative p-4 bg-white rounded-lg border-2 border-bitcoin/20 shadow-[0_0_30px_rgba(247,147,26,0.2)]">
                  <div className="w-48 h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                    <QRCodeSVG 
                      value={`lightning:${lightningAddress}?amount=${amount}`} 
                      size={180}
                      level="L"
                      includeMargin={false}
                      className="w-full h-full"
                    />
                  </div>
                  {/* Badge de "Scan Me" */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-black border border-bitcoin text-bitcoin px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap">
                    Scan to Pay
                  </div>
                </div>

                <div className="text-center">
                  <p className="font-mono text-xs text-gray-500 mb-2 uppercase">Infraestructura</p>
                  <div className="flex items-center justify-center gap-2 text-cyan-400 font-bold font-mono text-sm border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 rounded">
                    <Zap className="h-3 w-3" /> Powered by Blink.sv
                  </div>
                </div>

                <Button asChild className="w-full bg-bitcoin hover:bg-bitcoin/90 text-black font-bold font-serif rounded group transition-all">
                  <a href={`https://blink.sv/send?to=${lightningAddress}`} target="_blank" rel="noopener noreferrer">
                    Donar Aquí <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>

              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}