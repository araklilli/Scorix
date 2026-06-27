import type { Candle } from "../types/stock";
import { calculateRSI } from "./rsiEngine";
import { calculateEMA } from "./emaEngine";
import { calculateMACD } from "./macdEngine";
import { calculateVolumeRatio } from "./volumeEngine";
import { detectBreakout } from "./breakoutEngine";
import { detectSmartMoney } from "./smartMoneyEngine";
import { detectMinerviniTrend } from "./minerviniEngine";

export interface AnalysisResult {
  rsi: number;
  ema20: number;
  ema50: number;
  macd: number;
  histogram: number;
  volumeRatio: number;

  emaTrend: "BULLISH" | "BEARISH" | "NEUTRAL";
  macdTrend: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  volumeTrend: "STRONG" | "NORMAL" | "WEAK";

  breakout: boolean;
  breakoutStrength: "STRONG" | "NORMAL" | "WEAK";
  resistance: number;

  smartMoney: boolean;
  smartMoneyScore: number;
  accumulation: boolean;
  strongClose: boolean;
  volumeExpansion: boolean;

  minervini: boolean;
  minerviniScore: number;
  priceAboveEma50: boolean;
  ema50AboveEma150: boolean;
  ema150AboveEma200: boolean;
  ema200Rising: boolean;
  nearHigh: boolean;
  farFromLow: boolean;
}

export function analyzeStock(candles: Candle[]): AnalysisResult {
  const closes = candles.map((candle) => candle.close);
  const volumes = candles.map((candle) => candle.volume);

  const rsi = calculateRSI(closes);
  const ema20Values = calculateEMA(closes, 20);
  const ema50Values = calculateEMA(closes, 50);
  const macdResult = calculateMACD(closes);
  const volumeRatio = calculateVolumeRatio(volumes);

  const breakoutResult = detectBreakout(candles);
  const smartMoneyResult = detectSmartMoney(candles);
  const minerviniResult = detectMinerviniTrend(candles);

  const ema20 = ema20Values.at(-1) ?? 0;
  const ema50 = ema50Values.at(-1) ?? 0;
  const macd = macdResult.macdLine.at(-1) ?? 0;
  const histogram = macdResult.histogram.at(-1) ?? 0;

  const emaTrend =
    ema20 > ema50
      ? "BULLISH"
      : ema20 < ema50
      ? "BEARISH"
      : "NEUTRAL";

  const macdTrend =
    macd > 0 && histogram > 0
      ? "POSITIVE"
      : macd < 0 || histogram < 0
      ? "NEGATIVE"
      : "NEUTRAL";

  const volumeTrend =
    volumeRatio >= 2
      ? "STRONG"
      : volumeRatio < 1
      ? "WEAK"
      : "NORMAL";

  return {
    rsi,
    ema20,
    ema50,
    macd,
    histogram,
    volumeRatio,

    emaTrend,
    macdTrend,
    volumeTrend,

    breakout: breakoutResult.isBreakout,
    breakoutStrength: breakoutResult.breakoutStrength,
    resistance: breakoutResult.resistanceLevel,

    smartMoney: smartMoneyResult.smartMoney,
    smartMoneyScore: smartMoneyResult.score,
    accumulation: smartMoneyResult.accumulation,
    strongClose: smartMoneyResult.strongClose,
    volumeExpansion: smartMoneyResult.volumeExpansion,

    minervini: minerviniResult.minervini,
    minerviniScore: minerviniResult.score,
    priceAboveEma50: minerviniResult.priceAboveEma50,
    ema50AboveEma150: minerviniResult.ema50AboveEma150,
    ema150AboveEma200: minerviniResult.ema150AboveEma200,
    ema200Rising: minerviniResult.ema200Rising,
    nearHigh: minerviniResult.nearHigh,
    farFromLow: minerviniResult.farFromLow,
  };
}