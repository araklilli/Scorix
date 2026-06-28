import { marketService } from "./marketService";
import { analyzeStock } from "../engine/analysisEngine";
import { calculateIntelligence } from "../engine/intelligenceEngine";

export interface ScanResult {
  symbol: string;
  name: string;
  score: number;
  rating: string;
  confidence: number;
  risk: "LOW" | "MEDIUM" | "HIGH";
  stars: number;
}

export const scannerService = {
  async scanMarket(): Promise<ScanResult[]> {
    const stocks = marketService.getTopStocks();

    const results = await Promise.all(
      stocks.map(async (stock) => {
        const candles = await marketService.getCandles(stock.symbol);
        const analysis = analyzeStock(candles);
        const intelligence = calculateIntelligence(analysis);

        return {
          symbol: stock.symbol,
          name: stock.name,
          score: intelligence.score,
          rating: intelligence.rating,
          confidence: intelligence.confidence,
          risk: intelligence.risk,
          stars: intelligence.stars,
        };
      })
    );

    return results.sort((a, b) => b.score - a.score);
  },
};