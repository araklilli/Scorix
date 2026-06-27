import type { Stock } from "../types/stock";

export function calculateScore(stock: Stock): number {
  let score = 0;

  // RSI (20 puan)
  if (stock.rsi >= 50 && stock.rsi <= 70) {
    score += 20;
  } else if (stock.rsi > 70) {
    score += 10;
  }

  // Hacim (20 puan)
  if (stock.volumeRatio >= 2) {
    score += 20;
  } else if (stock.volumeRatio >= 1.5) {
    score += 10;
  }

  // Breakout (25 puan)
  if (stock.breakout) {
    score += 25;
  }

  // Smart Money (20 puan)
  if (stock.smartMoney) {
    score += 20;
  }

  // Minervini (15 puan)
  if (stock.minervini) {
    score += 15;
  }

  return Math.min(score, 100);
}