"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Card } from "@/components/ui/card"
import { TrendingUp, Loader2 } from "lucide-react"

interface DataPoint {
  date: string
  valorUSD: number
  feesUSD: number
}

export default function PerformancePanel() {
  const [data, setData] = useState<DataPoint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/ahorro/history")
        const result = await res.json()
        if (result.success) {
          setData(result.data)
        }
      } catch (error) {
        console.error("Error cargando historial:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [])

  // Calcular PnL Total del periodo
  const totalPnl = data.length > 1 ? data[data.length - 1].valorUSD - data[0].valorUSD : 0
  const isPositive = totalPnl >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="relative overflow-hidden border-gray-800 bg-black/60 backdrop-blur-xl p-6 shadow-[0_0_30px_rgba(0,255,65,0.05)]">
        {/* Efecto Scanline sutil */}
        <div className="pointer-events-none absolute inset-0 opacity-5 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,65,0.1)_50%)] bg-[length:100%_4px] animate-scanline" />

        <div className="relative z-10">
          {/* Header del Panel */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 font-mono">Curva de Rendimiento (30D)</p>
              <h3 className="text-2xl font-bold text-white mt-1" style={{ fontFamily: "'IBM Plex Serif', serif" }}>
                Evolución del Capital
              </h3>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-md border ${isPositive ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
              <TrendingUp className={`w-4 h-4 ${isPositive ? 'text-green-400' : 'text-red-400'}`} />
              <div>
                <p className="text-[10px] uppercase text-gray-400 font-mono">PnL 30D</p>
                <p className={`text-lg font-bold font-mono ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {isPositive ? '+' : ''}${totalPnl.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Gráfica */}
          {loading ? (
            <div className="h-[300px] flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
          ) : (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00FF41" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00FF41" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorFees" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F7931A" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#F7931A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#4a4a4a" 
                    tick={{ fill: '#4a4a4a', fontSize: 12, fontFamily: 'monospace' }}
                    axisLine={{ stroke: '#1a1a1a' }}
                  />
                  <YAxis 
                    stroke="#4a4a4a" 
                    tick={{ fill: '#4a4a4a', fontSize: 12, fontFamily: 'monospace' }}
                    axisLine={{ stroke: '#1a1a1a' }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                      border: '1px solid #00FF41',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                    }}
                    labelStyle={{ color: '#F7931A' }}
                    itemStyle={{ color: '#00FF41' }}
                    formatter={(value) => {
                      const formattedValue = typeof value === 'number'
                        ? `$${value.toFixed(2)}`
                        : String(value ?? '');
                      return [formattedValue, 'Valor USD'];
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="valorUSD"
                    stroke="#00FF41"
                    strokeWidth={2}
                    fill="url(#colorValor)"
                    dot={{ fill: '#00FF41', r: 3 }}
                    activeDot={{ r: 5, fill: '#F7931A' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="feesUSD"
                    stroke="#F7931A"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fill="url(#colorFees)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Leyenda */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#00FF41] rounded-sm shadow-[0_0_5px_rgba(0,255,65,0.5)]" />
              <span className="text-xs text-gray-400 font-mono">Valor Total en USD</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#F7931A] rounded-sm shadow-[0_0_5px_rgba(247,147,26,0.5)]" />
              <span className="text-xs text-gray-400 font-mono">Fees Acumulados</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}