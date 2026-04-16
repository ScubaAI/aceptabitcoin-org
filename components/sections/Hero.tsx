"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen pt-20 flex items-center relative overflow-hidden bg-gradient-to-br from-dark via-dark to-black">
      <div className="absolute inset-0 bg-[radial-gradient(#00C4B4_0.8px,transparent_1px)] bg-[length:20px_20px] opacity-10" />
      
      <div className="max-w-7xl mx-auto px-6 py-20 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm px-4 py-1.5 rounded-full mb-6 border border-white/20">
          <Zap className="w-4 h-4 text-bitcoin" /> Mérida → Todo México
        </div>

        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
          Aquí hay gente real<br />
          <span className="text-turquesa">usando Bitcoin</span> todos los días
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10">
          Educación práctica • Tiendas Bitcoin • Tianguis • Herramientas reales
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#aprende" className="bg-turquesa text-black font-bold text-lg px-8 py-3 rounded-xl hover:bg-turquesa/80 transition inline-flex items-center justify-center gap-2">
            Aprende Bitcoin Ahora <ArrowRight className="ml-2" />
          </Link>
          
          <Link href="/crea-tu-tienda" className="border border-white/20 text-white font-bold text-lg px-8 py-3 rounded-xl hover:bg-white/10 transition inline-flex items-center justify-center">
            Crea tu Tienda Bitcoin
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-8">Desde Mérida, Yucatán • 2026</p>
      </div>
    </section>
  );
}