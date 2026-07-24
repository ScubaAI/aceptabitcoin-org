// ============================================================
// PROYECTOS — Types, Utilities & Data Loader
// Acepta Bitcoin México | Oracle System v3.0
// ============================================================

// ── Core Types ──
// Nota: "interno" fue eliminado del dominio público para mantener la limpieza del ecosistema.
export type TipoProyecto = "comunidad"; 
export type EstadoProyecto = "active" | "development" | "abandoned";
export type HackathonLugar = "winner" | "second" | "third" | "participant";
export type DificultadProyecto = "facil" | "intermedio" | "avanzado" | "variable" | "progresivo";

export interface TeamMember {
  nombre: string;
  rol: string;
  ubicacion: string;
}

export interface HackathonInfo {
  evento: string;
  lugar: HackathonLugar;
  año: number;
}

export interface ReviewInfo {
  fortalezas: string[];
  oportunidades: string[];
  impacto: string;
}

export interface Metrica {
  label: string;
  valor: string;
}

export interface NotasProyecto {
  nivel: string;
  estetica: string;
  publico_objetivo?: string;
  diferenciador?: string;
  herramienta?: string;
  valor?: string;
  portabilidad?: string;
  estado_contenido?: string;
  modelo?: string;
  adaptacion?: string;
  stack_alignment?: string;
  estado_hosting?: string;
}

export interface Proyecto {
  id: string;
  nombre: string;
  tipo: TipoProyecto;
  descripcion: string;
  descripcionCorta: string;
  url: string | null;
  repoUrl: string | null;
  logo: string;
  imagen: string;
  stack: string[];
  estado: EstadoProyecto;
  categoria?: string;
  dificultad?: DificultadProyecto;
  duracion?: string;
  premio?: string;
  hackathon?: HackathonInfo | null;
  equipo?: TeamMember[];
  features?: string[];
  metricas?: Metrica[];
  review?: ReviewInfo;
  notas?: NotasProyecto;
  destacado?: boolean;
  orden?: number;
  fecha: string; // ISO 8601 string
}

// ── Estado Config (Semáforo Visual V3) ──
// Regla V3: No usar inline shadow-[...]. Los glows se aplican en el componente vía shadow-matrix/shadow-bitcoin.
export const ESTADO_CONFIG: Record<EstadoProyecto, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string; // Símbolo de estado terminal (permitido en pills de estado)
}> = {
  active: {
    label: "Activo",
    color: "text-matrix",
    bgColor: "bg-matrix/10",
    borderColor: "border-matrix/30",
    icon: "●",
  },
  development: {
    label: "En Desarrollo",
    color: "text-bitcoin",
    bgColor: "bg-bitcoin/10",
    borderColor: "border-bitcoin/30",
    icon: "◐",
  },
  abandoned: {
    label: "Pausado",
    color: "text-red-500", // V3 Rule: red-500 reserved for warnings/paused states
    bgColor: "bg-red-500/5",
    borderColor: "border-red-500/20",
    icon: "○",
  },
};

// ── Hackathon Config (Badges) ──
// Regla V3: No emojis como decoración. El componente renderiza iconos Lucide semánticos.
export const HACKATHON_CONFIG: Record<HackathonLugar, {
  color: string;
  label: string;
}> = {
  winner: { color: "text-bitcoin", label: "1ER LUGAR" },
  second: { color: "text-gray-300", label: "2DO LUGAR" },
  third: { color: "text-amber-600", label: "3ER LUGAR" },
  participant: { color: "text-matrix", label: "PARTICIPANTE" },
};

// ── Tipo Config (Badge de origen) ──
export const TIPO_CONFIG: Record<TipoProyecto, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  comunidad: {
    label: "Comunidad",
    color: "text-matrix",
    bgColor: "bg-matrix/10",
    borderColor: "border-matrix/30",
  },
};

// ── Filter by status ──
export function filterByStatus(proyectos: Proyecto[], estado: EstadoProyecto | "todos"): Proyecto[] {
  if (estado === "todos") return proyectos;
  return proyectos.filter((p) => p.estado === estado);
}

// ── Filter by destacado ──
export function filterDestacados(proyectos: Proyecto[]): Proyecto[] {
  return proyectos.filter((p) => p.destacado === true);
}

// ── Sort by orden + fecha ──
export function sortProyectos(proyectos: Proyecto[]): Proyecto[] {
  return [...proyectos].sort((a, b) => {
    // 1. Prioridad por orden explícito (menor número = más prioritario)
    const ordenA = a.orden ?? 999;
    const ordenB = b.orden ?? 999;
    if (ordenA !== ordenB) return ordenA - ordenB;
    
    // 2. Fallback: fecha más reciente primero
    return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
  });
}

// ── Get stats (V3: internos removidos del conteo público) ──
export function getStats(proyectos: Proyecto[]) {
  return {
    total: proyectos.length,
    comunidad: proyectos.length, // Todos los visibles son de la comunidad
    activos: proyectos.filter((p) => p.estado === "active").length,
    enDesarrollo: proyectos.filter((p) => p.estado === "development").length,
    pausados: proyectos.filter((p) => p.estado === "abandoned").length,
    destacados: proyectos.filter((p) => p.destacado === true).length,
  };
}

// ── Data Loader (Server Component compatible) ──
// Regla V3: Content vs Code. Los datos viven en data/, la lógica de filtrado público vive aquí.
export async function getProyectos(): Promise<Proyecto[]> {
  const proyectosModule = await import("@/data/proyectos.json");
  const proyectos = proyectosModule.default as Proyecto[];
  
  // Sanitización de dominio: garantizar que ningún proyecto "interno" se filtre a la vista pública
  // aunque el JSON aún lo contenga por legacy.
  return proyectos.filter((p) => p.tipo === "comunidad");
}