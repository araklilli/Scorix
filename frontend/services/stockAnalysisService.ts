import { marketService } from "./marketService";
import { analyzeStock, type AnalysisResult } from "../engine/analysisEngine";
import { makeDecision, type DecisionResult } from "../engine/decisionEngine";
import {
  calculateIntelligence,
  type IntelligenceResult,
} from "../engine/intelligenceEngine";
import {
  generateExplanation,
  type ExplanationResult,
} from "../engine/explanationEngine";
import type { Candle } from "../types/stock";

export interface StockAnalysisResult {
  symbol: string;
  candles: Candle[];
  analysis: AnalysisResult;
  decision: DecisionResult;
  intelligence: IntelligenceResult;
  explanation: ExplanationResult;
}

export const stockAnalysisService = {
  async analyze(symbol: string): Promise<StockAnalysisResult> {
    const normalizedSymbol = symbol.trim().toUpperCase();

    const candles = await marketService.getCandles(normalizedSymbol);
    const analysis = analyzeStock(candles);
    const decision = makeDecision(analysis);
    const intelligence = calculateIntelligence(analysis);
    const explanation = generateExplanation(analysis, decision);

    return {
      symbol: normalizedSymbol,
      candles,
      analysis,
      decision,
      intelligence,
      explanation,
    };
  },
};