"use client";

import { TIER_CONFIG, type Tier } from "@/lib/proveedores";
import { Crown, Handshake, User } from "lucide-react";

interface TierBadgeProps {
  tier: Tier;
  className?: string;
}

const TIER_ICONS = {
  patrocinador: Crown,
  partner: Handshake,
  miembro: User,
};

export default function TierBadge({ tier, className = "" }: TierBadgeProps) {
  const config = TIER_CONFIG[tier];
  const Icon = TIER_ICONS[tier];

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${config.bgColor} ${config.color} ${config.borderColor} ${className}`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </div>
  );
}
