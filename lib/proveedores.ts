"use client";

// ============================================================
// PROVEEDORES — Types, Utilities & Data Loader
// Acepta Bitcoin México | Oracle System v2.0
// ============================================================

export type Categoria = 
  | "exchange"
  | "logistica"
  | "educacion"
  | "comercio"
  | "servicios"
  | "tecnologia";

export type Tier = "patrocinador" | "partner" | "miembro";

export interface Proveedor {
  id: string;
  nombre: string;
  categoria: Categoria;
  tier: Tier;
  descripcion: string;
  url: string;
  urlReferido?: string;
  logo: string;
  ubicacion: string;
  tags: string[];
  destacado: boolean;
}

export const CATEGORIAS: { value: Categoria; label: string; icon: string }[] = [
  { value: "exchange", label: "Exchanges", icon: "ArrowLeftRight" },
  { value: "logistica", label: "Logística", icon: "Truck" },
  { value: "educacion", label: "Educación", icon: "GraduationCap" },
  { value: "comercio", label: "Comercio", icon: "Store" },
  { value: "servicios", label: "Servicios", icon: "Briefcase" },
  { value: "tecnologia", label: "Tecnología", icon: "Cpu" },
];

export const TIER_CONFIG: Record<Tier, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
  priority: number;
}> = {
  patrocinador: {
    label: "Patrocinador",
    color: "text-bitcoin",
    bgColor: "bg-bitcoin/10",
    borderColor: "border-bitcoin/30",
    glowColor: "shadow-[0_0_20px_rgba(247,147,26,0.15)]",
    priority: 1,
  },
  partner: {
    label: "Partner",
    color: "text-matrix",
    bgColor: "bg-matrix/10",
    borderColor: "border-matrix/30",
    glowColor: "shadow-[0_0_20px_rgba(0,255,65,0.1)]",
    priority: 2,
  },
  miembro: {
    label: "Miembro",
    color: "text-gray-400",
    bgColor: "bg-white/5",
    borderColor: "border-white/10",
    glowColor: "",
    priority: 3,
  },
};

// ── Filter by category ──
export function filterByCategory(proveedores: Proveedor[], categoria: Categoria | "todos"): Proveedor[] {
  if (categoria === "todos") return proveedores;
  return proveedores.filter((p) => p.categoria === categoria);
}

// ── Get stats ──
export function getStats(proveedores: Proveedor[]) {
  return {
    total: proveedores.length,
    patrocinadores: proveedores.filter((p) => p.tier === "patrocinador").length,
    partners: proveedores.filter((p) => p.tier === "partner").length,
    miembros: proveedores.filter((p) => p.tier === "miembro").length,
    categorias: new Set(proveedores.map((p) => p.categoria)).size,
  };
}
