"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen pt-20 flex items-center relative overflow-hidden bg-gradient-to-br from-dark via-dark to-black">
      <div className="absolute inset-0 bg-[radial-gradient(#00C4B4_0.8px,transparent_1px)] bg-[length:20px_20px] opacity-10" />
      
      <div className="max-w-7xl mx-auto px-6 py-20 text-center relative z-10">
        {/* Badge Superior */}
        <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm px-4 py-1.5 rounded-full mb-8 border border-white/20 backdrop-blur-sm">
          <Zap className="w-4 h-4 text-bitcoin" /> Mérida → Todo México
        </div>

        {/* Nuevo Título Principal */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
          Impulsando la Educación<br /> 
          de Bitcoin en México
        </h1>

        {/* Nuevo Subtítulo */}
        <p className="text-2xl md:text-4xl font-bold text-white mb-10">
          Aprende. Ahorra. <span className="text-bitcoin">Acepta Bitcoin.</span>
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          
          {/* Botón Prioritario: Eventos (Luma) */}
          <Link 
            href="https://luma.com/lunesdebitcoinMID?k=c" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-bitcoin text-black font-bold text-lg px-8 py-4 rounded-xl hover:bg-bitcoin/90 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(247,147,26,0.3)] inline-flex items-center justify-center gap-2"
          >
            Eventos <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          
          {/* Botón Secundario: Aprende */}
          <Link 
            href="/aprende" 
            className="border border-white/20 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-white/10 transition inline-flex items-center justify-center"
          >
            Plataforma Educativa
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-12">Desde Mérida, Yucatán • 2026</p>
      </div>
    </section>
  );
}