"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-dark/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-bitcoin rounded-full flex items-center justify-center text-black font-bold text-xl">
            ₿
          </div>
          <span className="text-2xl font-bold tracking-tight">acepta<span className="text-turquesa">bitcoin</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/aprende" className="hover:text-turquesa transition">Aprende</Link>
          <Link href="/tianguis" className="hover:text-turquesa transition">Tianguis</Link>
          <Link href="/crea-tu-tienda" className="hover:text-turquesa transition">Crea tu Tienda</Link>
          <Link href="/mapa" className="hover:text-turquesa transition">Mapa</Link>
          <Link href="/proyectos" className="hover:text-turquesa transition">Proyectos</Link>
          <Link href="/nuestra-historia" className="hover:text-turquesa transition">Nuestra Historia</Link>
        </div>

        <Link href="/#agenda" className="bg-turquesa text-black px-4 py-2 rounded-lg font-medium hover:bg-turquesa/80 transition">
          Agenda Asesoría
        </Link>
      </div>
    </nav>
  );
}