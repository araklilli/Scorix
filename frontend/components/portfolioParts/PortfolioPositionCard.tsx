"use client";

import type { PortfolioPositionAnalysis } from "../../services/portfolioAnalysisService";

type PortfolioPositionCardProps = {
  position: PortfolioPositionAnalysis;
  onRemove: (id: string) => void;
};

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

function getRiskStyle(risk: PortfolioPositionAnalysis["risk"]) {
  if (risk === "LOW") return "text-emerald-300";
  if (risk === "HIGH") return "text-red-300";
  return "text-yellow-300";
}

export default function PortfolioPositionCard({
  position,
  onRemove,
}: PortfolioPositionCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xl font-black">{position.symbol}</h4>
          <p className="mt-1 text-xs text-slate-500">
            {position.quantity} lot
          </p>
        </div>

        <button
          onClick={() => onRemove(position.id)}
          className="text-red-300 transition hover:text-red-200"
        >
          ✕
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-xs text-slate-500">Last Price</p>
          <p className="mt-1 font-bold">
            {formatCurrency(position.lastPrice)}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-xs text-slate-500">Avg. Cost</p>
          <p className="mt-1 font-bold">
            {formatCurrency(position.averageCost)}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-xs text-slate-500">Position Value</p>
          <p className="mt-1 font-bold">
            {formatCurrency(position.positionValue)}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-xs text-slate-500">Total Cost</p>
          <p className="mt-1 font-bold">
            {formatCurrency(position.totalCost)}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs text-slate-500">Profit / Loss</p>

        <p
          className={`mt-1 text-2xl font-black ${getProfitStyle(
            position.profitLoss
          )}`}
        >
          {formatCurrency(position.profitLoss)}
        </p>

        <p
          className={`mt-1 text-sm font-bold ${getProfitStyle(
            position.profitLossPercent
          )}`}
        >
          {position.profitLossPercent.toFixed(2)}%
        </p>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-xs text-slate-500">SCORIX</p>
          <p className="mt-1 font-black">{position.score}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-xs text-slate-500">Risk</p>
          <p className={`mt-1 font-bold ${getRiskStyle(position.risk)}`}>
            {position.risk}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-xs text-slate-500">Confidence</p>
          <p className="mt-1 font-bold">{position.confidence}%</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-emerald-300">
          {"★".repeat(position.stars)}
          {"☆".repeat(5 - position.stars)}
        </p>

        <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-bold text-yellow-300">
          {position.rating}
        </span>
      </div>
    </div>
  );
}