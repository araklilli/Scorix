"use client";

import { useEffect, useState } from "react";
import { usePortfolioContext } from "../context/PortfolioContext";
import { useSelectedStockContext } from "../context/SelectedStockContext";
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

function getRiskStyle(risk: PortfolioPositionAnalysis["risk"]) {
  if (risk === "LOW") return "text-emerald-300";
  if (risk === "HIGH") return "text-red-300";
  return "text-yellow-300";
}

export default function PortfolioCard() {
  const { positions, addPosition, removePosition, clearPortfolio } =
    usePortfolioContext();

  const { selectedSymbol } = useSelectedStockContext();

  const [quantity, setQuantity] = useState("");
  const [averageCost, setAverageCost] = useState("");
  const [analysis, setAnalysis] = useState<PortfolioPositionAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadPortfolioAnalysis() {
      if (positions.length === 0) {
        setAnalysis([]);
        return;
      }

      setIsLoading(true);
      const result = await portfolioAnalysisService.analyzePositions(positions);
      setAnalysis(result);
      setIsLoading(false);
    }

    loadPortfolioAnalysis();
  }, [positions]);

  function handleAddPosition() {
    const parsedQuantity = Number(quantity);
    const parsedAverageCost = Number(averageCost);

    if (!selectedSymbol || parsedQuantity <= 0 || parsedAverageCost <= 0) {
      return;
    }

    addPosition(selectedSymbol, parsedQuantity, parsedAverageCost);

    setQuantity("");
    setAverageCost("");
  }

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Portfolio Intelligence</h3>
          <p className="mt-1 text-sm text-slate-500">
            Track positions with profit, risk and SCORIX intelligence.
          </p>
        </div>

        {positions.length > 0 && (
          <button
            onClick={clearPortfolio}
            className="rounded-2xl bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/30"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <input
          value={selectedSymbol}
          readOnly
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-300 outline-none"
        />

        <input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity / Lot"
          type="number"
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-slate-600"
        />

        <input
          value={averageCost}
          onChange={(e) => setAverageCost(e.target.value)}
          placeholder="Average Cost"
          type="number"
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-slate-600"
        />
      </div>

      <button
        onClick={handleAddPosition}
        className="mt-4 rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-emerald-300"
      >
        Add Position
      </button>

      {positions.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-8 text-center">
          <p className="text-slate-400">Portfolio is empty.</p>
          <p className="mt-2 text-sm text-slate-500">
            Add your first position using the active stock.
          </p>
        </div>
      ) : isLoading ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-8 text-center">
          <p className="text-slate-400">Analyzing portfolio...</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {analysis.map((position) => (
            <div
              key={position.id}
              className="rounded-2xl border border-white/10 bg-black/30 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-black">{position.symbol}</h4>
                  <p className="mt-1 text-xs text-slate-500">
                    {position.quantity} lot
                  </p>
                </div>

                <button
                  onClick={() => removePosition(position.id)}
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
          ))}
        </div>
      )}
    </section>
  );
}