"use client";

import { CATEGORIAS, type Categoria } from "@/lib/proveedores";
import { ArrowLeftRight, Truck, GraduationCap, Store, Briefcase, Cpu, LayoutGrid } from "lucide-react";

interface CategoryFilterProps {
  active: Categoria | "todos";
  onChange: (categoria: Categoria | "todos") => void;
  counts: Record<string, number>;
}

const ICONS: Record<string, React.ElementType> = {
  ArrowLeftRight,
  Truck,
  GraduationCap,
  Store,
  Briefcase,
  Cpu,
  LayoutGrid,
};

export default function CategoryFilter({ active, onChange, counts }: CategoryFilterProps) {
  const allCount = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-wrap gap-2">
      {/* "Todos" pill */}
      <button
        onClick={() => onChange("todos")}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider border transition-all duration-300 ${
          active === "todos"
            ? "bg-bitcoin text-black border-bitcoin shadow-[0_0_15px_rgba(247,147,26,0.3)]"
            : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
        }`}
      >
        <LayoutGrid className="h-3.5 w-3.5" />
        Todos
        <span className={`ml-1 px-1.5 py-0.5 rounded text-[9px] ${active === "todos" ? "bg-black/20" : "bg-white/10"}`}>
          {allCount}
        </span>
      </button>

      {CATEGORIAS.map((cat) => {
        const Icon = ICONS[cat.icon] || LayoutGrid;
        const isActive = active === cat.value;
        const count = counts[cat.value] || 0;

        return (
          <button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider border transition-all duration-300 ${
              isActive
                ? "bg-matrix text-black border-matrix shadow-[0_0_15px_rgba(0,255,65,0.3)]"
                : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {cat.label}
            <span className={`ml-1 px-1.5 py-0.5 rounded text-[9px] ${isActive ? "bg-black/20" : "bg-white/10"}`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
