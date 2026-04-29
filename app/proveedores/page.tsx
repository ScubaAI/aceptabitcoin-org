import type { Metadata } from "next";
import { type Proveedor } from "@/lib/proveedores";
import ProveedoresClient from "./ProveedoresClient";

// Static import of JSON data (no runtime fetch)
import proveedoresRaw from '@/data/proveedores.json';

const proveedoresList = [...proveedoresRaw as Proveedor[]].sort((a, b) => {
  const tierOrder = { patrocinador: 0, partner: 1, miembro: 2 };
  const diff = tierOrder[a.tier] - tierOrder[b.tier];
  if (diff !== 0) return diff;
  return a.nombre.localeCompare(b.nombre);
});

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return {
    metadataBase: new URL(baseUrl),
    title: 'Directorio de Proveedores Bitcoin — Acepta Bitcoin México',
    description: 'Negocios y servicios en México comprometidos con la adopción de Bitcoin. Exchanges, logística, educación, comercio, servicios y tecnología. Busca por categoría y contacto directo.',
    openGraph: {
      title: 'Directorio de Proveedores Bitcoin',
      description: 'Encuentra exchanges, comercios, servicios educativos y tecnología Bitcoin en México. Directorio sovereign sin intermediarios.',
      images: [{ url: '/og/proveedores.svg', width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Directorio Bitcoin México',
      description: 'Negocios que aceptan Bitcoin y servicios sovereign. Sin permiso, sin censura.',
      images: ['/og/proveedores.svg'],
    },
  };
}

export default function ProveedoresPage() {
  return <ProveedoresClient proveedores={proveedoresList} />;
}