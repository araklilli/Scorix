"use client";

type PortfolioGradeBadgeProps = {
  grade: "A+" | "A" | "B" | "C";
};

function getGradeLabel(grade: PortfolioGradeBadgeProps["grade"]) {
  if (grade === "A+") return "Excellent";
  if (grade === "A") return "Strong";
  if (grade === "B") return "Good";
  return "Needs Improvement";
}

function getGradeStyle(grade: PortfolioGradeBadgeProps["grade"]) {
  if (grade === "A+" || grade === "A") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }

  if (grade === "B") {
    return "border-yellow-400/30 bg-yellow-400/10 text-yellow-300";
  }

  return "border-red-400/30 bg-red-400/10 text-red-300";
}

export default function PortfolioGradeBadge({
  grade,
}: PortfolioGradeBadgeProps) {
  return (
    <div className={`rounded-3xl border p-6 text-right ${getGradeStyle(grade)}`}>
      <p className="text-xs opacity-80">Portfolio Grade</p>

      <p className="mt-2 text-7xl font-black">{grade}</p>

      <p className="mt-2 text-sm font-bold">{getGradeLabel(grade)}</p>
    </div>
  );
}