/**
 * scripts/build-ahorro-data.ts
 * ─────────────────────────────────────────────────────────────
 * Convierte el CSV exportado de Orca/Birdeye a dos JSON:
 *   1. data/historico-ahorro.json  → agregado diario (PerformancePanel)
 *   2. data/orca-positions.json    → eventos completos (yield.ts + TransactionTable)
 *
 * Uso:
 *   1. Guarda el CSV como data/orca-position-history.csv
 *   2. npm run ahorro:build   (o: npx tsx scripts/build-ahorro-data.ts)
 *
 * Cero dependencias nuevas: parser manual + Zod (ya instalado).
 */
import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';

// ═══════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════
const DATA_DIR = path.join(process.cwd(), 'data');
const CSV_PATH = path.join(DATA_DIR, 'orca-position-history.csv');
const HISTORICO_OUT = path.join(DATA_DIR, 'historico-ahorro.json');
const POSITIONS_OUT = path.join(DATA_DIR, 'orca-positions.json');

// ═══════════════════════════════════════════════════════
// SCHEMAS (Zod)
// ═══════════════════════════════════════════════════════
const AhorroAction = z.enum([
  'open_position',
  'close_position',
  'increase_liquidity',
  'decrease_liquidity',
  'collect_fees',
]);

const AhorroPool = z.enum(['SOL/USDC', 'cbBTC/USDC', 'SOL/cbBTC']);

const PositionEventSchema = z.object({
  date: z.string(),
  pool: AhorroPool,
  action: AhorroAction,
  tokenA: z.object({
    symbol: z.string(),
    amount: z.number(),
    priceUsd: z.number(),
  }),
  tokenB: z.object({
    symbol: z.string(),
    amount: z.number(),
    priceUsd: z.number(),
  }),
  totalValueUsd: z.number(),
  feesCollectedUsd: z.number(),
  feesCollected: z.object({
    tokenA: z.number(),
    tokenB: z.number(),
  }),
  realizedPnlUsd: z.number(),
  costBasisUsd: z.number(),
  positionAddress: z.string(),
  poolAddress: z.string(),
  txHash: z.string(),
  autoCompound: z
    .object({
      harvestedA: z.number(),
      harvestedB: z.number(),
      redepositedA: z.number(),
      redepositedB: z.number(),
      leftoverA: z.number(),
      leftoverB: z.number(),
    })
    .optional(),
});

type PositionEvent = z.infer<typeof PositionEventSchema>;

// ═══════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════
const num = (s: string | undefined): number => {
  if (!s || s.trim() === '') return 0;
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
};

const ACTION_MAP: Record<string, z.infer<typeof AhorroAction>> = {
  'Open Position': 'open_position',
  'Close Position': 'close_position',
  'Increase Liquidity': 'increase_liquidity',
  'Decrease Liquidity': 'decrease_liquidity',
  'Collect Fees': 'collect_fees',
};

const toMonthDay = (iso: string): string => {
  const d = new Date(iso);
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${mm}/${dd}`;
};

const toDayKey = (iso: string): string => iso.slice(0, 10); // YYYY-MM-DD

// ═══════════════════════════════════════════════════════
// CSV → rows crudos (parser manual, datos limpios sin comas)
// ═══════════════════════════════════════════════════════
function parseCsvRows(csv: string): Record<string, string>[] {
  const lines = csv.trim().split('\n');
  if (lines.length < 2) throw new Error('CSV vacío o sin filas de datos');
  const headers = lines[0].split(',').map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(',');
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = (values[i] ?? '').trim();
    });
    return row;
  });
}

// ═══════════════════════════════════════════════════════
// rows → PositionEvent[]
// ═══════════════════════════════════════════════════════
function toPositionEvents(rows: Record<string, string>[]): PositionEvent[] {
  return rows.map((r, i) => {
    const action = ACTION_MAP[r['Action']];
    if (!action) throw new Error(`Acción desconocida en fila ${i}: "${r['Action']}"`);

    const pool = r['Pool'];
    if (!AhorroPool.safeParse(pool).success) {
      throw new Error(`Pool desconocido en fila ${i}: "${pool}"`);
    }

    // Auto-compound solo si hay datos reales
    const hasAutoCompound =
      num(r['Auto-Compound Harvested (Token A)']) > 0 ||
      num(r['Auto-Compound Harvested (Token B)']) > 0;

    const event: PositionEvent = {
      date: r['Date'],
      pool: pool as z.infer<typeof AhorroPool>,
      action,
      tokenA: {
        symbol: r['Token A Symbol'],
        amount: num(r['Token A Amount']),
        priceUsd: num(r['Token A Price (USD)']),
      },
      tokenB: {
        symbol: r['Token B Symbol'],
        amount: num(r['Token B Amount']),
        priceUsd: num(r['Token B Price (USD)']),
      },
      totalValueUsd: num(r['Total USD Value']),
      feesCollectedUsd: num(r['Fees Collected (USD)']),
      feesCollected: {
        tokenA: num(r['Fees Collected (Token A)']),
        tokenB: num(r['Fees Collected (Token B)']),
      },
      realizedPnlUsd: num(r['Realized PnL (USD)']),
      costBasisUsd: num(r['Cost Basis (USD)']),
      positionAddress: r['Position Address'],
      poolAddress: r['Pool Address'],
      txHash: r['Transaction'],
      ...(hasAutoCompound && {
        autoCompound: {
          harvestedA: num(r['Auto-Compound Harvested (Token A)']),
          harvestedB: num(r['Auto-Compound Harvested (Token B)']),
          redepositedA: num(r['Auto-Compound Redeposited (Token A)']),
          redepositedB: num(r['Auto-Compound Redeposited (Token B)']),
          leftoverA: num(r['Auto-Compound Leftover (Token A)']),
          leftoverB: num(r['Auto-Compound Leftover (Token B)']),
        },
      }),
    };

    return PositionEventSchema.parse(event);
  });
}

// ═══════════════════════════════════════════════════════
// PositionEvent[] → agregado diario (schema actual del PerformancePanel)
// ═══════════════════════════════════════════════════════
function aggregateDaily(events: PositionEvent[]) {
  const byDay = new Map<string, PositionEvent[]>();
  for (const e of events) {
    const key = toDayKey(e.date);
    if (!byDay.has(key)) byDay.set(key, []);
    byDay.get(key)!.push(e);
  }

  const days = Array.from(byDay.keys()).sort();

  return days.map((day) => {
    const dayEvents = byDay.get(day)!;
    const feesUSD = dayEvents.reduce((s, e) => s + e.feesCollectedUsd, 0);

    // valorUSD = el máximo del día (captura el valor real del portfolio,
    // no un Increase Liquidity parcial). Coincide con el historial hardcodeado.
    const valorUSD = Math.max(...dayEvents.map((e) => e.totalValueUsd));

    // tipo: pool único o combinación si hay varios pools ese día
    const pools = Array.from(new Set(dayEvents.map((e) => e.pool)));
    const tipo = pools.length === 1 ? pools[0] : pools.join(' + ');

    return {
      date: toMonthDay(day),
      valorUSD,
      feesUSD: Math.round(feesUSD * 100) / 100,
      tipo,
    };
  });
}

// ═══════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════
function main() {
  console.log('🔧 Build ahorro data...\n');

  if (!fs.existsSync(CSV_PATH)) {
    console.error(`❌ No se encontró: ${CSV_PATH}`);
    console.error('   Guarda el export de Orca como data/orca-position-history.csv');
    process.exit(1);
  }

  const csv = fs.readFileSync(CSV_PATH, 'utf-8');
  const rows = parseCsvRows(csv);
  const events = toPositionEvents(rows);
  console.log(`✅ ${events.length} eventos parseados del CSV`);

  // Ordenar ascendente por fecha
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));

  // 1. orca-positions.json (completo — para yield.ts + TransactionTable)
  fs.writeFileSync(POSITIONS_OUT, JSON.stringify(sorted, null, 2), 'utf-8');
  console.log(`📦 ${POSITIONS_OUT} (${sorted.length} eventos)`);

  // 2. historico-ahorro.json (agregado diario — backward compat PerformancePanel)
  const historico = aggregateDaily(events);
  fs.writeFileSync(HISTORICO_OUT, JSON.stringify(historico, null, 2), 'utf-8');
  console.log(`📈 ${HISTORICO_OUT} (${historico.length} días)`);

  console.log('\n🎉 Listo. PerformancePanel y yield.ts ya pueden consumir estos archivos.');
}

main();