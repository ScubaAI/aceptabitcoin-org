
export interface MarketMetrics {
  priceUsd: number;
  priceMxn: number;
  fees: {
    fast: number;
    medium: number;
    slow: number;
  };
  blockHeight: number;
  hashrate: number;
}

export async function getMarketData(): Promise<MarketMetrics> {
  try {
    // Fetch prices from CoinGecko or similar (using a simple fetch)
    const priceRes = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,mxn");
    const priceData = await priceRes.json();

    // Fetch fee data from Mempool.space
    const feesRes = await fetch("https://mempool.space/api/v1/fees/recommended");
    const feesData = await feesRes.json();

    // Fetch block height
    const blockRes = await fetch("https://mempool.space/api/blocks/tip/height");
    const blockHeight = await blockRes.json();

    // Fetch hashrate (approx)
    const hashRes = await fetch("https://mempool.space/api/v1/hashrate/3d");
    const hashData = await hashRes.json();

    return {
      priceUsd: priceData.bitcoin.usd,
      priceMxn: priceData.bitcoin.mxn,
      fees: {
        fast: feesData.fastestFee,
        medium: feesData.halfHourFee,
        slow: feesData.hourFee,
      },
      blockHeight,
      hashrate: hashData.currentHashrate,
    };
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
}
