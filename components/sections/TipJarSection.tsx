"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Heart, ExternalLink } from "lucide-react";
import { useState } from "react";
import { QRCodeCanvas as QRCode } from "qrcode.react";

export default function TipJarSection() {
  const [copied, setCopied] = useState(false);

  const nodeUrl = "https://967f1caad8.d.voltageapp.io";
  const lightningAddress = "sitioweb@967f1caad8.d.voltageapp.io";
  const readKey = "745ddc33f6534a029ee29b99ee7cbe4b";

  const copyAddress = () => {
    navigator.clipboard.writeText(lightningAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="tipjar" className="py-20 bg-gradient-to-b from-zinc-950 to-black">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <Heart className="w-20 h-20 text-turquesa mx-auto mb-6" />
        
        <h2 className="text-4xl font-bold mb-3">Apoya la Educación Bitcoin</h2>
        <p className="text-gray-400 mb-10 max-w-md mx-auto">
          Cada satoshi ayuda a mantener gratis los cursos, el Tianguis y la plataforma Bitcoin Agent
        </p>

        <Card className="p-10 bg-black border-turquesa/40">
          <div className="flex justify-center mb-8">
            <div className="bg-white p-5 rounded-2xl shadow-inner">
              <QRCode 
                value={`lightning:${lightningAddress}`} 
                size={280} 
                fgColor="#000000"
                bgColor="#ffffff"
              />
            </div>
          </div>

          <div className="font-mono text-lg break-all bg-zinc-900 p-4 rounded-xl mb-6">
            {lightningAddress}
          </div>

          <Button onClick={copyAddress} size="lg" className="w-full mb-4">
            {copied ? "¡Copiado ✓" : "Copiar Lightning Address"}
            <Copy className="ml-2 w-5 h-5" />
          </Button>

          <a 
            href={`https://www.lnurlpay.com/?lightning=${lightningAddress}`}
            target="_blank"
            className="text-turquesa hover:underline flex items-center justify-center gap-2 text-sm"
          >
            Pagar con cualquier wallet <ExternalLink className="w-4 h-4" />
          </a>
        </Card>

        <p className="text-xs text-gray-600 mt-8">
          Wallet: <span className="font-mono">sitioweb</span> • Voltage Cloud
        </p>
      </div>
    </section>
  );
}