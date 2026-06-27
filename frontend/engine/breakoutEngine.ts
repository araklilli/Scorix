import type { Candle } from "../types/stock";

export interface BreakoutResult {
  isBreakout: boolean;
  resistanceLevel: number;
  currentClose: number;
  breakoutStrength: "STRONG" | "NORMAL" | "WEAK";
}

export function detectBreakout(candles: Candle[], lookback = 20): BreakoutResult {
  if (candles.length < 2) {
    return {
      isBreakout: false,
      resistanceLevel: 0,
      currentClose: 0,
      breakoutStrength: "WEAK",
    };
  }

  const currentCandle = candles[candles.length - 1];
  const previousCandles = candles.slice(
    Math.max(0, candles.length - lookback - 1),
    candles.length - 1
  );

  const resistanceLevel = Math.max(
    ...previousCandles.map((candle) => candle.high)
  );

  const isBreakout = currentCandle.close > resistanceLevel;

  const breakoutPercent =
    resistanceLevel > 0
      ? ((currentCandle.close - resistanceLevel) / resistanceLevel) * 100
      : 0;

  let breakoutStrength: BreakoutResult["breakoutStrength"] = "WEAK";

  if (isBreakout && breakoutPercent >= 3) {
    breakoutStrength = "STRONG";
  } else if (isBreakout && breakoutPercent >= 1) {
    breakoutStrength = "NORMAL";
  }

  return {
    isBreakout,
    resistanceLevel: Number(resistanceLevel.toFixed(2)),
    currentClose: Number(currentCandle.close.toFixed(2)),
    breakoutStrength,
  };
}