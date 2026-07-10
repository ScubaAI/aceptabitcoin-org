// components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
// Importamos el logo original
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
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${
        isScrolled 
          ? "bg-black/80 backdrop-blur-md border-matrix/30 shadow-lg" 
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO ORIGINAL: Sin texto duplicado */}
          <Link 
            href="/" 
            className="flex items-center group z-50"
          >
            <OriginalLogo 
              className="w-40 md:w-48 lg:w-56 h-auto transition-all duration-300 
                group-hover:drop-shadow-[0_0_8px_rgba(124,179,66,0.5)] 
                hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-mono text-gray-300 hover:text-matrix 
                  hover:shadow-[0_0_10px_rgba(0,255,65,0.4)] 
                  transition-all duration-200 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-matrix 
                  transition-all group-hover:w-full"></span>
              </Link>
            ))}
            
            {/* Botón de Acción */}
            <Link
              href="/agenda"
              className="px-4 py-2 border border-matrix/30 bg-matrix/10 text-matrix 
                font-mono text-xs hover:bg-matrix hover:text-black 
                transition-all duration-200 rounded-sm"
            >
              <span className="mr-2">❯</span>AGENDAR
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-matrix focus:outline-none z-50"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 
          flex flex-col items-center justify-center space-y-8 md:hidden 
          border-t border-matrix/20">
          
          {/* Logo en mobile (más pequeño) */}
          <Link 
            href="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="mb-4"
          >
            <OriginalLogo className="w-48 h-auto" />
          </Link>
          
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-serif text-white hover:text-bitcoin 
                transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <Link
            href="/agenda"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-8 px-8 py-3 bg-bitcoin text-black font-bold font-mono 
              rounded hover:bg-white transition-colors"
          >
            AGENDAR CITA
          </Link>
        </div>
      )}
    </nav>
  );
}