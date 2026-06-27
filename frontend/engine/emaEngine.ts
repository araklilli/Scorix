export function calculateEMA(
  closes: number[],
  period: number = 20
): number[] {
  if (closes.length === 0) return [];

  const multiplier = 2 / (period + 1);
  const emaValues: number[] = [];

  let ema = closes[0];
  emaValues.push(Number(ema.toFixed(2)));

  for (let i = 1; i < closes.length; i++) {
    ema = (closes[i] - ema) * multiplier + ema;
    emaValues.push(Number(ema.toFixed(2)));
  }

  return emaValues;
}