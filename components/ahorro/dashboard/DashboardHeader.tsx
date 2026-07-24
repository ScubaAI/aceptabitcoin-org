"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Terminal, LogOut, Clock, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  const [currentTime, setCurrentTime] = useState<string>("--:--:--")

  // Reloj en vivo para la estética Terminal
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('es-MX', { hour12: false }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    // Eliminar la cookie de sesión LnAuth
    document.cookie = "ahorro_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
    // Redirigir al gate de acceso
    window.location.href = "/ahorro/access"
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-800"
    >
      {/* Lado Izquierdo: Identidad del Terminal */}
      <div className="flex items-center gap-4">
        <div className="p-3 border border-orange-500/30 bg-orange-500/5 rounded-md">
          <Terminal className="w-6 h-6 text-orange-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'IBM Plex Serif', serif" }}>
            LP Terminal <span className="text-orange-500">v2.0</span>
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <p className="text-xs font-mono text-green-400 uppercase tracking-widest">
              Conexión Soberana Establecida
            </p>
          </div>
        </div>
      </div>

      {/* Lado Derecho: Reloj y Controles */}
      <div className="flex items-center gap-6">
        {/* Reloj de Sincronización */}
        <div className="hidden md:flex flex-col items-end">
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-mono">Hora Local</span>
          </div>
          <span className="text-lg font-mono text-white mt-1 tracking-wider">
            {currentTime}
          </span>
        </div>

        {/* Indicador de Seguridad */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 border border-green-500/20 bg-green-500/5 rounded-md">
          <ShieldCheck className="w-4 h-4 text-green-400" />
          <span className="text-xs text-green-400 font-mono uppercase">LnAuth</span>
        </div>

        {/* Botón de Cerrar Sesión */}
        <Button 
          onClick={handleLogout}
          variant="outline" 
          className="border-red-500/30 bg-red-500/5 text-red-400 hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Desconectar
        </Button>
      </div>
    </motion.div>
  )
}