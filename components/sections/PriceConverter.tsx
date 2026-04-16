"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRightLeft } from "lucide-react";

export default function PriceConverter() {
  const [btc, setBtc] = useState<number>(1);
  const [mxn, setMxn] = useState<number>(0);
  const [btcPrice, setBtcPrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=mxn"
        );
        const data = await res.json();
        const price = data.bitcoin.mxn;
        setBtcPrice(price);
        setMxn(btc * price);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching price");
        setBtcPrice(1287500);
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 45000);
    return () => clearInterval(interval);
  }, [btc]);

  const handleBtcChange = (value: number) => {
    setBtc(value);
    if (btcPrice) setMxn(value * btcPrice);
  };

  const handleMxnChange = (value: number) => {
    setMxn(value);
    if (btcPrice) setBtc(value / btcPrice);
  };

  return (
    <Card className="p-8 bg-zinc-900 border-turquesa/30">
      <div className="flex items-center justify-center gap-3 mb-8">
        <h3 className="text-3xl font-bold">Calculadora</h3>
        <ArrowRightLeft className="text-turquesa" />
        <h3 className="text-3xl font-bold">Bitcoin ↔ MXN</h3>
      </div>

      <div className="space-y-10">
        <div>
          <Label className="text-gray-400 text-sm">Cantidad en Bitcoin</Label>
          <div className="mt-2 flex items-center gap-4">
            <Input
              type="number"
              step="0.000001"
              value={btc}
              onChange={(e) => handleBtcChange(parseFloat(e.target.value) || 0)}
              className="text-4xl font-mono h-16 bg-black border-white/10"
            />
            <span className="text-5xl">₿</span>
          </div>
        </div>

        <div className="text-center text-turquesa text-4xl my-2">↓</div>

        <div>
          <Label className="text-gray-400 text-sm">Cantidad en Pesos Mexicanos</Label>
          <div className="mt-2 flex items-center gap-4">
            <Input
              type="number"
              value={Math.round(mxn)}
              onChange={(e) => handleMxnChange(parseFloat(e.target.value) || 0)}
              className="text-4xl font-mono h-16 bg-black border-white/10"
            />
            <span className="text-4xl">MX$</span>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-400">
        1 BTC = <span className="font-mono text-turquesa text-lg">
          ${btcPrice.toLocaleString("es-MX")}
        </span> MXN
        <br />
        {loading ? "Actualizando precio..." : "Precio en tiempo real • Coingecko"}
      </div>
    </Card>
  );
}