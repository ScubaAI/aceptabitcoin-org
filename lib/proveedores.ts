// ============================================================
// PROVEEDORES — Types, Utilities & Data Loader
// Acepta Bitcoin México | Oracle System v2.0
// 
// 📌 REBRAND NOTE (2026-05-12):
// - Internamente se mantiene "proveedores" por estabilidad de rutas e imports.
// - La capa UI muestra "Comercio Libre" según requerimiento del cliente.
// - Nuevas categorías añadidas: "Restaurantes", "Consultoría"
// ============================================================

export type Categoria = 
  | "exchange"
  | "logistica"
  | "educacion"
  | "comercio"
  | "servicios"
  | "tecnologia"
  | "restaurantes" // ✅ Normalizado a minúsculas
  | "consultoria" // ✅ Normalizado a minúsculas y sin tilde
  | "finanzas"
  | "bienestar"
  | "seguridad";

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
  //  Nuevas categorías para "Comercio Libre" (Values normalizados)
  { value: "restaurantes", label: "Restaurantes", icon: "Utensils" },
  { value: "consultoria", label: "Consultoría", icon: "UserCog" },
  { value: "finanzas", label: "Finanzas", icon: "Landmark" },
  { value: "bienestar", label: "Bienestar", icon: "Heart" },
  { value: "seguridad", label: "Seguridad", icon: "Shield" },
];

export const TIER_CONFIG: Record<Tier, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  patrocinador: {
    label: "Patrocinador",
    color: "text-bitcoin",
    bgColor: "bg-bitcoin/10",
    borderColor: "border-bitcoin/30",
  },
  partner: {
    label: "Partner",
    color: "text-matrix",
    bgColor: "bg-matrix/10",
    borderColor: "border-matrix/30",
  },
  miembro: {
    label: "Miembro",
    color: "text-gray-300",
    bgColor: "bg-white/5",
    borderColor: "border-white/10",
  },
};

export function filterByCategory(proveedores: Proveedor[], categoria: Categoria | "todos"): Proveedor[] {
  if (categoria === "todos") return proveedores;
  return proveedores.filter((proveedor) => proveedor.categoria === categoria);
}

export interface ProveedorStats {
  total: number;
  patrocinadores: number;
  partners: number;
  miembros: number;
  categorias: number;
}

export function getStats(proveedores: Proveedor[]): ProveedorStats {
  return {
    total: proveedores.length,
    patrocinadores: proveedores.filter((p) => p.tier === "patrocinador").length,
    partners: proveedores.filter((p) => p.tier === "partner").length,
    miembros: proveedores.filter((p) => p.tier === "miembro").length,
    categorias: new Set(proveedores.map((p) => p.categoria)).size,
  };
}