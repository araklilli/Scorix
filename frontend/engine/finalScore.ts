import type { Stock, ScoreBreakdown } from "../types/stock";
import { calculateScore } from "./scoreEngine";

export function calculateFinalScore(stock: Stock): ScoreBreakdown {
  const rsiScore =
    stock.rsi >= 50 && stock.rsi <= 70 ? 20 : stock.rsi > 70 ? 10 : 0;

  const volumeScore =
    stock.volumeRatio >= 2 ? 20 : stock.volumeRatio >= 1.5 ? 10 : 0;

  const breakoutScore = stock.breakout ? 25 : 0;
  const smartMoneyScore = stock.smartMoney ? 20 : 0;
  const minerviniScore = stock.minervini ? 15 : 0;

  const total = calculateScore(stock);

  return {
    rsi: rsiScore,
    volume: volumeScore,
    breakout: breakoutScore,
    smartMoney: smartMoneyScore,
    minervini: minerviniScore,
    total,
  };
}