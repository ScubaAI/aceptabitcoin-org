"use client";

import { Zap, Users, LayoutGrid } from "lucide-react";
import { type TipoProyecto } from "@/lib/proyectos";

interface TypeFilterProps {
  active: TipoProyecto | "todos";
  onChange: (tipo: TipoProyecto | "todos") => void;
  counts: {
    todos: number;
    interno: number;
    comunidad: number;
  };
}

export default function TypeFilter({ active, onChange, counts }: TypeFilterProps) {
  const filters = [
    {
      value: "todos" as const,
      label: "Todos",
      icon: LayoutGrid,
      color: "bitcoin",
      count: counts.todos,
    },
    {
      value: "interno" as const,
      label: "Acepta Bitcoin",
      icon: Zap,
      color: "bitcoin",
      count: counts.interno,
    },
    {
      value: "comunidad" as const,
      label: "Comunidad",
      icon: Users,
      color: "matrix",
      count: counts.comunidad,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = active === filter.value;
        const isBitcoin = filter.color === "bitcoin";

        return (
          <button
            key={filter.value}
            onClick={() => onChange(filter.value)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border transition-all duration-300 ${
              isActive
                ? isBitcoin
                  ? "bg-bitcoin text-black border-bitcoin shadow-[0_0_20px_rgba(247,147,26,0.3)]"
                  : "bg-matrix text-black border-matrix shadow-[0_0_20px_rgba(0,255,65,0.3)]"
                : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {filter.label}
            <span className={`ml-1 px-1.5 py-0.5 rounded text-[9px] ${isActive ? "bg-black/20" : "bg-white/10"}`}>
              {filter.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
