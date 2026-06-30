import { stockAnalysisService } from "./stockAnalysisService";
import type { StockAnalysisResult } from "./stockAnalysisService";

export interface WatchlistAnalysisResult {
  symbol: string;
  score: number;
  rating: string;
  confidence: number;
  risk: "LOW" | "MEDIUM" | "HIGH";
  stars: number;
  analysis: StockAnalysisResult;
}

export const watchlistAnalysisService = {
  async analyzeWatchlist(
    symbols: string[]
  ): Promise<WatchlistAnalysisResult[]> {
    const uniqueSymbols = Array.from(
      new Set(symbols.map((symbol) => symbol.trim().toUpperCase()))
    );

    const results = await Promise.all(
      uniqueSymbols.map(async (symbol) => {
        const analysis = await stockAnalysisService.analyze(symbol);

        return {
          symbol,
          score: analysis.intelligence.score,
          rating: analysis.intelligence.rating,
          confidence: analysis.intelligence.confidence,
          risk: analysis.intelligence.risk,
          stars: analysis.intelligence.stars,
          analysis,
        };
      })
    );

    return results.sort((a, b) => b.score - a.score);
  },
};