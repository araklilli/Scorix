import type { AnalysisResult } from "./analysisEngine";
import type { DecisionResult } from "./decisionEngine";

export interface ExplanationResult {
  title: string;
  summary: string;
  positives: string[];
  warnings: string[];
  negatives: string[];
}

export function generateExplanation(
  analysis: AnalysisResult,
  decision: DecisionResult
): ExplanationResult {
  const positives: string[] = [];
  const warnings: string[] = [];
  const negatives: string[] = [];

  if (analysis.rsi >= 50 && analysis.rsi <= 70) {
    positives.push(`RSI ${analysis.rsi} seviyesinde ve sağlıklı momentum bölgesinde.`);
  } else if (analysis.rsi > 70) {
    warnings.push(`RSI ${analysis.rsi} ile aşırı alım bölgesine yaklaşmış görünüyor.`);
  } else {
    negatives.push(`RSI ${analysis.rsi} ile zayıf momentum bölgesinde.`);
  }

  if (analysis.emaTrend === "BULLISH") {
    positives.push("EMA trendi pozitif. Kısa vadeli ortalama uzun vadeli ortalamanın üzerinde.");
  } else if (analysis.emaTrend === "BEARISH") {
    negatives.push("EMA trendi negatif. Fiyat yapısı zayıf görünüyor.");
  } else {
    warnings.push("EMA trendi nötr. Net bir yön oluşmamış.");
  }

  if (analysis.macdTrend === "POSITIVE") {
    positives.push("MACD pozitif bölgede. Trend momentumu destekleniyor.");
  } else if (analysis.macdTrend === "NEGATIVE") {
    negatives.push("MACD negatif bölgede. Momentum zayıflıyor.");
  } else {
    warnings.push("MACD nötr bölgede. Güçlü sinyal üretmiyor.");
  }

  if (analysis.volumeTrend === "STRONG") {
    positives.push(`Hacim güçlü. Güncel hacim ortalamanın ${analysis.volumeRatio} katı.`);
  } else if (analysis.volumeTrend === "WEAK") {
    negatives.push("Hacim zayıf. Hareketin teyidi sınırlı.");
  } else {
    warnings.push(`Hacim normal seviyede. Volume ratio: ${analysis.volumeRatio}x.`);
  }

  if (analysis.breakout) {
    positives.push(`Direnç kırılımı tespit edildi. Referans direnç: ${analysis.resistance}.`);
  } else {
    warnings.push(`Henüz net breakout yok. Referans direnç: ${analysis.resistance}.`);
  }

  if (analysis.smartMoney) {
    positives.push(`Smart Money sinyali pozitif. Skor: ${analysis.smartMoneyScore}.`);
  } else {
    warnings.push(`Smart Money sinyali henüz güçlü değil. Skor: ${analysis.smartMoneyScore}.`);
  }

  if (analysis.minervini) {
    positives.push(`Minervini Trend Template pozitif. Skor: ${analysis.minerviniScore}.`);
  } else {
    warnings.push(`Minervini kriterleri tam oluşmadı. Skor: ${analysis.minerviniScore}.`);
  }

  return {
    title: "SCORIX AI Decision Report",
    summary: `${decision.decision} kararı, ${decision.score}/100 SCORIX skoru ve %${decision.confidence} güven seviyesiyle üretildi. Risk seviyesi: ${decision.risk}.`,
    positives,
    warnings,
    negatives,
  };
}