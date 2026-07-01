"use client";

export default function PortfolioEmptyState() {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10 text-3xl">
        📊
      </div>

      <h4 className="mt-5 text-xl font-bold text-white">
        Your portfolio is empty
      </h4>

      <p className="mt-3 text-sm leading-6 text-slate-400">
        Add your first position to start tracking profit, loss, portfolio
        performance and AI-powered SCORIX insights.
      </p>

      <div className="mt-6 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-300">
        Portfolio Intelligence Ready
      </div>
    </div>
  );
}