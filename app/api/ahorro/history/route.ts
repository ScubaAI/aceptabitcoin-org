import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'historico-ahorro.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    const totalFees = data.reduce((acc: number, point: any) => acc + point.feesUSD, 0);

    return NextResponse.json({ 
      success: true, 
      data,
      meta: {
        totalFeesAcumulados: totalFees,
        registros: data.length
      }
    });
  } catch (error) {
    console.error("Error leyendo historico:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}