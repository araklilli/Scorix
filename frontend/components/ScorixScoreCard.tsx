"use client";

import { useEffect, useState } from "react";
import { marketService } from "../services/marketService";
import { analyzeStock } from "../engine/analysisEngine";
import { calculateIntelligence } from "../engine/intelligenceEngine";
import type { IntelligenceResult } from "../engine/intelligenceEngine";
import ScoreGauge from "./ScoreGauge";

function getRatingStyle(rating: IntelligenceResult["rating"]) {
  if (rating === "STRONG BUY" || rating === "BUY") {
    return "text-emerald-300";
  }

  if (rating === "STRONG SELL" || rating === "SELL") {
    return "text-red-300";
  }

  return "text-yellow-300";
}

function getRiskStyle(risk: IntelligenceResult["risk"]) {
  if (risk === "LOW") return "text-emerald-300";
  if (risk === "HIGH") return "text-red-300";
  return "text-yellow-300";
}

export default function ScorixScoreCard() {
  const [result, setResult] = useState<IntelligenceResult | null>(null);

  useEffect(() => {
    async function loadScore() {
      const candles = await marketService.getCandles("THYAO");
      const analysis = analyzeStock(candles);
      const intelligence = calculateIntelligence(analysis);

      setResult(intelligence);
    }

    loadScore();
  }, []);

  if (!result) return null;

  return (
    <section className="mt-6 overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/15 via-white/[0.04] to-black p-8 shadow-2xl shadow-emerald-950/40">
      <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-300">
            SCORIX Intelligence Core
          </div>

          <h3 className="mt-5 text-5xl font-black tracking-tight">
            AI Powered Stock Decision
          </h3>

          <p className="mt-4 text-sm leading-6 text-slate-400">
            RSI, EMA, MACD, Volume, Breakout, Smart Money ve Minervini
            motorları tek merkezde birleştirilerek nihai SCORIX skoru üretilir.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {["RSI", "EMA", "MACD", "VOLUME", "BREAKOUT", "SMART MONEY", "MINERVINI"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-slate-300"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>

        <div className="flex justify-center xl:justify-end">
          <ScoreGauge score={result.score} />
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
          <p className="text-xs text-slate-500">Rating</p>
          <p className={`mt-2 text-2xl font-black ${getRatingStyle(result.rating)}`}>
            {result.rating}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
          <p className="text-xs text-slate-500">Confidence</p>
          <p className="mt-2 text-2xl font-black">{result.confidence}%</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
          <p className="text-xs text-slate-500">Risk</p>
          <p className={`mt-2 text-2xl font-black ${getRiskStyle(result.risk)}`}>
            {result.risk}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
          <p className="text-xs text-slate-500">Stars</p>
          <p className="mt-2 text-2xl font-black text-emerald-300">
            {"★".repeat(result.stars)}
            {"☆".repeat(5 - result.stars)}
          </p>
        </div>
      </div>
    </section>
  );
}