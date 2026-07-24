// lib/ahorro/orca-decoder.ts
import { Connection, PublicKey } from "@solana/web3.js";
import {
  WhirlpoolContext,
  buildWhirlpoolClient,
  PDAUtil,
  ORCA_WHIRLPOOL_PROGRAM_ID,
  PriceMath
} from "@orca-so/whirlpools-sdk";
import { DecimalUtil } from "@orca-so/common-sdk";
import { getMint } from "@solana/spl-token";
import { getTokenAFromLiquidity, getTokenBFromLiquidity } from "@orca-so/whirlpools-sdk/dist/utils/position-util";

/**
 * Decodifica una posición de Orca a partir del Mint del NFT de posición.
 */
export async function decodeOrcaPosition(
  connection: Connection,
  positionMintAddress: string
) {
  try {
    // 1. Configurar el contexto y cliente de Orca
    const ctx = WhirlpoolContext.from(connection, {} as any, undefined, undefined, undefined, ORCA_WHIRLPOOL_PROGRAM_ID);
    const client = buildWhirlpoolClient(ctx);

    const positionMint = new PublicKey(positionMintAddress);

    // 2. Derivar la dirección de la cuenta de posición usando el PDA
    const positionPda = PDAUtil.getPosition(ORCA_WHIRLPOOL_PROGRAM_ID, positionMint);

    // 3. Cargar la posición y la pool (Whirlpool)
    const position = await client.getPosition(positionPda.publicKey);
    const whirlpool = await client.getPool(position.getData().whirlpool);

    const positionData = position.getData();
    const whirlpoolData = whirlpool.getData();

    // 4. Obtener información de los tokens (decimales)
    const tokenAInfo = await getMint(connection, whirlpoolData.tokenMintA);
    const tokenBInfo = await getMint(connection, whirlpoolData.tokenMintB);

    // 5. Calcular cantidades de tokens desde la liquidez
    // Usamos el rango de ticks de la posición para obtener los sqrt prices
    const sqrtPriceLowerX64 = PriceMath.tickIndexToSqrtPriceX64(positionData.tickLowerIndex);
    const sqrtPriceUpperX64 = PriceMath.tickIndexToSqrtPriceX64(positionData.tickUpperIndex);
    const liquidity = positionData.liquidity;

    const tokenABN = getTokenAFromLiquidity(liquidity, sqrtPriceLowerX64, sqrtPriceUpperX64, false);
    const tokenBBN = getTokenBFromLiquidity(liquidity, sqrtPriceLowerX64, sqrtPriceUpperX64, false);

    // 6. Fees acumulados (pendientes de reclamar)
    const feesA = DecimalUtil.fromBN(positionData.feeOwedA, tokenAInfo.decimals).toNumber();
    const feesB = DecimalUtil.fromBN(positionData.feeOwedB, tokenBInfo.decimals).toNumber();

    // 7. Verificar si está en rango
    const currentTick = whirlpoolData.tickCurrentIndex;
    const lowerTick = positionData.tickLowerIndex;
    const upperTick = positionData.tickUpperIndex;
    const inRange = currentTick >= lowerTick && currentTick < upperTick;

    return {
      tokenA: DecimalUtil.fromBN(tokenABN, tokenAInfo.decimals).toNumber(),
      tokenB: DecimalUtil.fromBN(tokenBBN, tokenBInfo.decimals).toNumber(),
      feesA,
      feesB,
      inRange,
      // Guardamos los mints para buscar el precio luego
      mintA: whirlpoolData.tokenMintA.toBase58(),
      mintB: whirlpoolData.tokenMintB.toBase58(),
      tickLower: lowerTick,
      tickUpper: upperTick,
      tickCurrent: currentTick
    };

  } catch (error) {
    console.error(`Error decodificando posición ${positionMintAddress}:`, error);
    return null;
  }
}
