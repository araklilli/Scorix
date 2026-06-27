import { calculateEMA } from "./emaEngine";

export type MACDResult = {
  macdLine: number[];
  signalLine: number[];
  histogram: number[];
};

export function calculateMACD(
  closes: number[],
  fastPeriod: number = 12,
  slowPeriod: number = 26,
  signalPeriod: number = 9
): MACDResult {
  if (closes.length === 0) {
    return {
      macdLine: [],
      signalLine: [],
      histogram: [],
    };
  }

  const fastEMA = calculateEMA(closes, fastPeriod);
  const slowEMA = calculateEMA(closes, slowPeriod);

  const macdLine = closes.map((_, index) =>
    Number((fastEMA[index] - slowEMA[index]).toFixed(2))
  );

  const signalLine = calculateEMA(macdLine, signalPeriod);

  const histogram = macdLine.map((value, index) =>
    Number((value - signalLine[index]).toFixed(2))
  );

  return {
    macdLine,
    signalLine,
    histogram,
  };
}