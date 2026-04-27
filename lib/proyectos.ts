"use client";

// ============================================================
// PROYECTOS — Types, Utilities & Data Loader
// Acepta Bitcoin México | Oracle System v2.0
// ============================================================

export type TipoProyecto = "interno" | "comunidad";
export type EstadoProyecto = "active" | "development" | "abandoned";
export type HackathonLugar = "winner" | "second" | "third" | null;

export interface Proyecto {
  id: string;
  nombre: string;
  tipo: TipoProyecto;
  descripcion: string;
  descripcionCorta: string;
  url: string | null;
  repoUrl?: string;
  logo: string;
  imagen?: string;
  stack: string[];
  estado: EstadoProyecto;
  hackathon?: {
    evento: string;
    lugar: HackathonLugar;
    año: number;
  };
  equipo?: {
    nombre: string;
    rol: string;
    ubicacion?: string;
  }[];
  features?: string[];
  metricas?: {
    label: string;
    valor: string;
  }[];
  review: {
    fortalezas: string[];
    oportunidades: string[];
    impacto: string;
  };
  fecha: string;
}

export const ESTADO_CONFIG: Record<EstadoProyecto, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  glowColor: string;
}> = {
  active: {
    label: "Activo",
    color: "text-matrix",
    bgColor: "bg-matrix/10",
    borderColor: "border-matrix/30",
    icon: "●",
    glowColor: "shadow-[0_0_20px_rgba(0,255,65,0.15)]",
  },
  development: {
    label: "En Desarrollo",
    color: "text-bitcoin",
    bgColor: "bg-bitcoin/10",
    borderColor: "border-bitcoin/30",
    icon: "◐",
    glowColor: "shadow-[0_0_20px_rgba(247,147,26,0.15)]",
  },
  abandoned: {
    label: "Pausado",
    color: "text-red-400",
    bgColor: "bg-red-500/5",
    borderColor: "border-red-500/20",
    icon: "○",
    glowColor: "",
  },
};

export const HACKATHON_CONFIG: Record<NonNullable<HackathonLugar>, {
  icon: string;
  color: string;
  label: string;
}> = {
  winner: { icon: "🏆", color: "text-yellow-400", label: "GANADOR" },
  second: { icon: "🥈", color: "text-gray-300", label: "2DO LUGAR" },
  third: { icon: "🥉", color: "text-amber-600", label: "3ER LUGAR" },
};

export const TIPO_CONFIG: Record<TipoProyecto, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  interno: {
    label: "Acepta Bitcoin",
    color: "text-bitcoin",
    bgColor: "bg-bitcoin/10",
    borderColor: "border-bitcoin/30",
  },
  comunidad: {
    label: "Comunidad",
    color: "text-matrix",
    bgColor: "bg-matrix/10",
    borderColor: "border-matrix/30",
  },
};

// ── Load and sort projects by date (newest first) ──
export async function loadProyectos(): Promise<Proyecto[]> {
  const response = await fetch("/data/proyectos.json");
  const data: Proyecto[] = await response.json();
  
  // Sort by date descending (newest first)
  return data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
}

// ── Filter by type ──
export function filterByType(proyectos: Proyecto[], tipo: TipoProyecto | "todos"): Proyecto[] {
  if (tipo === "todos") return proyectos;
  return proyectos.filter((p) => p.tipo === tipo);
}

// ── Filter by status ──
export function filterByStatus(proyectos: Proyecto[], estado: EstadoProyecto | "todos"): Proyecto[] {
  if (estado === "todos") return proyectos;
  return proyectos.filter((p) => p.estado === estado);
}

// ── Get stats ──
export function getStats(proyectos: Proyecto[]) {
  return {
    total: proyectos.length,
    internos: proyectos.filter((p) => p.tipo === "interno").length,
    comunidad: proyectos.filter((p) => p.tipo === "comunidad").length,
    activos: proyectos.filter((p) => p.estado === "active").length,
    enDesarrollo: proyectos.filter((p) => p.estado === "development").length,
    pausados: proyectos.filter((p) => p.estado === "abandoned").length,
  };
}
