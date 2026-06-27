import type { AnalysisResult } from "./analysisEngine";

export type Decision =
  | "STRONG BUY"
  | "BUY"
  | "WAIT"
  | "SELL"
  | "STRONG SELL";

export interface DecisionResult {
  decision: Decision;
  confidence: number;
}

export function makeDecision(
  analysis: AnalysisResult
): DecisionResult {
  let confidence = 50;

  // RSI
  if (analysis.rsi >= 50 && analysis.rsi <= 70) confidence += 15;
  if (analysis.rsi < 40) confidence -= 15;

  // EMA Trend
  if (analysis.emaTrend === "BULLISH") confidence += 15;
  if (analysis.emaTrend === "BEARISH") confidence -= 15;

  // MACD Trend
  if (analysis.macdTrend === "POSITIVE") confidence += 20;
  if (analysis.macdTrend === "NEGATIVE") confidence -= 20;

  confidence = Math.max(0, Math.min(100, confidence));

  let decision: Decision = "WAIT";

  if (confidence >= 85) {
    decision = "STRONG BUY";
  } else if (confidence >= 65) {
    decision = "BUY";
  } else if (confidence <= 20) {
    decision = "STRONG SELL";
  } else if (confidence <= 40) {
    decision = "SELL";
  }

  return {
    decision,
    confidence,
  };
}