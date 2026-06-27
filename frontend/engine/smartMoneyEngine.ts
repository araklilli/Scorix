import type { Candle } from "../types/stock";

export interface SmartMoneyResult {
  smartMoney: boolean;
  accumulation: boolean;
  strongClose: boolean;
  volumeExpansion: boolean;
  score: number;
}

export function detectSmartMoney(candles: Candle[]): SmartMoneyResult {
  if (candles.length < 5) {
    return {
      smartMoney: false,
      accumulation: false,
      strongClose: false,
      volumeExpansion: false,
      score: 0,
    };
  }

  const last = candles[candles.length - 1];
  const previous = candles[candles.length - 2];

  const lastRange = last.high - last.low;
  const closePosition =
    lastRange > 0 ? (last.close - last.low) / lastRange : 0;

  const avgVolume =
    candles
      .slice(-6, -1)
      .reduce((sum, candle) => sum + candle.volume, 0) / 5;

  const volumeExpansion = last.volume > avgVolume * 1.5;
  const strongClose = closePosition >= 0.7;
  const accumulation = last.close > previous.close && volumeExpansion;

  let score = 0;

  if (volumeExpansion) score += 35;
  if (strongClose) score += 35;
  if (accumulation) score += 30;

  return {
    smartMoney: score >= 70,
    accumulation,
    strongClose,
    volumeExpansion,
    score,
  };
}