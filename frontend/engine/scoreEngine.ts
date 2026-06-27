export type StockData = {
  symbol: string;
  rsi: number;
  volumeRatio: number;
  breakout: boolean;
  smartMoney: boolean;
  minervini: boolean;
};

export function calculateScore(stock: StockData): number {
  let score = 0;

  // RSI
  if (stock.rsi >= 50 && stock.rsi <= 70) score += 20;
  else if (stock.rsi > 70) score += 10;

  // Hacim
  if (stock.volumeRatio >= 2) score += 20;
  else if (stock.volumeRatio >= 1.5) score += 10;

  // Breakout
  if (stock.breakout) score += 25;

  // Smart Money
  if (stock.smartMoney) score += 20;

  // Minervini
  if (stock.minervini) score += 15;

  return score;
}