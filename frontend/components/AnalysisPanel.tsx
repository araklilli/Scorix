"use client";

import { useEffect, useState } from "react";
import { marketService } from "../services/marketService";
import { analyzeStock } from "../engine/analysisEngine";
import { makeDecision } from "../engine/decisionEngine";
import type { AnalysisResult } from "../engine/analysisEngine";
import type { DecisionResult } from "../engine/decisionEngine";

type AnalysisView = {
  analysis: AnalysisResult;
  decision: DecisionResult;
};

function getDecisionStyle(decision: DecisionResult["decision"]) {
  if (decision === "STRONG BUY" || decision === "BUY") {
    return "bg-emerald-400/10 text-emerald-300";
  }

  if (decision === "STRONG SELL" || decision === "SELL") {
    return "bg-red-400/10 text-red-300";
  }

  return "bg-yellow-400/10 text-yellow-300";
}

function getVolumeStyle(volumeTrend: AnalysisResult["volumeTrend"]) {
  if (volumeTrend === "STRONG") return "text-emerald-300";
  if (volumeTrend === "WEAK") return "text-red-300";
  return "text-yellow-300";
}

function getBreakoutStyle(strength: AnalysisResult["breakoutStrength"]) {
  if (strength === "STRONG") return "text-emerald-300";
  if (strength === "NORMAL") return "text-yellow-300";
  return "text-slate-400";
}

function getSmartMoneyStyle(isSmartMoney: boolean) {
  return isSmartMoney ? "text-emerald-300" : "text-slate-400";
}

function getMinerviniStyle(isMinervini: boolean) {
  return isMinervini ? "text-emerald-300" : "text-slate-400";
}

export default function AnalysisPanel() {
  const [view, setView] = useState<AnalysisView | null>(null);

  useEffect(() => {
    async function loadAnalysis() {
      const candles = await marketService.getCandles("THYAO");
      const analysis = analyzeStock(candles);
      const decision = makeDecision(analysis);

      setView({
        analysis,
        decision,
      });
    }

    loadAnalysis();
  }, []);

  if (!view) return null;

  const { analysis, decision } = view;

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">SCORIX Analiz Paneli</h3>
          <p className="mt-1 text-sm text-slate-500">
            RSI · EMA · MACD · Volume · Breakout · Smart Money · Minervini
          </p>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-xs ${getDecisionStyle(
            decision.decision
          )}`}
        >
          {decision.decision} · {decision.confidence}%
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-4 xl:grid-cols-9">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">RSI</p>
          <p className="mt-2 text-2xl font-bold">{analysis.rsi}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">EMA Trend</p>
          <p className="mt-2 text-xl font-bold">{analysis.emaTrend}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">MACD Trend</p>
          <p className="mt-2 text-xl font-bold">{analysis.macdTrend}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">Volume</p>
          <p
            className={`mt-2 text-2xl font-bold ${getVolumeStyle(
              analysis.volumeTrend
            )}`}
          >
            {analysis.volumeRatio}x
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">Breakout</p>
          <p
            className={`mt-2 text-xl font-bold ${getBreakoutStyle(
              analysis.breakoutStrength
            )}`}
          >
            {analysis.breakout ? "YES" : "NO"}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {analysis.breakoutStrength}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">Smart Money</p>
          <p
            className={`mt-2 text-xl font-bold ${getSmartMoneyStyle(
              analysis.smartMoney
            )}`}
          >
            {analysis.smartMoney ? "YES" : "NO"}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Score {analysis.smartMoneyScore}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">Minervini</p>
          <p
            className={`mt-2 text-xl font-bold ${getMinerviniStyle(
              analysis.minervini
            )}`}
          >
            {analysis.minervini ? "YES" : "NO"}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Score {analysis.minerviniScore}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">Resistance</p>
          <p className="mt-2 text-xl font-bold">{analysis.resistance}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">Confidence</p>
          <p className="mt-2 text-2xl font-bold">{decision.confidence}%</p>
        </div>
      </div>
    </section>
  );
}