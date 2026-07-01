"use client";

import { useEffect, useState } from "react";
import { usePortfolioContext } from "../context/PortfolioContext";
import {
  portfolioAnalysisService,
  type PortfolioPositionAnalysis,
} from "../services/portfolioAnalysisService";

import PortfolioForm from "./portfolioParts/PortfolioForm";
import PortfolioEmptyState from "./portfolioParts/PortfolioEmptyState";
import PortfolioLoadingState from "./portfolioParts/PortfolioLoadingState";
import PortfolioPositionCard from "./portfolioParts/PortfolioPositionCard";

export default function PortfolioCard() {
  const { positions, addPosition, removePosition, clearPortfolio } =
    usePortfolioContext();

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

  function handleAddPosition(
    symbol: string,
    quantity: number,
    averageCost: number
  ) {
    addPosition(symbol, quantity, averageCost);
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

      <PortfolioForm onAddPosition={handleAddPosition} />

      {positions.length === 0 ? (
        <PortfolioEmptyState />
      ) : isLoading ? (
        <PortfolioLoadingState />
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {analysis.map((position) => (
            <PortfolioPositionCard
              key={position.id}
              position={position}
              onRemove={removePosition}
            />
          ))}
        </div>
      )}
    </section>
  );
}