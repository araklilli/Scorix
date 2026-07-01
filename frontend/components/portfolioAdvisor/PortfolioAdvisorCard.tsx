"use client";

import { useEffect, useState } from "react";
import { usePortfolioContext } from "../../context/PortfolioContext";
import {
  portfolioAnalysisService,
  type PortfolioPositionAnalysis,
} from "../../services/portfolioAnalysisService";
import {
  portfolioAdvisorService,
  type PortfolioAdvisorResult,
} from "../../services/portfolioAdvisorService";
import PortfolioHealthProgress from "./PortfolioHealthProgress";
import PortfolioGradeBadge from "./PortfolioGradeBadge";

function getRiskStyle(risk: PortfolioAdvisorResult["overallRisk"]) {
  if (risk === "LOW") return "text-emerald-300";
  if (risk === "HIGH") return "text-red-300";
  return "text-yellow-300";
}

function getPerformanceStyle(
  performance: PortfolioAdvisorResult["expectedPerformance"]
) {
  if (performance === "HIGH") return "text-emerald-300";
  if (performance === "LOW") return "text-red-300";
  return "text-yellow-300";
}

export default function PortfolioAdvisorCard() {
  const { positions } = usePortfolioContext();

  const [advisor, setAdvisor] = useState<PortfolioAdvisorResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadAdvisor() {
      if (positions.length === 0) {
        setAdvisor(null);
        return;
      }

      setIsLoading(true);

      const analyzedPositions: PortfolioPositionAnalysis[] =
        await portfolioAnalysisService.analyzePositions(positions);

      const result = portfolioAdvisorService.analyze(analyzedPositions);

      setAdvisor(result);
      setIsLoading(false);
    }

    loadAdvisor();
  }, [positions]);

  if (positions.length === 0) return null;

  if (isLoading) {
    return (
      <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <p className="text-slate-400">SCORIX AI is analyzing portfolio...</p>
      </section>
    );
  }

  if (!advisor) return null;

  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/15 via-white/[0.04] to-black p-6 shadow-2xl shadow-emerald-950/30">
      <div className="mb-6 grid gap-6 lg:grid-cols-3 lg:items-center">
        <div className="lg:col-span-2">
          <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-300">
            SCORIX AI Portfolio Advisor
          </div>

          <h3 className="mt-4 text-3xl font-black">
            Portfolio Health Intelligence
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            AI-ready portfolio evaluation based on score, risk, performance and
            diversification.
          </p>
        </div>

        <PortfolioGradeBadge grade={advisor.grade} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <PortfolioHealthProgress score={advisor.health.healthScore} />

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">Confidence</p>
          <p className="mt-2 text-3xl font-black">{advisor.confidence}%</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">Overall Risk</p>
          <p
            className={`mt-2 text-2xl font-black ${getRiskStyle(
              advisor.overallRisk
            )}`}
          >
            {advisor.overallRisk}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">Expected Performance</p>
          <p
            className={`mt-2 text-2xl font-black ${getPerformanceStyle(
              advisor.expectedPerformance
            )}`}
          >
            {advisor.expectedPerformance}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs text-slate-500">Diversification</p>
          <p className="mt-2 text-3xl font-black text-emerald-300">
            {advisor.health.diversification}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-5">
          <p className="text-sm font-bold text-emerald-300">Strengths</p>

          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {advisor.health.strengths.length > 0 ? (
              advisor.health.strengths.map((item) => (
                <li key={item}>✅ {item}</li>
              ))
            ) : (
              <li>No major strengths detected yet.</li>
            )}
          </ul>
        </div>

        <div className="rounded-2xl border border-yellow-400/10 bg-yellow-400/5 p-5">
          <p className="text-sm font-bold text-yellow-300">Recommendations</p>

          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {advisor.recommendations.map((item) => (
              <li key={item}>⚡ {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-5">
        <div>
          <p className="text-xs text-slate-500">AI Confidence</p>
          <p className="mt-1 text-xl font-black text-emerald-300">
            {"★".repeat(advisor.aiStars)}
            {"☆".repeat(5 - advisor.aiStars)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-500">Average SCORIX Score</p>
          <p className="mt-1 text-2xl font-black">{advisor.averageScore}</p>
        </div>
      </div>
    </section>
  );
}