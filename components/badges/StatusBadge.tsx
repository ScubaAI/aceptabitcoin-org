"use client";

import { ESTADO_CONFIG, type EstadoProyecto } from "@/lib/proyectos";

interface StatusBadgeProps {
  estado: EstadoProyecto;
  className?: string;
  showPulse?: boolean;
}

export default function StatusBadge({ estado, className = "", showPulse = true }: StatusBadgeProps) {
  const config = ESTADO_CONFIG[estado];

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${config.bgColor} ${config.color} ${config.borderColor} ${className}`}
    >
      <span className={showPulse && estado === "active" ? "animate-pulse" : ""}>
        {config.icon}
      </span>
      {config.label}
    </div>
  );
}
