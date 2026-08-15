export type AccessMode = 'open' | 'invite' | 'payment';

export interface UserAccess {
  granted: boolean;
  expiresAt?: number; // timestamp
  method: AccessMode;
}


export interface YieldStats {
  totalSatsEarned: number;
  currentAPY: number;
  nextPayoutDate: string; // ISO date
  poolHealth: 'active' | 'rebalancing' | 'maintenance';
}

// ═══════════════════════════════════════════════════════
// Orca LP Position Events (desde data/orca-positions.json)
// ═══════════════════════════════════════════════════════
export type AhorroAction =
  | 'open_position'
  | 'close_position'
  | 'increase_liquidity'
  | 'decrease_liquidity'
  | 'collect_fees';

export type AhorroPool = 'SOL/USDC' | 'cbBTC/USDC' | 'SOL/cbBTC';

export interface PositionEvent {
  date: string;
  pool: AhorroPool;
  action: AhorroAction;
  tokenA: { symbol: string; amount: number; priceUsd: number };
  tokenB: { symbol: string; amount: number; priceUsd: number };
  totalValueUsd: number;
  feesCollectedUsd: number;
  feesCollected: { tokenA: number; tokenB: number };
  realizedPnlUsd: number;
  costBasisUsd: number;
  positionAddress: string;
  poolAddress: string;
  txHash: string;
  autoCompound?: {
    harvestedA: number;
    harvestedB: number;
    redepositedA: number;
    redepositedB: number;
    leftoverA: number;
    leftoverB: number;
  };
}

export interface HistoricoEntry {
  date: string;       // "MM/DD"
  valorUSD: number;
  feesUSD: number;
  tipo: string;       // "SOL/USDC" | "SOL/USDC + cbBTC"
}
