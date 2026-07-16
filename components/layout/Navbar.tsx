// components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import OriginalLogo from "@/components/ui/OriginalLogo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
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

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? "bg-black/90 backdrop-blur-md border-matrix/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
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
              className="w-32 sm:w-36 md:w-40 lg:w-44 h-auto transition-all duration-300 
                group-hover:drop-shadow-[0_0_10px_rgba(247,147,26,0.6)] 
                hover:scale-[1.02] active:scale-[0.98]"
            />
          </Link>

          {/* Desktop Navigation — Espaciado optimizado */}
          <div className="hidden xl:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-mono text-xs lg:text-sm text-gray-300 hover:text-matrix 
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
          <div className="hidden xl:block">
            <Link
              href="/agenda"
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-matrix/40 
                bg-matrix/10 text-matrix font-mono text-xs font-bold 
                hover:bg-matrix hover:text-black hover:shadow-[0_0_20px_rgba(0,255,65,0.6)]
                transition-all duration-200 rounded-sm tracking-wider uppercase"
            >
              <span>❯</span>
              <span>AGENDAR</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden text-matrix hover:text-matrix/80 focus:outline-none z-50 
              p-2 rounded-sm border border-matrix/30 hover:border-matrix/60 
              hover:bg-matrix/10 transition-all"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-xl z-40 
          flex flex-col items-center justify-center space-y-6 xl:hidden">
          
          {/* Logo en mobile */}
          <Link 
            href="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="mb-8"
          >
            <OriginalLogo 
              variant="standard"
              className="w-40 sm:w-48 h-auto" 
            />
          </Link>
          
          {/* Links de navegación mobile */}
          <nav className="flex flex-col items-center space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl sm:text-2xl font-serif text-white hover:text-bitcoin 
                  hover:drop-shadow-[0_0_10px_rgba(247,147,26,0.5)]
                  transition-all duration-200 tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* CTA Mobile */}
          <Link
            href="/agenda"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-8 px-8 py-3 bg-bitcoin text-black font-bold font-mono 
              rounded-sm hover:bg-bitcoin/90 hover:shadow-[0_0_25px_rgba(247,147,26,0.6)]
              transition-all duration-200 tracking-wider uppercase text-sm"
          >
            Agendar Cita
          </Link>
        </div>
      )}
    </nav>
  );
}