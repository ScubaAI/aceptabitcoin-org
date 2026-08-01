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
