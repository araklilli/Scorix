"use client";

import { useScannerContext } from "../context/ScannerContext";

export default function ScannerPanel() {
  const {
    filters,
    setMinScore,
    toggleRating,
    toggleRisk,
    toggleBreakoutOnly,
    toggleSmartMoneyOnly,
    toggleMinerviniOnly,
  } = useScannerContext();

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <h3 className="text-2xl font-bold">AI Scanner</h3>

      <p className="mt-2 text-sm text-slate-500">
        Filter the market using SCORIX Intelligence.
      </p>

      {/* Minimum Score */}

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Minimum Score</p>

          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
            {filters.minScore}
          </span>
        </div>

        <input
          className="mt-4 w-full"
          type="range"
          min={0}
          max={100}
          value={filters.minScore}
          onChange={(e) => setMinScore(Number(e.target.value))}
        />
      </div>

      {/* Rating */}

      <div className="mt-8">
        <p className="mb-3 text-sm font-semibold">Rating</p>

        <div className="space-y-2">
          {["STRONG BUY", "BUY"].map((rating) => (
            <label
              key={rating}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                checked={filters.ratings.includes(rating)}
                onChange={() => toggleRating(rating)}
              />

              <span>{rating}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Risk */}

      <div className="mt-8">
        <p className="mb-3 text-sm font-semibold">Risk</p>

        <div className="space-y-2">
          {["LOW", "MEDIUM", "HIGH"].map((risk) => (
            <label
              key={risk}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                checked={filters.risks.includes(
                  risk as "LOW" | "MEDIUM" | "HIGH"
                )}
                onChange={() =>
                  toggleRisk(risk as "LOW" | "MEDIUM" | "HIGH")
                }
              />

              <span>{risk}</span>
            </label>
          ))}
        </div>
      </div>

      {/* AI Filters */}

      <div className="mt-8 space-y-3">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={filters.breakoutOnly}
            onChange={toggleBreakoutOnly}
          />

          <span>Breakout Only</span>
        </label>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={filters.smartMoneyOnly}
            onChange={toggleSmartMoneyOnly}
          />

          <span>Smart Money Only</span>
        </label>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={filters.minerviniOnly}
            onChange={toggleMinerviniOnly}
          />

          <span>Minervini Only</span>
        </label>
      </div>
    </section>
  );
}