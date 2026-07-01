import { marketService } from "./marketService";
import { stockAnalysisService } from "./stockAnalysisService";
import type { PortfolioPosition } from "./portfolioService";

export interface PortfolioPositionAnalysis {
  id: string;
  symbol: string;
  quantity: number;
  averageCost: number;
  lastPrice: number;
  positionValue: number;
  totalCost: number;
  profitLoss: number;
  profitLossPercent: number;
  score: number;
  rating: string;
  confidence: number;
  risk: "LOW" | "MEDIUM" | "HIGH";
  stars: number;
}

export const portfolioAnalysisService = {
  async analyzePositions(
    positions: PortfolioPosition[]
  ): Promise<PortfolioPositionAnalysis[]> {
    const stocks = marketService.getTopStocks();

    const results = await Promise.all(
      positions.map(async (position) => {
        const stock = stocks.find((item) => item.symbol === position.symbol);

        const stockAnalysis = await stockAnalysisService.analyze(
          position.symbol
        );

        const lastPrice = stock?.price ?? 0;
        const positionValue = position.quantity * lastPrice;
        const totalCost = position.quantity * position.averageCost;
        const profitLoss = positionValue - totalCost;

        const profitLossPercent =
          totalCost > 0 ? (profitLoss / totalCost) * 100 : 0;

        return {
          id: position.id,
          symbol: position.symbol,
          quantity: position.quantity,
          averageCost: position.averageCost,
          lastPrice,
          positionValue,
          totalCost,
          profitLoss,
          profitLossPercent,
          score: stockAnalysis.intelligence.score,
          rating: stockAnalysis.intelligence.rating,
          confidence: stockAnalysis.intelligence.confidence,
          risk: stockAnalysis.intelligence.risk,
          stars: stockAnalysis.intelligence.stars,
        };
      })
    );

    return results;
  },
};