import type { AnalysisResult } from "./analysisEngine";

export type ScorixRating =
  | "STRONG BUY"
  | "BUY"
  | "WAIT"
  | "SELL"
  | "STRONG SELL";

export type ScorixRisk = "LOW" | "MEDIUM" | "HIGH";

export interface IntelligenceResult {
  score: number;
  rating: ScorixRating;
  confidence: number;
  risk: ScorixRisk;
  stars: number;
}

export function calculateIntelligence(
  analysis: AnalysisResult
): IntelligenceResult {
  let score = 0;

  if (analysis.rsi >= 50 && analysis.rsi <= 70) score += 15;
  else if (analysis.rsi > 70) score += 8;

  if (analysis.emaTrend === "BULLISH") score += 15;
  if (analysis.macdTrend === "POSITIVE") score += 15;

  if (analysis.volumeTrend === "STRONG") score += 12;
  else if (analysis.volumeTrend === "NORMAL") score += 6;

  if (analysis.breakout) score += analysis.breakoutStrength === "STRONG" ? 15 : 8;

  if (analysis.smartMoney) score += 15;
  else score += Math.min(analysis.smartMoneyScore * 0.08, 8);

  if (analysis.minervini) score += 13;
  else score += Math.min(analysis.minerviniScore * 0.08, 8);

  score = Math.round(Math.min(score, 100));

  let rating: ScorixRating = "WAIT";
  if (score >= 85) rating = "STRONG BUY";
  else if (score >= 65) rating = "BUY";
  else if (score <= 20) rating = "STRONG SELL";
  else if (score <= 40) rating = "SELL";

  const risk: ScorixRisk =
    analysis.rsi > 75 || analysis.volumeTrend === "WEAK"
      ? "HIGH"
      : analysis.breakout && analysis.smartMoney
      ? "LOW"
      : "MEDIUM";

  const confidence = Math.min(100, Math.round((score + analysis.smartMoneyScore + analysis.minerviniScore) / 3));

  const stars = Math.max(1, Math.ceil(score / 20));

  return {
    score,
    rating,
    confidence,
    risk,
    stars,
  };
}