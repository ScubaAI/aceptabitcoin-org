"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
// IMPORTAMOS EL NUEVO LOGO
import MatrixLogo from "@/components/ui/Logo"; 

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
    { name: "Aprende", href: "/aprende" },
    { name: "Tianguis", href: "/tianguis" },
    { name: "Proyectos", href: "/proyectos" },
    { name: "Proveedores", href: "/proveedores" },
    { name: "Historia", href: "/nuestra-historia" },
    { name: "Crea tu Tienda", href: "/crea-tu-tienda" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-matrix/30 shadow-lg" : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO: Componente Matrix + Texto */}
          <Link href="/" className="flex items-center gap-3 group z-50">
            {/* Usamos el componente creado arriba */}
            <MatrixLogo />
            
            {/* Texto del Marca */}
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl md:text-2xl text-white tracking-tight leading-none">
                Acepta <span className="text-bitcoin">Bitcoin</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-mono text-gray-300 hover:text-matrix hover:shadow-[0_0_10px_rgba(0,255,65,0.4)] transition-all duration-200 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-matrix transition-all group-hover:w-full"></span>
              </Link>
            ))}
            
            {/* Botón de Acción */}
            <Link
              href="/agenda"
              className="px-4 py-2 border border-matrix/30 bg-matrix/10 text-matrix font-mono text-xs hover:bg-matrix hover:text-black transition-all duration-200 rounded-sm"
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
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 md:hidden border-t border-matrix/20">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-serif text-white hover:text-bitcoin transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/agenda"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-8 px-8 py-3 bg-bitcoin text-black font-bold font-mono rounded hover:bg-white transition-colors"
          >
            AGENDAR CITA
          </Link>
        </div>
      )}
    </nav>
  );
}