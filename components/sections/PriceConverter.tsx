"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Coins, DollarSign, Bitcoin, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PriceConverter() {
  // Estados para BTC/USD
  const [btcUsd, setBtcUsd] = useState<number>(1);
  const [usd, setUsd] = useState<number>(0);

  // Estados para BTC/MXN
  const [btcMxn, setBtcMxn] = useState<number>(1);
  const [mxn, setMxn] = useState<number>(0);

  // Estados para SATS/MXN
  const [sats, setSats] = useState<number>(1000);
  const [satsMxn, setSatsMxn] = useState<number>(0);

  const [prices, setPrices] = useState<{ mxn: number; usd: number }>({ mxn: 0, usd: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=mxn,usd"
        );
        const data = await res.json();
        setPrices({
          mxn: data.bitcoin.mxn,
          usd: data.bitcoin.usd,
        });
        
        // Calcular valores iniciales
        setUsd(btcUsd * data.bitcoin.usd);
        setMxn(btcMxn * data.bitcoin.mxn);
        setSatsMxn((sats / 100000000) * data.bitcoin.mxn);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prices");
        setPrices({ mxn: 1287500, usd: 65000 });
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, [btcUsd, btcMxn, sats]);

  // --- Handlers ---
  const handleBtcUsdChange = (value: number) => {
    setBtcUsd(value);
    if (prices.usd) setUsd(value * prices.usd);
  };
  const handleUsdChange = (value: number) => {
    setUsd(value);
    if (prices.usd) setBtcUsd(value / prices.usd);
  };
  const handleBtcMxnChange = (value: number) => {
    setBtcMxn(value);
    if (prices.mxn) setMxn(value * prices.mxn);
  };
  const handleMxnChange = (value: number) => {
    setMxn(value);
    if (prices.mxn) setBtcMxn(value / prices.mxn);
  };
  const handleSatsChange = (value: number) => {
    setSats(value);
    if (prices.mxn) setSatsMxn((value / 100000000) * prices.mxn);
  };
  const handleSatsMxnChange = (value: number) => {
    setSatsMxn(value);
    if (prices.mxn) setSats((value / prices.mxn) * 100000000);
  };

  return (
    <Card className="relative overflow-hidden border-matrix/20 bg-black/40 p-6 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      {/* Fondo: Rejilla Cypherpunk */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded border border-matrix/30 bg-matrix/10 text-matrix shadow-[0_0_15px_rgba(0,255,65,0.2)]">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold tracking-tight text-white">
                Mercado Global
              </h3>
              <p className="font-mono text-[10px] text-matrix/80 uppercase tracking-widest mt-1">
                Oracle System // v2.0
              </p>
            </div>
          </div>
          {!loading && (
            <div className="hidden md:flex items-center gap-3 bg-white/5 px-4 py-2 rounded border border-white/5">
              <div className="text-right">
                <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Precio Referencia</div>
                <div className="font-mono text-sm font-bold text-matrix drop-shadow-[0_0_5px_rgba(0,255,65,0.8)]">
                  ${prices.usd.toLocaleString("en-US")} <span className="text-gray-500 text-xs">USD</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          
          {/* ROW 1: BTC / USD (Estilo Tech) */}
          <div className="grid grid-cols-[1fr,auto,1fr] gap-3 items-center p-4 rounded-lg bg-black/30 border border-white/5 hover:border-matrix/20 transition-colors">
            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase text-gray-500 tracking-wider">Bitcoin (BTC)</label>
              <Input
                type="number"
                step="0.00000001"
                value={btcUsd}
                onChange={(e) => handleBtcUsdChange(parseFloat(e.target.value) || 0)}
                className="h-12 border-white/10 bg-transparent text-matrix font-mono text-lg font-bold focus-visible:ring-matrix/50 focus:border-matrix/50 px-3"
              />
            </div>
            <div className="text-gray-600"><Bitcoin className="h-4 w-4" /></div>
            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase text-gray-500 tracking-wider">Dólares (USD)</label>
              <Input
                type="text"
                inputMode="decimal"
                value={usd === 0 ? "" : usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                onChange={(e) => handleUsdChange(parseFloat(e.target.value.replace(/,/g, "")) || 0)}
                className="h-12 border-white/10 bg-transparent text-white font-mono text-lg font-bold focus-visible:ring-white/20 px-3"
              />
            </div>
          </div>

          {/* ROW 2: BTC / MXN (Estilo Bitcoin) */}
          <div className="grid grid-cols-[1fr,auto,1fr] gap-3 items-center p-4 rounded-lg bg-black/30 border border-bitcoin/10 hover:border-bitcoin/40 transition-colors relative overflow-hidden">
            {/* Glow decorativo */}
            <div className="absolute inset-0 bg-bitcoin/5 blur-xl pointer-events-none" />
            
            <div className="space-y-1 relative z-10">
              <label className="font-mono text-[10px] uppercase text-bitcoin tracking-wider">Bitcoin (BTC)</label>
              <Input
                type="number"
                step="0.00000001"
                value={btcMxn}
                onChange={(e) => handleBtcMxnChange(parseFloat(e.target.value) || 0)}
                className="h-12 border-bitcoin/30 bg-transparent text-bitcoin font-mono text-lg font-bold focus-visible:ring-bitcoin/50 px-3"
              />
            </div>
            <div className="text-gray-600 relative z-10"><Bitcoin className="h-4 w-4" /></div>
            <div className="space-y-1 relative z-10">
              <label className="font-mono text-[10px] uppercase text-orange-400 tracking-wider">Pesos (MXN)</label>
              <Input
                type="text"
                inputMode="decimal"
                value={mxn === 0 ? "" : mxn.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                onChange={(e) => handleMxnChange(parseFloat(e.target.value.replace(/,/g, "")) || 0)}
                className="h-12 border-bitcoin/30 bg-transparent text-white font-mono text-lg font-bold focus-visible:ring-bitcoin/50 px-3"
              />
            </div>
          </div>

          {/* ROW 3: SATS / MXN (Estilo Special) */}
          <div className="grid grid-cols-[1fr,auto,1fr] gap-3 items-center p-4 rounded-lg bg-gradient-to-r from-matrix/5 to-bitcoin/5 border border-white/5 hover:border-white/20 transition-all group">
            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase text-matrix tracking-wider flex items-center gap-1">
                <Coins className="h-3 w-3" /> Satoshis (SATS)
              </label>
              <Input
                type="number"
                step="1"
                value={sats}
                onChange={(e) => handleSatsChange(parseFloat(e.target.value) || 0)}
                className="h-12 border-matrix/20 bg-transparent text-matrix font-mono text-lg font-bold focus-visible:ring-matrix/50 px-3 group-hover:shadow-[0_0_15px_rgba(0,255,65,0.1)] transition-shadow"
              />
            </div>
            <div className="text-gray-500"><Bitcoin className="h-4 w-4" /></div>
            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase text-orange-400 tracking-wider">Pesos (MXN)</label>
              <Input
                type="text"
                inputMode="decimal"
                value={satsMxn === 0 ? "" : satsMxn.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                onChange={(e) => handleSatsMxnChange(parseFloat(e.target.value.replace(/,/g, "")) || 0)}
                className="h-12 border-orange-500/20 bg-transparent text-white font-mono text-lg font-bold focus-visible:ring-orange-500/50 px-3"
              />
            </div>
          </div>

        </div>

        {/* Footer de Estado */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-matrix animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.8)]"></div>
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Live Feed // Coingecko API</span>
          </div>
          <span className="font-serif text-[10px] text-gray-600 italic">
            System Operational
          </span>
        </div>
      </div>
    </Card>
  );
}