// lib/ahorro/orca.ts
import fetch from 'cross-fetch';
import { Connection } from '@solana/web3.js';
import { decodeOrcaPosition } from './orca-decoder';
import { prisma } from '@/lib/prisma';

const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
const HELIUS_API_KEY = process.env.HELIUS_API_KEY;
const BIRDEYE_API_KEY = process.env.BIRDEYE_API_KEY;
const OWNER_WALLET = process.env.ORCA_WALLET_ADDRESS || '';

const connection = new Connection(SOLANA_RPC_URL);

export interface OrcaPositionData {
  positionMint: string;
  poolName: string;
  tokenA: { symbol: string; amount: number; usdPrice: number };
  tokenB: { symbol: string; amount: number; usdPrice: number };
  totalUSD: number;
  uncollectedFeesUSD: number;
  inRange: boolean;
}

// Mapeo de mints conocidos a símbolos para la UI
const TOKEN_SYMBOLS: Record<string, string> = {
  'So11111111111111111111111111111111111111112': 'SOL',
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': 'USDC',
  'cbbtcZcz3sovNMDDzhKQhN2J6QsdyKunRjVjDwnCbi4': 'cbBTC'
};

async function getTokenPrice(mintAddress: string): Promise<number> {
  if (!BIRDEYE_API_KEY) return 0;
  try {
    const url = `https://public-api.birdeye.so/defi/price?address=${mintAddress}`;
    const res = await fetch(url, {
      headers: {
        'X-API-KEY': BIRDEYE_API_KEY,
        'x-chain': 'solana',
      },
    });
    if (!res.ok) return 0;
    const data = await res.json();
    return data?.data?.value || 0;
  } catch (error) {
    return 0;
  }
}

export async function getOrcaPositions(): Promise<OrcaPositionData[]> {
  if (!OWNER_WALLET) return [];

  try {
    // 1. Buscar NFTs en la wallet (Helius)
    const assetsUrl = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
    const assetsRes = await fetch(assetsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'aceptabitcoin-helius',
        method: 'getAssetsByOwner',
        params: [OWNER_WALLET, { displayOptions: { compressed: true } }],
      }),
    });

    const assetsData = await assetsRes.json();
    const orcaProgramId = 'whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc';
    
    const orcaNfts = assetsData?.result?.items?.filter(
      (item: any) => item?.grouping?.[0]?.group_value === orcaProgramId
    ) || [];

    if (orcaNfts.length === 0) return [];

    // 2. Decodificar cada posición y obtener precios (en paralelo para velocidad)
    const positionsPromises = orcaNfts.map(async (nft: any) => {
      const mintAddress = nft?.id;
      if (!mintAddress) return null;

      // Decodificar on-chain
      const decoded = await decodeOrcaPosition(connection, mintAddress);
      if (!decoded) return null;

      // Obtener precios en USD
      const [priceA, priceB] = await Promise.all([
        getTokenPrice(decoded.mintA),
        getTokenPrice(decoded.mintB)
      ]);

      // Calcular valores en USD
      const usdA = decoded.tokenA * priceA;
      const usdB = decoded.tokenB * priceB;
      const feesUsd = (decoded.feesA * priceA) + (decoded.feesB * priceB);

      return {
        positionMint: mintAddress,
        poolName: `${TOKEN_SYMBOLS[decoded.mintA] || 'TKA'}/${TOKEN_SYMBOLS[decoded.mintB] || 'TKB'}`,
        tokenA: { 
          symbol: TOKEN_SYMBOLS[decoded.mintA] || 'TKA', 
          amount: decoded.tokenA, 
          usdPrice: priceA 
        },
        tokenB: { 
          symbol: TOKEN_SYMBOLS[decoded.mintB] || 'TKB', 
          amount: decoded.tokenB, 
          usdPrice: priceB 
        },
        totalUSD: usdA + usdB,
        uncollectedFeesUSD: feesUsd,
        inRange: decoded.inRange,
      } as OrcaPositionData;
    });

    // Filtrar nulos (posiciones que fallaron al decodificar)
    const positions = (await Promise.all(positionsPromises)).filter(p => p !== null) as OrcaPositionData[];
    
    return positions;

  } catch (error) {
    console.error('Error obteniendo posiciones de Orca:', error);
    return [];
  }
}

export async function getPortfolioSnapshot(): Promise<{ totalUSD: number; pnlToday: number; lastSnapshotUSD: number }> {
  // 1. Obtener valor actual en vivo
  const positions = await getOrcaPositions();
  const totalUSD = positions.reduce((acc, p) => acc + p.totalUSD, 0);
  
  // 2. Buscar el último snapshot guardado (el de las 23:00 hrs)
  const lastSnapshot = await prisma.lpSnapshot.findFirst({
    orderBy: { timestamp: 'desc' }
  });

  const lastSnapshotUSD = lastSnapshot?.totalUSD || totalUSD;
  
  // 3. Calcular PnL de hoy
  const pnlToday = totalUSD - lastSnapshotUSD;
  
  return { totalUSD, pnlToday, lastSnapshotUSD };
}