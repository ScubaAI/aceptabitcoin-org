"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import OriginalLogo from "@/components/ui/OriginalLogo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "🎮 Arcade", href: "/arcade" },
    { name: "Tianguis", href: "/tianguis" },
    { name: "Proyectos", href: "/proyectos" },
    { name: "Comercio Libre", href: "/proveedores" },
    { name: "Historia", href: "/nuestra-historia" },
    { name: "Crea tu Tienda", href: "/crea-tu-tienda" },
  ];

  if (!isMounted) {
    return (
      <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-sm border-b border-white/5 h-20" />
    );
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? "bg-black/95 backdrop-blur-md border-matrix/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
          : "bg-black/60 backdrop-blur-sm border-white/5"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO — Tamaño optimizado */}
          <Link 
            href="/" 
            className="flex-shrink-0 flex items-center group z-50"
          >
            <OriginalLogo 
              variant="standard"
              className="w-28 sm:w-32 md:w-36 lg:w-40 h-auto transition-all duration-300 
                group-hover:drop-shadow-[0_0_10px_rgba(247,147,26,0.6)] 
                hover:scale-[1.02] active:scale-[0.98]"
            />
          </Link>

          {/* Desktop Navigation — Visible en lg (1024px) y superior */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-mono text-xs xl:text-sm text-gray-300 hover:text-matrix 
                  hover:shadow-[0_0_15px_rgba(0,255,65,0.5)] 
                  transition-all duration-200 relative group tracking-wide"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-matrix 
                  transition-all duration-300 group-hover:w-full 
                  shadow-[0_0_10px_rgba(0,255,65,0.8)]"></span>
              </Link>
            ))}
          </div>
          
          {/* Botón de Acción — Separado visualmente */}
          <div className="hidden lg:block">
            <Link
              href="/agenda"
              className="inline-flex items-center gap-2 px-4 py-2 xl:px-5 xl:py-2.5 border-2 border-matrix/40 
                bg-matrix/10 text-matrix font-mono text-xs font-bold 
                hover:bg-matrix hover:text-black hover:shadow-[0_0_20px_rgba(0,255,65,0.6)]
                transition-all duration-200 rounded-sm tracking-wider uppercase"
            >
              <span>❯</span>
              <span>AGENDAR</span>
            </Link>
          </div>

          {/* Mobile Menu Button — Visible solo en < lg (1024px) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-matrix hover:text-matrix/80 focus:outline-none z-50 
              p-2 rounded-sm border border-matrix/30 hover:border-matrix/60 
              hover:bg-matrix/10 transition-all duration-200"
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay — Full screen con mejor espaciado */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-xl z-40 
          flex flex-col items-center justify-center xl:hidden">
          
          {/* Efecto Matrix Rain sutil de fondo */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-px h-full bg-matrix/30 animate-pulse" />
            <div className="absolute top-0 right-1/3 w-px h-full bg-matrix/20 animate-pulse delay-700" />
            <div className="absolute top-0 left-2/3 w-px h-full bg-matrix/20 animate-pulse delay-500" />
          </div>
          
          {/* Logo en mobile */}
          <Link 
            href="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="relative z-10 mb-12"
          >
            <OriginalLogo 
              variant="standard"
              className="w-44 sm:w-52 h-auto drop-shadow-[0_0_15px_rgba(247,147,26,0.4)]" 
            />
          </Link>
          
          {/* Línea divisoria estilo terminal */}
          <div className="relative z-10 w-64 h-px bg-gradient-to-r from-transparent via-matrix/50 to-transparent mb-8" />
          
          {/* Links de navegación mobile — Mejor espaciados */}
          <nav className="relative z-10 flex flex-col items-center space-y-5 sm:space-y-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-white hover:text-bitcoin 
                  hover:drop-shadow-[0_0_15px_rgba(247,147,26,0.6)]
                  transition-all duration-300 tracking-wide
                  transform hover:scale-105 active:scale-95
                  border-b border-transparent hover:border-bitcoin/30
                  pb-1"
                style={{
                  transitionDelay: `${index * 50}ms`
                }}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Línea divisoria */}
          <div className="relative z-10 w-64 h-px bg-gradient-to-r from-transparent via-matrix/50 to-transparent my-8" />
          
          {/* CTA Mobile — Más prominente */}
          <Link
            href="/agenda"
            onClick={() => setIsMobileMenuOpen(false)}
            className="relative z-10 mt-4 px-10 py-4 bg-bitcoin text-black font-bold font-mono 
              rounded-sm hover:bg-bitcoin/90 hover:shadow-[0_0_30px_rgba(247,147,26,0.6)]
              transition-all duration-300 tracking-wider uppercase text-base
              transform hover:scale-105 active:scale-95
              border-2 border-bitcoin/50"
          >
            <span className="flex items-center gap-2">
              <span>❯</span>
              <span>Agendar Cita</span>
            </span>
          </Link>
          
          {/* Badge de estado */}
          <div className="relative z-10 mt-8 flex items-center gap-2 text-xs font-mono text-matrix/60">
            <span className="w-2 h-2 bg-matrix rounded-full animate-pulse" />
            <span>SYSTEM ONLINE</span>
          </div>
        </div>
      )}
    </nav>
  );
}