import type { Metadata } from "next";
import { type Proyecto } from "@/lib/proyectos";
import ProyectosClient from "./ProyectosClient";

// Static import of JSON data (no runtime fetch)
import proyectosRaw from '@/data/proyectos.json';

const proyectosList = (proyectosRaw as Proyecto[]).sort(
  (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
);

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return {
    metadataBase: new URL(baseUrl),
    title: 'Proyectos Bitcoin — Ecosistema de Desarrollo',
    description: 'Software sovereign construido por y para la comunidad Bitcoin de México. Proyectos internos de Acepta Bitcoin y proyectos de la comunidad con stack técnico, estado y reviews.',
    openGraph: {
      title: 'Proyectos Bitcoin — Ecosistema de Desarrollo',
      description: 'Descubre los proyectos Bitcoin construidos en México. BOB Hotel, Pizza Sats, Cosmética Satoshi y más.',
      images: [{ url: '/og/proyectos.svg', width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Proyectos Bitcoin México',
      description: 'Ecosistema de desarrollo sovereign. Código abierto, sin permiso, sin límites.',
      images: ['/og/proyectos.svg'],
    },
  };
}

export default function ProyectosPage() {
  return <ProyectosClient proyectos={proyectosList} />;
}