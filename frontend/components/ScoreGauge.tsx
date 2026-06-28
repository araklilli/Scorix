type ScoreGaugeProps = {
  score: number;
  label?: string;
};

export default function ScoreGauge({
  score,
  label = "SCORIX SCORE",
}: ScoreGaugeProps) {
  const safeScore = Math.max(0, Math.min(100, score));
  const circumference = 2 * Math.PI * 54;
  const progress = circumference - (safeScore / 100) * circumference;

  return (
    <div className="relative flex h-44 w-44 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r="54"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="12"
          fill="transparent"
        />

        <circle
          cx="70"
          cy="70"
          r="54"
          stroke="rgb(52, 211, 153)"
          strokeWidth="12"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
        />
      </svg>

      <div className="absolute text-center">
        <div className="text-5xl font-black">{safeScore}</div>
        <div className="mt-1 text-[10px] font-semibold tracking-[0.25em] text-emerald-300">
          {label}
        </div>
      </div>
    </div>
  );
}