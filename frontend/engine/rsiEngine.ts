export function calculateRSI(
  closes: number[],
  period: number = 14
): number {

  if (closes.length <= period) return 50;

  let gain = 0;
  let loss = 0;

  for (let i = 1; i <= period; i++) {

    const diff = closes[i] - closes[i - 1];

    if (diff > 0) gain += diff;
    else loss -= diff;

  }

  let avgGain = gain / period;
  let avgLoss = loss / period;

  for (let i = period + 1; i < closes.length; i++) {

    const diff = closes[i] - closes[i - 1];

    let currentGain = 0;
    let currentLoss = 0;

    if (diff > 0)
      currentGain = diff;
    else
      currentLoss = -diff;

    avgGain = ((avgGain * (period - 1)) + currentGain) / period;
    avgLoss = ((avgLoss * (period - 1)) + currentLoss) / period;

  }

  if (avgLoss === 0)
    return 100;

  const rs = avgGain / avgLoss;

  return Number((100 - (100 / (1 + rs))).toFixed(2));

}