import type { PortfolioPositionAnalysis } from "./portfolioAnalysisService";

export interface PortfolioHealthResult {
  healthScore: number;
  strength: "VERY HIGH" | "HIGH" | "MEDIUM" | "LOW";
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  diversification: "A" | "B" | "C";
  warnings: string[];
  strengths: string[];
}

export const portfolioHealthService = {
  analyze(positions: PortfolioPositionAnalysis[]): PortfolioHealthResult {
    if (positions.length === 0) {
      return {
        healthScore: 0,
        strength: "LOW",
        riskLevel: "HIGH",
        diversification: "C",
        warnings: ["Portfolio is empty."],
        strengths: [],
      };
    }

    const averageScore = Math.round(
      positions.reduce((sum, item) => sum + item.score, 0) / positions.length
    );

    const highRiskCount = positions.filter((item) => item.risk === "HIGH").length;
    const losingCount = positions.filter((item) => item.profitLoss < 0).length;

    const riskPenalty = highRiskCount * 10;
    const lossPenalty = losingCount * 5;
    const diversificationBonus = positions.length >= 5 ? 10 : positions.length >= 3 ? 5 : 0;

    const healthScore = Math.max(
      0,
      Math.min(100, averageScore - riskPenalty - lossPenalty + diversificationBonus)
    );

    const riskLevel =
      highRiskCount > 0 ? "HIGH" : positions.some((item) => item.risk === "MEDIUM") ? "MEDIUM" : "LOW";

    const strength =
      healthScore >= 90
        ? "VERY HIGH"
        : healthScore >= 80
        ? "HIGH"
        : healthScore >= 65
        ? "MEDIUM"
        : "LOW";

    const diversification =
      positions.length >= 5 ? "A" : positions.length >= 3 ? "B" : "C";

    const warnings: string[] = [];
    const strengths: string[] = [];

    if (highRiskCount > 0) {
      warnings.push(`${highRiskCount} high-risk position detected.`);
    }

    if (losingCount > 0) {
      warnings.push(`${losingCount} position currently has negative P/L.`);
    }

    if (positions.length < 3) {
      warnings.push("Portfolio is concentrated. Add more positions for diversification.");
    }

    if (averageScore >= 85) {
      strengths.push("Average SCORIX score is strong.");
    }

    if (riskLevel === "LOW") {
      strengths.push("Overall risk profile is balanced.");
    }

    if (positions.length >= 3) {
      strengths.push("Portfolio has basic diversification.");
    }

    return {
      healthScore,
      strength,
      riskLevel,
      diversification,
      warnings,
      strengths,
    };
  },
};