"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Coins, DollarSign, Bitcoin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PriceConverter() {
  // Estados para BTC/USD
  const [btcUsd, setBtcUsd] = useState<number>(1);
  const [usd, setUsd] = useState<number>(0);

  // Estados para BTC/MXN
  const [btcMxn, setBtcMxn] = useState<number>(1);
  const [mxn, setMxn] = useState<number>(0);

  // Estados para SATS/MXN (Asumiremos MXN como la principal para Sats, pero podríamos agregar USD si es necesario)
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
        setSatsMxn((sats / 100000000) * data.bitcoin.mxn); // Sats a BTC * Precio MXN
        
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
  }, [btcUsd, btcMxn, sats]); // Dependencias para recalcular si cambia el precio base

  // --- Handlers BTC/USD ---
  const handleBtcUsdChange = (value: number) => {
    setBtcUsd(value);
    if (prices.usd) setUsd(value * prices.usd);
  };
  const handleUsdChange = (value: number) => {
    setUsd(value);
    if (prices.usd) setBtcUsd(value / prices.usd);
  };

  // --- Handlers BTC/MXN ---
  const handleBtcMxnChange = (value: number) => {
    setBtcMxn(value);
    if (prices.mxn) setMxn(value * prices.mxn);
  };
  const handleMxnChange = (value: number) => {
    setMxn(value);
    if (prices.mxn) setBtcMxn(value / prices.mxn);
  };

  // --- Handlers SATS/MXN ---
  const handleSatsChange = (value: number) => {
    setSats(value);
    if (prices.mxn) setSatsMxn((value / 100000000) * prices.mxn);
  };
  const handleSatsMxnChange = (value: number) => {
    setSatsMxn(value);
    if (prices.mxn) setSats((value / prices.mxn) * 100000000);
  };

  return (
    <Card className="relative overflow-hidden border-border bg-card/80 p-6 backdrop-blur-md shadow-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bitcoin/10 text-bitcoin">
              <Coins className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-space text-xl font-bold tracking-tight text-foreground">
                Conversor Multidivisa
              </h3>
              <p className="text-xs text-muted-foreground">BTC • USD • MXN • SATS</p>
            </div>
          </div>
          {!loading && (
            <div className="text-right hidden md:block">
              <div className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">BTC Global (USD)</div>
              <div className="font-mono text-sm font-bold text-green-500">${prices.usd.toLocaleString("en-US", {minimumFractionDigits: 2})}</div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          
          {/* ROW 1: BTC / USD */}
          <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center p-4 rounded-xl bg-background/30 border border-border/50">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-bitcoin tracking-wider">Bitcoin</label>
              <Input
                type="number"
                step="0.00000001"
                value={btcUsd}
                onChange={(e) => handleBtcUsdChange(parseFloat(e.target.value) || 0)}
                className="h-12 border-border bg-transparent px-3 font-mono text-lg font-bold text-bitcoin focus-visible:ring-bitcoin/30"
              />
            </div>
            <div className="text-gray-500"><Bitcoin className="h-4 w-4" /></div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-green-500 tracking-wider">Dólares</label>
              <Input
                type="text"
                inputMode="decimal"
                value={usd === 0 ? "" : usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                onChange={(e) => handleUsdChange(parseFloat(e.target.value.replace(/,/g, "")) || 0)}
                className="h-12 border-border bg-transparent px-3 font-mono text-lg font-bold text-green-500 focus-visible:ring-green-500/30"
              />
            </div>
          </div>

          {/* ROW 2: BTC / MXN */}
          <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center p-4 rounded-xl bg-background/30 border border-border/50">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-bitcoin tracking-wider">Bitcoin</label>
              <Input
                type="number"
                step="0.00000001"
                value={btcMxn}
                onChange={(e) => handleBtcMxnChange(parseFloat(e.target.value) || 0)}
                className="h-12 border-border bg-transparent px-3 font-mono text-lg font-bold text-bitcoin focus-visible:ring-bitcoin/30"
              />
            </div>
            <div className="text-gray-500"><Bitcoin className="h-4 w-4" /></div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-orange-500 tracking-wider">Pesos MX</label>
              <Input
                type="text"
                inputMode="decimal"
                value={mxn === 0 ? "" : mxn.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                onChange={(e) => handleMxnChange(parseFloat(e.target.value.replace(/,/g, "")) || 0)}
                className="h-12 border-border bg-transparent px-3 font-mono text-lg font-bold text-orange-500 focus-visible:ring-orange-500/30"
              />
            </div>
          </div>

          {/* ROW 3: SATS / MXN */}
          <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center p-4 rounded-xl bg-bitcoin/5 border border-bitcoin/20 relative overflow-hidden group">
            {/* Decoración de fondo para Sats */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAxNjUsIDAsIDAuMSkiLz48L3N2Zz4=')] opacity-50" />
            
            <div className="space-y-1 relative z-10">
              <label className="text-[10px] uppercase font-bold text-bitcoin tracking-wider flex items-center gap-1">
                <Coins className="h-3 w-3" /> Satoshis
              </label>
              <Input
                type="number"
                step="1"
                value={sats}
                onChange={(e) => handleSatsChange(parseFloat(e.target.value) || 0)}
                className="h-12 border-bitcoin/30 bg-transparent px-3 font-mono text-lg font-bold text-bitcoin focus-visible:ring-bitcoin/30"
              />
            </div>
            <div className="text-gray-500 relative z-10"><Bitcoin className="h-4 w-4" /></div>
            <div className="space-y-1 relative z-10">
              <label className="text-[10px] uppercase font-bold text-orange-500 tracking-wider">Pesos MX</label>
              <Input
                type="text"
                inputMode="decimal"
                value={satsMxn === 0 ? "" : satsMxn.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                onChange={(e) => handleSatsMxnChange(parseFloat(e.target.value.replace(/,/g, "")) || 0)}
                className="h-12 border-bitcoin/30 bg-transparent px-3 font-mono text-lg font-bold text-orange-500 focus-visible:ring-orange-500/30"
              />
            </div>
          </div>

        </div>
      </div>
    </Card>
  );
}