// app/api/ahorro/snapshot/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrcaPositions } from "@/lib/ahorro/orca";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Darle 60s para que procese las APIs externas

export async function GET(request: Request) {
  // 1. Verificar el token de seguridad (para que nadie más ejecute el snapshot)
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const CRON_SECRET = process.env.CRON_SECRET;

  if (!CRON_SECRET || token !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 2. Obtener datos reales de Orca
    const positions = await getOrcaPositions();
    
    const totalUSD = positions.reduce((acc, p) => acc + p.totalUSD, 0);
    const feesUSD = positions.reduce((acc, p) => acc + p.uncollectedFeesUSD, 0);

    // 3. Guardar en Vercel Postgres
    const snapshot = await prisma.lpSnapshot.create({
      data: {
        totalUSD,
        feesUSD,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: "Snapshot guardado correctamente",
      data: snapshot 
    });
  } catch (error) {
    console.error("Error guardando snapshot:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
