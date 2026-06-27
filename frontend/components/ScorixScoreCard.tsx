"use client";

import { useEffect, useState } from "react";
import { marketService } from "../services/marketService";
import { analyzeStock } from "../engine/analysisEngine";
import { calculateIntelligence } from "../engine/intelligenceEngine";
import type { IntelligenceResult } from "../engine/intelligenceEngine";

function getRatingStyle(rating: IntelligenceResult["rating"]) {
  if (rating === "STRONG BUY" || rating === "BUY") {
    return "text-emerald-300";
  }

  if (rating === "STRONG SELL" || rating === "SELL") {
    return "text-red-300";
  }

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
    <section className="mt-6 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-emerald-300">SCORIX Intelligence Core</p>
          <h3 className="mt-2 text-4xl font-bold">SCORIX SCORE</h3>
          <p className="mt-3 text-sm text-slate-400">
            RSI · EMA · MACD · Volume · Breakout · Smart Money · Minervini
          </p>
        </div>

        <div className="text-right">
          <div className="text-7xl font-black">{result.score}</div>
          <p className="text-sm text-slate-400">/ 100</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">Rating</p>
          <p className={`mt-2 text-2xl font-bold ${getRatingStyle(result.rating)}`}>
            {result.rating}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">Confidence</p>
          <p className="mt-2 text-2xl font-bold">{result.confidence}%</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">Risk</p>
          <p className="mt-2 text-2xl font-bold">{result.risk}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">Stars</p>
          <p className="mt-2 text-2xl font-bold">
            {"★".repeat(result.stars)}
            {"☆".repeat(5 - result.stars)}
          </p>
        </div>
      </div>
    </section>
  );
}