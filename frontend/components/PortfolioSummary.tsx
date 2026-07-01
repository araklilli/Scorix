"use client";

import { useEffect, useState } from "react";
import { usePortfolioContext } from "../context/PortfolioContext";
import {
  portfolioAnalysisService,
  type PortfolioPositionAnalysis,
} from "../services/portfolioAnalysisService";

function formatCurrency(value: number) {
  return `₺${value.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getProfitStyle(value: number) {
  if (value > 0) return "text-emerald-300";
  if (value < 0) return "text-red-300";
  return "text-slate-300";
}

function getRiskStyle(risk: string) {
  if (risk === "LOW") return "text-emerald-300";
  if (risk === "HIGH") return "text-red-300";
  return "text-yellow-300";
}

export default function PortfolioSummary() {
  const { positions } = usePortfolioContext();
  const [analysis, setAnalysis] = useState<PortfolioPositionAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadSummary() {
      if (positions.length === 0) {
        setAnalysis([]);
        return;
      }

      setIsLoading(true);
      const result = await portfolioAnalysisService.analyzePositions(positions);
      setAnalysis(result);
      setIsLoading(false);
    }

    loadSummary();
  }, [positions]);

  if (positions.length === 0) return null;

  const portfolioValue = analysis.reduce(
    (sum, item) => sum + item.positionValue,
    0
  );

  const totalCost = analysis.reduce((sum, item) => sum + item.totalCost, 0);
  const totalProfit = portfolioValue - totalCost;
  const totalProfitPercent =
    totalCost > 0 ? (totalProfit / totalCost) * 100 : 0;

  const averageScore =
    analysis.length > 0
      ? Math.round(
          analysis.reduce((sum, item) => sum + item.score, 0) / analysis.length
        )
      : 0;

  const portfolioRisk =
    analysis.some((item) => item.risk === "HIGH")
      ? "HIGH"
      : analysis.some((item) => item.risk === "MEDIUM")
      ? "MEDIUM"
      : "LOW";

  const aiGrade =
    averageScore >= 90 ? "A+" : averageScore >= 80 ? "A" : averageScore >= 70 ? "B" : "C";

  if (isLoading) {
    return (
      <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <p className="text-slate-400">Analyzing portfolio summary...</p>
      </section>
    );
  }

  return (
    <section className="mt-6 rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-white/[0.03] to-black p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-black">Portfolio Dashboard</h3>
        <p className="mt-1 text-sm text-slate-500">
          Total portfolio intelligence powered by SCORIX.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">Portfolio Value</p>
          <p className="mt-2 text-xl font-black">
            {formatCurrency(portfolioValue)}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">Total Cost</p>
          <p className="mt-2 text-xl font-black">{formatCurrency(totalCost)}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">Total P/L</p>
          <p className={`mt-2 text-xl font-black ${getProfitStyle(totalProfit)}`}>
            {formatCurrency(totalProfit)}
          </p>
          <p className={`mt-1 text-xs font-bold ${getProfitStyle(totalProfitPercent)}`}>
            {totalProfitPercent.toFixed(2)}%
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">Portfolio Score</p>
          <p className="mt-2 text-3xl font-black">{averageScore}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">Portfolio Risk</p>
          <p className={`mt-2 text-xl font-black ${getRiskStyle(portfolioRisk)}`}>
            {portfolioRisk}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">AI Grade</p>
          <p className="mt-2 text-3xl font-black text-emerald-300">
            {aiGrade}
          </p>
        </div>
      </div>
    </section>
  );
}