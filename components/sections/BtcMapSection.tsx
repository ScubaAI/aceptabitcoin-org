"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MoveRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Map = dynamic(() => import("./BtcMapComponent"), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-card animate-pulse rounded-3xl" />
});

export default function BtcMapSection() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] -z-10 rounded-full" />
      
      <div className="container relative z-10 px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bitcoin/10 text-bitcoin text-xs font-bold uppercase tracking-wider mb-4 border border-bitcoin/20">
              <MapPin className="h-3 w-3" />
              Directorio en Vivo
            </div>
            <h2 className="font-space text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              ¿Dónde se acepta <span className="text-bitcoin">Bitcoin</span> en México?
            </h2>
            <p className="text-lg text-muted-foreground">
              Datos actualizados en tiempo real a través de la API de <strong>BTC Map</strong>. 
              Encuentra cafeterías, hoteles y servicios que ya aceptan pagos soberanos.
            </p>
          </div>
          
          <Button asChild variant="outline" className="rounded-full border-border bg-card/50 hover:bg-accent group">
            <a href="https://btcmap.org" target="_blank" rel="noopener noreferrer">
              Ver mapa global <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>

        <div className="relative group">
          {/* Border Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-bitcoin/20 via-secondary/20 to-bitcoin/20 rounded-[2.2rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative h-[650px] rounded-[2rem] overflow-hidden border border-border bg-card shadow-2xl">
            <Map />
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <p className="text-muted-foreground">
            ¿Tu negocio ya acepta Bitcoin y no aparece? 
          </p>
          <Button asChild variant="secondary" className="rounded-full font-bold">
            <Link href="/crea-tu-tienda">Agregar mi Negocio</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}