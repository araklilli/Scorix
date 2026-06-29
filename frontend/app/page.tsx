"use client";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import StatsCard from "../components/StatsCard";
import StockTable from "../components/StockTable";
import ScorixChart from "../components/ScorixChart";
import AnalysisPanel from "../components/AnalysisPanel";
import ScorixScoreCard from "../components/ScorixScoreCard";
import DecisionReport from "../components/DecisionReport";
import TopOpportunities from "../components/TopOpportunities";
import { WatchlistCard } from "../components/WatchlistCard";

import { useSelectedStockContext } from "../context/SelectedStockContext";

export default function Home() {
  const { selectedSymbol, setSelectedSymbol } = useSelectedStockContext();

  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1 p-6 lg:p-10">
          <Header />

          <section className="mt-8 grid gap-6 xl:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 xl:col-span-2">
              <p className="text-sm text-slate-400">Aktif Hisse Analizi</p>

              <h3 className="mt-3 text-4xl font-bold">
                <span className="text-emerald-400">{selectedSymbol}</span>{" "}
                analiz ediliyor.
              </h3>

              <p className="mt-4 text-sm text-slate-500">
                Arama kutusundan farklı bir hisse seçerek dashboard akışını
                değiştirebilirsin.
              </p>

              <SearchBar onSearch={setSelectedSymbol} />
            </div>
          </section>

          <StatsCard />

          <ScorixScoreCard />

          <WatchlistCard />

          <TopOpportunities />

          <DecisionReport />

          <AnalysisPanel />

          <ScorixChart />

          <StockTable />
        </section>
      </div>
    </main>
  );
}