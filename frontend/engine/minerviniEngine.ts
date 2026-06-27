import type { Candle } from "../types/stock";
import { calculateEMA } from "./emaEngine";

export interface MinerviniResult {
  minervini: boolean;
  priceAboveEma50: boolean;
  ema50AboveEma150: boolean;
  ema150AboveEma200: boolean;
  ema200Rising: boolean;
  nearHigh: boolean;
  farFromLow: boolean;
  score: number;
}

function getHighestHigh(candles: Candle[]): number {
  return Math.max(...candles.map((candle) => candle.high));
}

function getLowestLow(candles: Candle[]): number {
  return Math.min(...candles.map((candle) => candle.low));
}

export function detectMinerviniTrend(candles: Candle[]): MinerviniResult {
  if (candles.length < 30) {
    return {
      minervini: false,
      priceAboveEma50: false,
      ema50AboveEma150: false,
      ema150AboveEma200: false,
      ema200Rising: false,
      nearHigh: false,
      farFromLow: false,
      score: 0,
    };
  }

  const closes = candles.map((candle) => candle.close);
  const currentClose = closes.at(-1) ?? 0;

  const ema50Values = calculateEMA(closes, 50);
  const ema150Values = calculateEMA(closes, 150);
  const ema200Values = calculateEMA(closes, 200);

  const ema50 = ema50Values.at(-1) ?? 0;
  const ema150 = ema150Values.at(-1) ?? 0;
  const ema200 = ema200Values.at(-1) ?? 0;
  const ema200Previous = ema200Values.at(-20) ?? ema200;

  const highestHigh = getHighestHigh(candles);
  const lowestLow = getLowestLow(candles);

  const priceAboveEma50 = currentClose > ema50;
  const ema50AboveEma150 = ema50 > ema150;
  const ema150AboveEma200 = ema150 > ema200;
  const ema200Rising = ema200 > ema200Previous;

  const distanceFromHigh =
    highestHigh > 0 ? ((highestHigh - currentClose) / highestHigh) * 100 : 100;

  const distanceFromLow =
    lowestLow > 0 ? ((currentClose - lowestLow) / lowestLow) * 100 : 0;

  const nearHigh = distanceFromHigh <= 25;
  const farFromLow = distanceFromLow >= 30;

  let score = 0;

  if (priceAboveEma50) score += 20;
  if (ema50AboveEma150) score += 20;
  if (ema150AboveEma200) score += 20;
  if (ema200Rising) score += 15;
  if (nearHigh) score += 15;
  if (farFromLow) score += 10;

  return {
    minervini: score >= 75,
    priceAboveEma50,
    ema50AboveEma150,
    ema150AboveEma200,
    ema200Rising,
    nearHigh,
    farFromLow,
    score,
  };
}