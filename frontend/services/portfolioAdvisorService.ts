import type { PortfolioPositionAnalysis } from "./portfolioAnalysisService";
import {
  portfolioHealthService,
  type PortfolioHealthResult,
} from "./portfolioHealthService";

export interface PortfolioAdvisorResult {
  grade: "A+" | "A" | "B" | "C";
  confidence: number;
  overallRisk: "LOW" | "MEDIUM" | "HIGH";
  expectedPerformance: "HIGH" | "MEDIUM" | "LOW";
  averageScore: number;
  aiStars: number;
  health: PortfolioHealthResult;
  recommendations: string[];
}

function calculateAverageScore(positions: PortfolioPositionAnalysis[]) {
  if (positions.length === 0) return 0;

  return Math.round(
    positions.reduce((sum, item) => sum + item.score, 0) / positions.length
  );
}

function calculateGrade(healthScore: number): "A+" | "A" | "B" | "C" {
  if (healthScore >= 90) return "A+";
  if (healthScore >= 80) return "A";
  if (healthScore >= 65) return "B";
  return "C";
}

function calculateExpectedPerformance(
  healthScore: number,
  riskLevel: "LOW" | "MEDIUM" | "HIGH"
): "HIGH" | "MEDIUM" | "LOW" {
  if (healthScore >= 85 && riskLevel === "LOW") return "HIGH";
  if (healthScore >= 70 && riskLevel !== "HIGH") return "MEDIUM";
  return "LOW";
}

function buildRecommendations(
  positions: PortfolioPositionAnalysis[],
  averageScore: number,
  health: PortfolioHealthResult
) {
  const recommendations: string[] = [];

  if (averageScore >= 85) {
    recommendations.push("Portfolio is technically strong.");
  } else if (averageScore >= 70) {
    recommendations.push("Portfolio quality is acceptable but can be improved.");
  } else {
    recommendations.push("Portfolio score is weak. Review low-scoring positions.");
  }

  recommendations.push(...health.strengths);
  recommendations.push(...health.warnings);

  if (positions.length < 3) {
    recommendations.push("Portfolio is concentrated. Consider adding diversification.");
  }

  return Array.from(new Set(recommendations));
}

export const portfolioAdvisorService = {
  analyze(positions: PortfolioPositionAnalysis[]): PortfolioAdvisorResult {
    const averageScore = calculateAverageScore(positions);
    const health = portfolioHealthService.analyze(positions);

    const grade = calculateGrade(health.healthScore);
    const expectedPerformance = calculateExpectedPerformance(
      health.healthScore,
      health.riskLevel
    );

    const confidence = Math.min(98, Math.max(50, health.healthScore + 5));
    const aiStars = Math.max(1, Math.min(5, Math.round(health.healthScore / 20)));

    return {
      grade,
      confidence,
      overallRisk: health.riskLevel,
      expectedPerformance,
      averageScore,
      aiStars,
      health,
      recommendations: buildRecommendations(positions, averageScore, health),
    };
  },
};