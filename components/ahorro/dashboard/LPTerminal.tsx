"use client"

import { motion } from "framer-motion"
import { TrendingUp, Activity, Wallet, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

interface LPTerminalProps {
  totalUSD: number
  pnlToday: number
  feesAccumulated: number
  inRange: boolean
  positions: Array<{
    pool: string
    tokenA: string
    tokenB: string
    lowerRange: number
    upperRange: number
    currentPrice: number
  }>
}

export default function LPTerminal({ totalUSD, pnlToday, feesAccumulated, inRange, positions }: LPTerminalProps) {
  const isPositivePnL = pnlToday >= 0

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* Header Global: El Corte de las 23:00 hrs */}
      <Card className="relative overflow-hidden border-orange-500/30 bg-black/60 backdrop-blur-xl p-6 shadow-[0_0_25px_rgba(247,147,26,0.1)]">
        <div className="pointer-events-none absolute inset-0 opacity-10 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,65,0.1)_50%)] bg-[length:100%_4px] animate-scanline" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-orange-500/60 font-mono">Valor Total en Pool (Mark-to-Market)</p>
            <h2 className="text-4xl font-bold text-white mt-1" style={{ fontFamily: "'IBM Plex Serif', serif" }}>
              ${totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-md border ${isPositivePnL ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
              {isPositivePnL ? <TrendingUp className="w-4 h-4 text-green-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
              <div>
                <p className="text-[10px] uppercase text-gray-400 font-mono">PnL 24h</p>
                <p className={`text-lg font-bold font-mono ${isPositivePnL ? 'text-green-400' : 'text-red-400'}`}>
                  {isPositivePnL ? '+' : ''}${pnlToday.toFixed(2)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-md border border-yellow-500/30 bg-yellow-500/10">
              <Wallet className="w-4 h-4 text-yellow-400" />
              <div>
                <p className="text-[10px] uppercase text-gray-400 font-mono">Fees Hoy</p>
                <p className="text-lg font-bold font-mono text-yellow-400">${feesAccumulated.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Grid de Pools Individuales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {positions.map((pos, idx) => {
          const rangePercent = ((pos.currentPrice - pos.lowerRange) / (pos.upperRange - pos.lowerRange)) * 100
          const clampedPercent = Math.max(0, Math.min(100, rangePercent))
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="relative overflow-hidden border-gray-800 bg-black/40 backdrop-blur-md p-6 h-full">
                {/* Header de la Pool */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white font-mono">
                    {pos.tokenA} / {pos.tokenB}
                  </h3>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono ${inRange ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
                    <Activity className="w-3 h-3 animate-pulse" />
                    {inRange ? 'EN RANGO' : 'FUERA DE RANGO'}
                  </div>
                </div>

                {/* Visualización del Rango (SMC / Order Blocks) */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-gray-500">
                    <span>${pos.lowerRange.toLocaleString()}</span>
                    <span className="text-orange-400">Actual: ${pos.currentPrice.toLocaleString()}</span>
                    <span>${pos.upperRange.toLocaleString()}</span>
                  </div>
                  
                  <div className="relative h-3 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                    {/* Zona In-Range */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-orange-500/40 to-orange-500/20" />
                    {/* Indicador de Precio Actual */}
                    <motion.div 
                      className="absolute top-0 bottom-0 w-1 bg-orange-400 shadow-[0_0_10px_rgba(247,147,26,0.8)]"
                      initial={{ left: 0 }}
                      animate={{ left: `${clampedPercent}%` }}
                      transition={{ type: "spring", stiffness: 100 }}
                    />
                  </div>
                </div>

                {/* Footer de Métricas */}
                <div className="mt-6 pt-4 border-t border-gray-800 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase text-gray-500 font-mono">Composición</p>
                    <p className="text-sm text-white font-mono">50% / 50%</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-500 font-mono">Próximo Corte</p>
                    <p className="text-sm text-white font-mono">23:00 hrs</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}