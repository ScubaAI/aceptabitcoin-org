// app/api/ahorro/history/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // 1. Validar sesión (simplificado, asumiendo que el middleware ya protegió la ruta)
    // Si necesitas validar el JWT aquí, puedes extraerlo de las cookies.
    
    // 2. Buscar los últimos 30 snapshots en la base de datos
    const snapshots = await prisma.lpSnapshot.findMany({
      orderBy: { timestamp: 'asc' },
      take: 30, // Últimos 30 registros
    });

    // 3. Formatear datos para la gráfica
    const chartData = snapshots.map(snap => ({
      date: new Date(snap.timestamp).toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit' }),
      valorUSD: snap.totalUSD,
      feesUSD: snap.feesUSD,
    }));

    return NextResponse.json({ success: true, data: chartData });
  } catch (error) {
    console.error("Error obteniendo historial:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}