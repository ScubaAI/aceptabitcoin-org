"use client";

import { motion } from "framer-motion";
import { ExternalLink, ShieldCheck, Zap, Globe, Server, Lock } from "lucide-react";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface PartnerCardProps {
  partner: {
    id: string;
    name: string;
    url: string;
    tagline: string;
    description: string;
    icon: string;
    protocol?: string;
    requiresKYC: boolean; // Transparencia radical: ¿Requiere identificación?
    status?: 'online' | 'maintenance' | 'offline';
  };
}

// Mapeo seguro de strings a componentes de Lucide
const getIcon = (iconName: string): LucideIcon => {
  const Icon = Icons[iconName as keyof typeof Icons] as LucideIcon;
  return Icon || Icons.Bitcoin;
};

export function PartnerCard({ partner }: PartnerCardProps) {
  const IconComponent = getIcon(partner.icon);
  
  // Determinar color de estado según DS v2.0
  const getStatusColor = () => {
    switch (partner.status) {
      case 'online': return 'text-matrix shadow-[0_0_8px_rgba(0,255,65,0.6)]';
      case 'maintenance': return 'text-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]';
      case 'offline': return 'text-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]';
      default: return 'text-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto perspective-1000"
    >
      <div 
        className="relative group bg-black border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-bitcoin/50"
        style={{ boxShadow: `0 0 0 1px rgba(0,0,0,0), 0 10px 30px -10px rgba(0,0,0,0.8)` }}
      >
        
        {/* Glow Effect on Hover (Bitcoin Orange) */}
        <div className="absolute inset-0 bg-bitcoin/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Decorative Grid Background (Matrix Style) */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,255,65,0.08)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />

        {/* Top Border Accent (Technical Line) */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-matrix to-transparent opacity-50" />

        <div className="relative z-10 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
          
          {/* Icon Container: "Hardware Module" Aesthetic */}
          <div className="relative shrink-0">
            <div className="absolute -inset-1 bg-matrix/20 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-black border border-matrix/30 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,255,65,0.1)] group-hover:border-matrix/60 transition-colors">
              <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-matrix drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]" />
            </div>
            {/* Status Dot */}
            <div className={`absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full flex items-center justify-center border border-black`}>
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${getStatusColor()}`} />
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  {partner.name}
                </h3>
                <ShieldCheck className="w-4 h-4 text-bitcoin" aria-label="Verified Node" />
              </div>
              <p className="font-mono text-xs text-matrix uppercase tracking-widest">
                {partner.tagline}
              </p>
            </div>

            <p className="font-mono text-sm text-gray-400 leading-relaxed border-l-2 border-white/10 pl-4">
              {partner.description}
            </p>

            {/* CTA Button: Arcade Style Mini */}
            <a
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 mt-2 text-xs font-vt323 text-lg uppercase tracking-wider text-black bg-bitcoin rounded-lg hover:bg-[#ffaa3b] hover:shadow-[0_0_15px_rgba(247,147,26,0.4)] active:translate-y-0.5 transition-all duration-100 group/btn"
            >
              <Zap className="w-4 h-4 fill-current" />
              Acceder al Nodo
              <ExternalLink className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Footer Technical Data */}
        <div className="bg-black/50 border-t border-white/5 px-6 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">
            Protocol: {partner.protocol || "Bitcoin"}
          </span>
          
          <div className="flex items-center gap-3">
            {/* KYC Transparency Badge */}
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${
              partner.requiresKYC 
                ? "bg-orange-500/10 border-orange-500/40 text-orange-400" 
                : "bg-matrix/10 border-matrix/40 text-matrix"
            }`}>
              {partner.requiresKYC ? (
                <>
                  <ShieldCheck className="w-3 h-3" />
                  <span>KYC Req.</span>
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3" />
                  <span>No KYC</span>
                </>
              )}
            </span>
            
            <span className={`font-mono text-[10px] uppercase tracking-widest ${
              partner.status === 'online' ? 'text-matrix/80' : 
              partner.status === 'maintenance' ? 'text-yellow-400/80' : 'text-red-500/80'
            }`}>
              Status: {(partner.status || "UNKNOWN").toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}