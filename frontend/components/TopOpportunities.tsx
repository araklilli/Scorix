"use client";

import { useEffect, useState } from "react";
import { scannerService, type ScanResult } from "../services/scannerService";

function getRatingStyle(rating: string) {
  if (rating === "STRONG BUY" || rating === "BUY") {
    return "text-emerald-300";
  }

  if (rating === "STRONG SELL" || rating === "SELL") {
    return "text-red-300";
  }

  return "text-yellow-300";
}

export default function TopOpportunities() {
  const [results, setResults] = useState<ScanResult[]>([]);

  useEffect(() => {
    async function loadResults() {
      const scanResults = await scannerService.scanMarket();
      setResults(scanResults);
    }

    loadResults();
  }, []);

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Top Opportunities</h3>
          <p className="mt-1 text-sm text-slate-500">
            Scanner Core tarafından skorlanan en güçlü hisseler
          </p>
        </div>

        <span className="rounded-full bg-emerald-400/10 px-4 py-2 text-xs text-emerald-300">
          Scanner Core
        </span>
      </div>

      <div className="space-y-3">
        {results.map((stock, index) => (
          <div
            key={stock.symbol}
            className="grid grid-cols-12 items-center rounded-2xl border border-white/10 bg-black/30 px-5 py-4 transition hover:border-emerald-400/30 hover:bg-emerald-400/5"
          >
            <div className="col-span-1 text-slate-500">#{index + 1}</div>

            <div className="col-span-3">
              <div className="font-bold">{stock.symbol}</div>
              <div className="text-xs text-slate-500">{stock.name}</div>
            </div>

            <div className="col-span-2">
              <p className={`text-sm font-bold ${getRatingStyle(stock.rating)}`}>
                {stock.rating}
              </p>
              <p className="text-xs text-slate-500">{stock.stars} / 5 Stars</p>
            </div>

            <div className="col-span-3">
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

            <div className="col-span-2 text-right text-xs text-slate-400">
              Confidence {stock.confidence}% · {stock.risk}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}