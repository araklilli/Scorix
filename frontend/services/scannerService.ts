import { marketService } from "./marketService";
import { stockAnalysisService } from "./stockAnalysisService";

export interface ScanResult {
  symbol: string;
  name: string;
  score: number;
  rating: string;
  confidence: number;
  risk: "LOW" | "MEDIUM" | "HIGH";
  stars: number;
  breakout: boolean;
  smartMoney: boolean;
  minervini: boolean;
}

export const scannerService = {
  async scanMarket(): Promise<ScanResult[]> {
    const stocks = marketService.getTopStocks();

    const results = await Promise.all(
      stocks.map(async (stock) => {
        const stockAnalysis = await stockAnalysisService.analyze(stock.symbol);

        return {
          symbol: stock.symbol,
          name: stock.name,
          score: stockAnalysis.intelligence.score,
          rating: stockAnalysis.intelligence.rating,
          confidence: stockAnalysis.intelligence.confidence,
          risk: stockAnalysis.intelligence.risk,
          stars: stockAnalysis.intelligence.stars,
          breakout: stockAnalysis.analysis.breakout,
          smartMoney: stockAnalysis.analysis.smartMoney,
          minervini: stockAnalysis.analysis.minervini,
        };
      })
    );

    return results.sort((a, b) => b.score - a.score);
  },
};