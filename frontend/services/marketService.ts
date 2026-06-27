export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MarketStock {
  symbol: string;
  name: string;
  company: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  volumeRatio: number;
  rsi: number;
  breakout: boolean;
  smartMoney: boolean;
  minervini: boolean;
  signal: string;
  risk: "Düşük" | "Orta" | "Yüksek";
}

const marketStocks: MarketStock[] = [
  {
    symbol: "THYAO",
    name: "Türk Hava Yolları",
    company: "Türk Hava Yolları",
    sector: "Ulaştırma",
    price: 306.2,
    change: 2.4,
    changePercent: 2.4,
    volumeRatio: 2.3,
    rsi: 61,
    breakout: true,
    smartMoney: true,
    minervini: true,
    signal: "Momentum",
    risk: "Orta",
  },
  {
    symbol: "ASELS",
    name: "Aselsan",
    company: "Aselsan",
    sector: "Savunma",
    price: 189.6,
    change: 1.3,
    changePercent: 1.3,
    volumeRatio: 1.8,
    rsi: 57,
    breakout: true,
    smartMoney: true,
    minervini: false,
    signal: "Akıllı Para",
    risk: "Düşük",
  },
];

export function getMarketStocks(): MarketStock[] {
  return marketStocks;
}

export const marketService = {
  getTopStocks(): MarketStock[] {
    return marketStocks;
  },

  async getCandles(symbol: string): Promise<Candle[]> {
    return [
      { time: "2025-06-01", open: 278, high: 286, low: 274, close: 282, volume: 25000000 },
      { time: "2025-06-02", open: 282, high: 291, low: 279, close: 288, volume: 27000000 },
      { time: "2025-06-03", open: 288, high: 296, low: 284, close: 292, volume: 30000000 },
      { time: "2025-06-04", open: 292, high: 298, low: 287, close: 289, volume: 24000000 },
      { time: "2025-06-05", open: 289, high: 301, low: 286, close: 298, volume: 31000000 },
      { time: "2025-06-06", open: 298, high: 309, low: 294, close: 306, volume: 35000000 },
      { time: "2025-06-07", open: 306, high: 314, low: 301, close: 311, volume: 42000000 },
    ];
  },
};