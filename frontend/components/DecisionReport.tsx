"use client";

import { useEffect, useState } from "react";
import { marketService } from "../services/marketService";
import { analyzeStock } from "../engine/analysisEngine";
import { makeDecision } from "../engine/decisionEngine";
import { generateExplanation } from "../engine/explanationEngine";
import { useSelectedStockContext } from "../context/SelectedStockContext";
import type { ExplanationResult } from "../engine/explanationEngine";

export default function DecisionReport() {
  const { selectedSymbol } = useSelectedStockContext();
  const [report, setReport] = useState<ExplanationResult | null>(null);

  useEffect(() => {
    async function loadReport() {
      const candles = await marketService.getCandles(selectedSymbol);

      const analysis = analyzeStock(candles);
      const decision = makeDecision(analysis);
      const explanation = generateExplanation(analysis, decision);

      setReport(explanation);
    }

    loadReport();
  }, [selectedSymbol]);

  if (!report) return null;

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">{report.title}</h3>
          <p className="mt-1 text-sm text-emerald-300">
            {selectedSymbol} Analysis
          </p>
        </div>
      </div>

      <p className="text-sm text-slate-400">{report.summary}</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-4">
          <p className="text-sm font-bold text-emerald-300">
            Pozitifler
          </p>

          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {report.positives.map((item) => (
              <li key={item}>✅ {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-yellow-400/10 bg-yellow-400/5 p-4">
          <p className="text-sm font-bold text-yellow-300">
            Uyarılar
          </p>

          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {report.warnings.map((item) => (
              <li key={item}>⚠️ {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-red-400/10 bg-red-400/5 p-4">
          <p className="text-sm font-bold text-red-300">
            Negatifler
          </p>

          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {report.negatives.length > 0 ? (
              report.negatives.map((item) => (
                <li key={item}>❌ {item}</li>
              ))
            ) : (
              <li>Belirgin negatif sinyal yok.</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}