"use client";

import { useEffect, useRef } from "react";
import { createChart, ColorType, CandlestickSeries } from "lightweight-charts";
import { useSelectedStockContext } from "../context/SelectedStockContext";
import { useAnalysisContext } from "../context/AnalysisContext";

export default function ScorixChart() {
  const { selectedSymbol } = useSelectedStockContext();
  const { stockAnalysis, isLoading, error } = useAnalysisContext();
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    if (isLoading || error || !stockAnalysis) return;

    let chart: ReturnType<typeof createChart> | null = null;

    chartRef.current.innerHTML = "";

    const chartContainer = chartRef.current;
    const candles = stockAnalysis.candles;

    chart = createChart(chartContainer, {
      layout: {
        background: { type: ColorType.Solid, color: "#05070d" },
        textColor: "#94a3b8",
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.06)" },
        horzLines: { color: "rgba(255,255,255,0.06)" },
      },
      width: chartContainer.clientWidth,
      height: 520,
      rightPriceScale: {
        borderColor: "rgba(255,255,255,0.12)",
      },
      timeScale: {
        borderColor: "rgba(255,255,255,0.12)",
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#34d399",
      downColor: "#f87171",
      borderUpColor: "#34d399",
      borderDownColor: "#f87171",
      wickUpColor: "#34d399",
      wickDownColor: "#f87171",
    });

    candleSeries.setData(candles);
    chart.timeScale().fitContent();

    const handleResize = () => {
      if (!chartRef.current || !chart) return;
      chart.applyOptions({ width: chartRef.current.clientWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart?.remove();
    };
  }, [stockAnalysis, isLoading, error]);

  if (isLoading) return null;
  if (error) return null;
  if (!stockAnalysis) return null;

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">{selectedSymbol} Price Chart</h3>
          <p className="mt-1 text-sm text-slate-500">
            Native candlestick chart · Analysis Context
          </p>
        </div>

        <span className="rounded-full bg-emerald-400/10 px-4 py-2 text-xs text-emerald-300">
          Native Chart
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <div ref={chartRef} />
      </div>
    </section>
  );
}