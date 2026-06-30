"use client";

import { useScannerContext } from "../context/ScannerContext";
import { useSelectedStockContext } from "../context/SelectedStockContext";

function getRatingStyle(rating: string) {
  if (rating === "STRONG BUY" || rating === "BUY") {
    return "bg-emerald-400/10 text-emerald-300";
  }

  if (rating === "STRONG SELL" || rating === "SELL") {
    return "bg-red-400/10 text-red-300";
  }

  return "bg-yellow-400/10 text-yellow-300";
}

function getRiskStyle(risk: string) {
  if (risk === "LOW") return "text-emerald-300";
  if (risk === "HIGH") return "text-red-300";
  return "text-yellow-300";
}

export default function ScannerResults() {
  const { filteredResults, isLoading } = useScannerContext();
  const { selectedSymbol, setSelectedSymbol } = useSelectedStockContext();

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Scanner Results</h3>
          <p className="mt-2 text-sm text-slate-500">
            Filtered opportunities ranked by SCORIX Score.
          </p>
        </div>

        <span className="rounded-full bg-blue-400/10 px-4 py-2 text-xs text-blue-300">
          {filteredResults.length} results
        </span>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-white/10 bg-black/30 p-8 text-center">
          <p className="text-slate-400">Scanning market...</p>
        </div>
      ) : filteredResults.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">
          <p className="text-slate-400">No stocks match these filters.</p>
          <p className="mt-2 text-sm text-slate-500">
            Try lowering the minimum score or removing filters.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredResults.map((stock, index) => {
            const isSelected = stock.symbol === selectedSymbol;

            return (
              <button
                key={stock.symbol}
                onClick={() => setSelectedSymbol(stock.symbol)}
                className={`grid w-full grid-cols-12 items-center rounded-2xl border px-5 py-4 text-left transition ${
                  isSelected
                    ? "border-emerald-400/40 bg-emerald-400/10"
                    : "border-white/10 bg-black/30 hover:border-emerald-400/30 hover:bg-emerald-400/5"
                }`}
              >
                <div className="col-span-1 text-slate-500">#{index + 1}</div>

                <div className="col-span-3">
                  <div className="flex items-center gap-2 font-bold">
                    {stock.symbol}
                    {isSelected && (
                      <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] text-emerald-300">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500">{stock.name}</div>
                </div>

                <div className="col-span-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getRatingStyle(
                      stock.rating
                    )}`}
                  >
                    {stock.rating}
                  </span>
                </div>

                <div className="col-span-2">
                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-emerald-400"
                      style={{ width: `${stock.score}%` }}
                    />
                  </div>
                </div>

                <div className="col-span-1 text-right text-lg font-black">
                  {stock.score}
                </div>

                <div className="col-span-1 text-right text-sm text-emerald-300">
                  {"★".repeat(stock.stars)}
                </div>

                <div
                  className={`col-span-2 text-right text-sm font-bold ${getRiskStyle(
                    stock.risk
                  )}`}
                >
                  {stock.risk}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}