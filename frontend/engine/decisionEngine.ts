import type { AnalysisResult } from "./analysisEngine";
import {
  calculateIntelligence,
  type ScorixRating,
} from "./intelligenceEngine";

export type Decision = ScorixRating;

export interface DecisionResult {
  decision: Decision;
  confidence: number;
  score: number;
  risk: "LOW" | "MEDIUM" | "HIGH";
  stars: number;
}

export function makeDecision(
  analysis: AnalysisResult
): DecisionResult {
  const intelligence = calculateIntelligence(analysis);

  return {
    decision: intelligence.rating,
    confidence: intelligence.confidence,
    score: intelligence.score,
    risk: intelligence.risk,
    stars: intelligence.stars,
  };
}