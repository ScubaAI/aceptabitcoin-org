"use client";

import { useState, useEffect, useRef } from "react";
import { X, HelpCircle, Terminal, AlertTriangle, Bitcoin, PiggyBank } from "lucide-react";

type DcaStatusType = "favorable" | "neutral" | "menos-favorable";

interface MarketMoodInfoPopoverProps {
  currentStatus?: DcaStatusType;
}

export default function MarketMoodInfoPopover({ currentStatus }: MarketMoodInfoPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // ← FIX: Guard de hidratación
  const [hasSeen, setHasSeen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // ← FIX: Solo leer localStorage después del montaje en el cliente
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = sessionStorage.getItem("ab-mx:dca-info-seen"); // ← FIX: sessionStorage para "esta sesión"
      if (stored === "true") setHasSeen(true);
    } catch (e) {
      console.warn("Storage access denied", e);
      setHasSeen(true); // Fallback seguro si el usuario bloquea cookies
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handleEsc);
    dialogRef.current?.focus();
    // Bloquear scroll del body cuando el modal está abierto
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    if (dontShowAgain) {
      try { 
        sessionStorage.setItem("ab-mx:dca-info-seen", "true"); 
      } catch (e) {
        console.warn("Storage access denied", e);
      }
      setHasSeen(true);
    }
    setIsOpen(false);
  };

  // ← FIX: No renderizar nada hasta que sepamos si está montado (evita parpadeo/mismatch)
  if (!isMounted || hasSeen) return null;

  const getCardStyles = (type: DcaStatusType) => {
    const isActive = currentStatus === type;
    const baseStyles = "flex gap-3 p-3 rounded-lg transition-all duration-300";
    if (type === "favorable") return `${baseStyles} ${isActive ? "bg-matrix/10 border-2 border-matrix shadow-[0_0_15px_rgba(0,255,65,0.2)]" : "bg-matrix/5 border border-matrix/20 opacity-60"}`;
    if (type === "neutral") return `${baseStyles} ${isActive ? "bg-bitcoin/10 border-2 border-bitcoin shadow-[0_0_15px_rgba(247,147,26,0.3)]" : "bg-bitcoin/5 border border-bitcoin/20 opacity-60"}`;
    return `${baseStyles} ${isActive ? "bg-red-500/10 border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]" : "bg-red-500/5 border border-red-500/20 opacity-60"}`;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-1.5 text-matrix hover:text-bitcoin transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-matrix/50 rounded-lg"
        aria-label="¿Qué es DCA y cómo usar este indicador?"
        title="Guía educativa DCA"
      >
        <HelpCircle size={18} />
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md p-4" 
          onClick={handleClose}
        >
          <div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dca-guide-title"
            className="relative w-full max-w-2xl bg-black/95 backdrop-blur-xl border border-matrix/40 rounded-xl shadow-[0_0_60px_rgba(0,255,65,0.2)] overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-matrix to-transparent animate-scanline" />
            <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-matrix/40" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-matrix/40" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-matrix/40" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-matrix/40" />

            <div className="p-5 border-b border-matrix/20 flex items-center justify-between bg-black/60 shrink-0">
              <div className="flex items-center gap-3">
                <Terminal className="text-matrix" size={20} />
                <span id="dca-guide-title" className="font-vt323 text-2xl text-matrix tracking-wider">GUÍA DCA • ORACLE.EDU</span>
              </div>
              <button onClick={handleClose} className="text-gray-400 hover:text-bitcoin transition-colors" aria-label="Cerrar guía">
                <X size={22} />
              </button>
            </div>

            <div className="p-6 space-y-6 font-mono text-sm text-gray-300 leading-relaxed overflow-y-auto custom-scrollbar">
              <div className="space-y-3">
                <h3 className="font-vt323 text-xl text-bitcoin flex items-center gap-2">
                  <PiggyBank className="text-bitcoin" size={18} />&gt; ¿QUÉ ES DCA?
                </h3>
                <p className="text-gray-400">
                  <strong className="text-white">DCA</strong> (Dollar Cost Averaging) es acumular Bitcoin en cantidades fijas, sin importar el precio.
                </p>
                <div className="bg-white/5 border border-matrix/20 rounded-lg p-4 space-y-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Ejemplo práctico:</p>
                  <ul className="text-xs space-y-1 text-gray-300">
                    <li>• Compras $100 USD de BTC cada lunes</li>
                    <li>• Si el precio baja → recibes <span className="text-matrix font-bold">más sats</span></li>
                    <li>• Si el precio sube → recibes <span className="text-bitcoin font-bold">menos sats</span></li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-vt323 text-xl text-bitcoin flex items-center gap-2">
                  <Bitcoin className="text-bitcoin" size={18} />&gt; CÓMO LEER TU CALIDAD DCA
                </h3>
                <p className="text-gray-400 text-xs mb-2">
                  {currentStatus && <span className="text-white">⚡ Tu estado actual está resaltado abajo.</span>}
                </p>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className={getCardStyles("favorable")}>
                    <div className="text-2xl shrink-0" role="img" aria-label="Favorable">😊</div>
                    <div>
                      <strong className="text-matrix block">FAVORABLE PARA DCA <span className="text-xs font-normal text-gray-400">(≤ 25)</span></strong>
                      <p className="text-xs mt-1">Zona de acumulación. Tu compra rinde <span className="text-matrix font-bold">más sats</span>.</p>
                    </div>
                  </div>

                  <div className={getCardStyles("neutral")}>
                    <div className="text-2xl shrink-0" role="img" aria-label="Neutral">😐</div>
                    <div>
                      <strong className="text-bitcoin block">NEUTRAL <span className="text-xs font-normal text-gray-400">(26 - 79)</span></strong>
                      <p className="text-xs mt-1">Mercado en rango. <span className="text-white font-bold">Sigue tu plan sin estrés.</span></p>
                    </div>
                  </div>

                  <div className={getCardStyles("menos-favorable")}>
                    <div className="text-2xl shrink-0" role="img" aria-label="Menos favorable">😔</div>
                    <div>
                      <strong className="text-red-400 block">MENOS FAVORABLE <span className="text-xs font-normal text-gray-400">(≥ 80)</span></strong>
                      <p className="text-xs mt-1">Zona alta. Rinde <span className="text-red-400 font-bold">menos sats</span>, pero lo importante es no dejar de acumular.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-l-2 border-matrix/30 pl-4">
                <h3 className="font-vt323 text-lg text-matrix flex items-center gap-2">
                  <AlertTriangle size={16} /> ¿POR QUÉ SOLO 4 HORAS?
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">Usamos el timeframe de <strong className="text-matrix">4 horas</strong> porque filtra el ruido de movimientos cortos y da una señal estable para aprender.</p>
              </div>

              <div className="bg-black/40 border border-bitcoin/30 rounded-lg p-4 space-y-2">
                <h4 className="font-vt323 text-base text-bitcoin flex items-center gap-2">
                  RECORDATORIO CLAVE
                </h4>
                <p className="text-xs text-gray-300">
                  <span className="text-bitcoin font-bold">El DCA funciona a largo plazo.</span> Esta herramienta no es una señal para cambiar tu estrategia.
                </p>
              </div>

              <div className="text-[10px] text-gray-600 border-t border-white/10 pt-3">
                <p className="flex items-start gap-2">
                  <AlertTriangle size={12} className="shrink-0 mt-0.5" />
                  <span>Herramienta exclusivamente educativa. No constituye consejo financiero.</span>
                </p>
              </div>
            </div>

            <div className="p-5 border-t border-matrix/20 bg-black/60 flex flex-col sm:flex-row gap-4 items-center justify-between shrink-0">
              <label className="flex items-center gap-2 text-xs text-gray-500 hover:text-matrix cursor-pointer transition-colors select-none">
                <input 
                  type="checkbox" 
                  checked={dontShowAgain} 
                  onChange={(e) => setDontShowAgain(e.target.checked)} 
                  className="accent-matrix w-4 h-4 bg-transparent border border-matrix/50 rounded-sm cursor-pointer" 
                />
                No mostrar de nuevo en esta sesión
              </label>
              <button 
                onClick={handleClose} 
                className="px-6 py-2.5 border border-bitcoin text-bitcoin font-mono text-xs font-bold hover:bg-bitcoin hover:text-black transition-all rounded-sm flex items-center gap-2"
              >
                ENTENDIDO <span className="text-lg leading-none">❯</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}