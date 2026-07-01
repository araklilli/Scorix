import { marketService } from "./marketService";
import { stockAnalysisService } from "./stockAnalysisService";
import { scannerCacheService } from "./scannerCacheService";

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
  async scanMarket(forceRefresh = false): Promise<ScanResult[]> {
    if (!forceRefresh) {
      const cachedResults = scannerCacheService.get();

      if (cachedResults) {
        return cachedResults;
      }
    }

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

    const sortedResults = results.sort((a, b) => b.score - a.score);

    scannerCacheService.set(sortedResults);

    return sortedResults;
  },

  clearCache() {
    scannerCacheService.clear();
  },
};