import { calculateRSI } from "../engine/rsiEngine";
import { calculateEMA } from "../engine/emaEngine";
import { calculateMACD } from "../engine/macdEngine";

const closePrices = [278, 282, 288, 292, 289, 298, 306, 311, 308, 315, 319, 322, 318, 325, 331];

export function runEngineTest() {
  const rsi = calculateRSI(closePrices);
  const ema20 = calculateEMA(closePrices, 20);
  const macd = calculateMACD(closePrices);

  return {
    rsi,
    ema20Last: ema20.at(-1),
    macdLast: macd.macdLine.at(-1),
    signalLast: macd.signalLine.at(-1),
    histogramLast: macd.histogram.at(-1),
  };
}