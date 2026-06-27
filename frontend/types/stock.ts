export type RiskLevel = "Düşük" | "Orta" | "Yüksek";

export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Stock {
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
  risk: RiskLevel;
}

export interface ScoreBreakdown {
  rsi: number;
  volume: number;
  breakout: number;
  smartMoney: number;
  minervini: number;
  total: number;
}