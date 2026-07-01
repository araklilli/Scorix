"use client";

type PortfolioHealthProgressProps = {
  score: number;
};

function getHealthLabel(score: number) {
  if (score >= 85) return "Excellent Portfolio";
  if (score >= 70) return "Healthy Portfolio";
  if (score >= 55) return "Needs Monitoring";
  return "Needs Attention";
}

function getHealthColor(score: number) {
  if (score >= 80) return "bg-emerald-400";
  if (score >= 60) return "bg-yellow-400";
  return "bg-red-400";
}

function getHealthTextColor(score: number) {
  if (score >= 80) return "text-emerald-300";
  if (score >= 60) return "text-yellow-300";
  return "text-red-300";
}

export default function PortfolioHealthProgress({
  score,
}: PortfolioHealthProgressProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">Health Score</p>

        <span className={`text-sm font-bold ${getHealthTextColor(score)}`}>
          {score}/100
        </span>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full ${getHealthColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>

      <p className={`mt-4 text-lg font-black ${getHealthTextColor(score)}`}>
        {getHealthLabel(score)}
      </p>
    </div>
  );
}