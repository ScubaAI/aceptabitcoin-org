"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Heart, ExternalLink, Zap } from "lucide-react";
import { useState } from "react";
import { QRCodeCanvas as QRCode } from "qrcode.react";

export default function TipJarSection() {
  const [copied, setCopied] = useState(false);

  const lightningAddress = "sitioweb@967f1caad8.d.voltageapp.io";

  const copyAddress = () => {
    navigator.clipboard.writeText(lightningAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="tipjar" className="relative py-24 overflow-hidden bg-background">
      {/* Background radial glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-bitcoin/50 to-transparent" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-bitcoin/10 text-bitcoin mb-6 shadow-glow border border-bitcoin/20">
                <Heart className="h-8 w-8 fill-bitcoin" />
              </div>
              
              <h2 className="font-space text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
                Apoya la <span className="text-bitcoin">Educación</span> Bitcoin
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                Cada satoshi enviado ayuda a mantener gratuita nuestra infraestructura educativa, 
                los laboratorios de Bitcoin Agent y la organización del Tianguis Bitcoin.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row lg:justify-start justify-center">
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-bold">
                  <Zap className="h-4 w-4 fill-secondary" />
                  Lightning Network
                </div>
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-bitcoin/10 border border-bitcoin/20 text-bitcoin text-sm font-bold">
                  Circular Economy
                </div>
              </div>
            </div>

            {/* Donation Card */}
            <Card className="relative overflow-hidden border-border bg-card/50 p-8 backdrop-blur-xl shadow-2xl">
              <div className="flex flex-col items-center">
                {/* QR Code Container */}
                <div className="relative mb-8 group">
                  <div className="absolute -inset-4 rounded-3xl bg-bitcoin/10 blur-xl transition-all group-hover:bg-bitcoin/20" />
                  <div className="relative rounded-2xl bg-white p-4 shadow-inner">
                    <QRCode 
                      value={`lightning:${lightningAddress}`} 
                      size={240} 
                      fgColor="#000000"
                      bgColor="#ffffff"
                      level="H"
                    />
                  </div>
                </div>

                {/* Lightning Address Display */}
                <div className="w-full space-y-4">
                  <div className="relative">
                    <div className="flex h-14 w-full items-center justify-between rounded-xl border border-border bg-background/50 px-4 font-mono text-xs sm:text-sm">
                      <span className="truncate text-muted-foreground mr-2">{lightningAddress}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={copyAddress}
                        className="h-8 w-8 shrink-0 hover:bg-bitcoin/10 hover:text-bitcoin"
                      >
                        <Copy className={copied ? "text-green-500 h-4 w-4" : "h-4 w-4"} />
                      </Button>
                    </div>
                  </div>

                  <Button 
                    asChild
                    className="w-full h-12 bg-bitcoin text-primary-foreground font-bold hover:bg-bitcoin/90"
                  >
                    <a 
                      href={`https://www.lnurlpay.com/?lightning=${lightningAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Pagar con Wallet Externa <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
}