"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Terminal } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-cyan-500/20 bg-black/90 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between px-4">

        {/* --- Logo: Serif (Bank Style) --- */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-12 w-12 items-center justify-center rounded bg-bitcoin text-black shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-transform group-hover:scale-105 border border-white/10">
            <span className="text-2xl font-bold">₿</span>
            {/* Destello en la esquina */}
            <div className="absolute top-0 right-0 -mt-1 -mr-1 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white font-serif leading-none">
              acepta<span className="text-bitcoin drop-shadow-[0_0_10px_rgba(247,147,26,0.6)]">bitcoin</span>
            </span>
            <span className="text-[10px] text-cyan-500/80 font-mono tracking-[0.2em] uppercase mt-1">
              Financial_Systems
            </span>
          </div>
        </Link>

        {/* --- Desktop Menu: Mono (Tech Style) --- */}
        <div className="hidden md:flex md:items-center md:gap-1">
          <NavLink href="/aprende">/aprende</NavLink>
          <NavLink href="/tianguis">/tianguis</NavLink>
          <NavLink href="/crea-tu-tienda">/crear_tienda</NavLink>
          <NavLink href="/proveedores">/proveedores</NavLink>
          <NavLink href="/proyectos">/proyectos</NavLink>
          <NavLink href="/nuestra-historia">/historia</NavLink>
        </div>

        {/* --- CTA Button: Terminal Style --- */}
        <div className="flex items-center gap-4">
          <Button 
            asChild 
            variant="outline" 
            size="sm"
            className="hidden md:inline-flex border-cyan-500/30 text-cyan-400 hover:bg-cyan-950/20 hover:text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] font-mono text-xs uppercase tracking-widest transition-all duration-300"
          >
            <Link href="/agenda">
              <Terminal className="mr-2 h-3 w-3" />
              Agenda Asesoría
            </Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-white hover:bg-white/5 border border-transparent hover:border-cyan-500/30"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

      </div>

      {/* --- Mobile Menu Dropdown --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-cyan-500/20 bg-black/95 backdrop-blur-xl absolute w-full left-0 top-20 p-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
          <MobileLink href="/aprende" onClick={() => setIsMobileMenuOpen(false)}>/aprende</MobileLink>
          <MobileLink href="/tianguis" onClick={() => setIsMobileMenuOpen(false)}>/tianguis</MobileLink>
          <MobileLink href="/crea-tu-tienda" onClick={() => setIsMobileMenuOpen(false)}>/crear_tienda</MobileLink>
          <MobileLink href="/proveedores" onClick={() => setIsMobileMenuOpen(false)}>/proveedores</MobileLink>
          <MobileLink href="/proyectos" onClick={() => setIsMobileMenuOpen(false)}>/proyectos</MobileLink>
          <MobileLink href="/nuestra-historia" onClick={() => setIsMobileMenuOpen(false)}>/historia</MobileLink>
          <hr className="border-cyan-500/20" />
          <Button asChild className="w-full bg-bitcoin text-black font-bold font-mono hover:bg-orange-500 hover:shadow-[0_0_20px_rgba(247,147,26,0.6)] transition-all">
            <Link href="/agenda">Agenda Asesoría</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}

// Componente auxiliar para Links Desktop (Estilo Tech)
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative px-4 py-2 text-sm font-mono text-gray-400 transition-all hover:text-cyan-400 hover:bg-cyan-950/10 rounded group overflow-hidden"
    >
      <span className="relative z-10">{children}</span>
      {/* Efecto de línea Neon al pasar el mouse */}
      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)] transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

// Componente auxiliar para Links Mobile
function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 text-sm font-mono text-gray-300 hover:text-bitcoin hover:bg-white/5 rounded border border-transparent hover:border-bitcoin/30 transition-all"
    >
      {children}
    </Link>
  );
}