"use client";

import { useEffect, useState } from "react";
import { useWatchlistContext } from "../context/WatchlistContext";
import { useSelectedStockContext } from "../context/SelectedStockContext";
import {
  watchlistAnalysisService,
  type WatchlistAnalysisResult,
} from "../services/watchlistAnalysisService";

function getRatingStyle(rating: string) {
  if (rating === "STRONG BUY" || rating === "BUY") {
    return "bg-emerald-400/10 text-emerald-300";
  }

  if (rating === "STRONG SELL" || rating === "SELL") {
    return "bg-red-400/10 text-red-300";
  }

  return "bg-yellow-400/10 text-yellow-300";
}

function getRiskStyle(risk: WatchlistAnalysisResult["risk"]) {
  if (risk === "LOW") return "text-emerald-300";
  if (risk === "HIGH") return "text-red-300";
  return "text-yellow-300";
}

export function WatchlistCard() {
  const { watchlist, toggleWatchlist, isInWatchlist } =
    useWatchlistContext();

  const { selectedSymbol, setSelectedSymbol } = useSelectedStockContext();

  const [results, setResults] = useState<WatchlistAnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadWatchlistAnalysis() {
      if (watchlist.length === 0) {
        setResults([]);
        return;
      }

      setIsLoading(true);

      const analysisResults =
        await watchlistAnalysisService.analyzeWatchlist(watchlist);

      setResults(analysisResults);
      setIsLoading(false);
    }

    loadWatchlistAnalysis();
  }, [watchlist]);

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">AI Watchlist</h3>
          <p className="mt-1 text-sm text-slate-500">
            Favorite stocks ranked by SCORIX intelligence.
          </p>
        </div>

        <button
          onClick={() => toggleWatchlist(selectedSymbol)}
          className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
            isInWatchlist(selectedSymbol)
              ? "bg-red-500/20 text-red-300"
              : "bg-emerald-500/20 text-emerald-300"
          }`}
        >
          {isInWatchlist(selectedSymbol) ? "★ Remove" : "☆ Add"}
        </button>
      </div>

      {watchlist.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">
          <p className="text-slate-400">Watchlist is empty.</p>
          <p className="mt-2 text-sm text-slate-500">
            Add your first favorite stock.
          </p>
        </div>
      ) : isLoading ? (
        <div className="rounded-2xl border border-white/10 bg-black/30 p-8 text-center">
          <p className="text-slate-400">Analyzing watchlist...</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {results.map((item) => {
            const isSelected = item.symbol === selectedSymbol;

            return (
              <button
                key={item.symbol}
                onClick={() => setSelectedSymbol(item.symbol)}
                className={`rounded-2xl border p-5 text-left transition ${
                  isSelected
                    ? "border-emerald-400/40 bg-emerald-400/10"
                    : "border-white/10 bg-black/30 hover:border-emerald-400/30 hover:bg-emerald-400/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-black">{item.symbol}</h4>

                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchlist(item.symbol);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation();
                        toggleWatchlist(item.symbol);
                      }
                    }}
                    className="cursor-pointer text-red-300 transition hover:text-red-200"
                  >
                    ✕
                  </span>
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-slate-500">SCORIX Score</p>
                    <p className="mt-1 text-4xl font-black">{item.score}</p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getRatingStyle(
                      item.rating
                    )}`}
                  >
                    {item.rating}
                  </span>
                </div>

                <div className="mt-4 text-lg text-emerald-300">
                  {"★".repeat(item.stars)}
                  {"☆".repeat(5 - item.stars)}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-xs text-slate-500">Confidence</p>
                    <p className="mt-1 font-bold">{item.confidence}%</p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-xs text-slate-500">Risk</p>
                    <p className={`mt-1 font-bold ${getRiskStyle(item.risk)}`}>
                      {item.risk}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  {isSelected ? "Active analysis" : "Click to analyze"}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}