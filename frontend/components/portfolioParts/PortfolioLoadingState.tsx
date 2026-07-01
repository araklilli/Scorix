"use client";

export default function PortfolioLoadingState() {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-8 text-center">
      <p className="text-slate-400">Analyzing portfolio...</p>
      <p className="mt-2 text-sm text-slate-500">
        SCORIX is calculating profit, risk and intelligence scores.
      </p>
    </div>
  );
}