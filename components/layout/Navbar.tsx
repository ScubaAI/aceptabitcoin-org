"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
// Importa iconos si quieres: import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4">

        {/* --- Logo --- */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-bitcoin text-primary-foreground shadow-lg shadow-bitcoin/20">
            <span className="text-lg font-bold">₿</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            acepta<span className="text-secondary">bitcoin</span>
          </span>
        </Link>

        {/* --- Desktop Menu --- */}
        <div className="hidden md:flex md:items-center md:gap-1">
          <Link
            href="/aprende"
            className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Aprende
          </Link>
          <Link
            href="/tianguis"
            className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Tianguis
          </Link>
          <Link
            href="/crea-tu-tienda"
            className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Crea tu Tienda
          </Link>
          <Link
            href="/proveedores"
            className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Proveedores
          </Link>
          <Link
            href="/mapa"
            className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Mapa
          </Link>
          <Link
            href="/proyectos"
            className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Proyectos
          </Link>
          <Link
            href="/nuestra-historia"
            className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Historia
          </Link>
          <Link href="/agenda" className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-turquesa">
            Agenda Asesoría
          </Link>
        </div>

        {/* --- CTA Button --- */}
        <div className="flex items-center gap-4">
          <Button asChild variant="secondary" size="sm">
            <Link href="/agenda">Agenda Asesoría</Link>
          </Button>

          {/* Placeholder para menú móvil (lo implementamos después si quieres) */}
          {/* <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button> */}
        </div>

      </div>
    </nav>
  );
}