import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import StatsCard from "../components/StatsCard";
import StockTable from "../components/StockTable";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1 p-6 lg:p-10">
          <Header />

          <section className="mt-8 grid gap-6 xl:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 xl:col-span-2">
              <p className="text-sm text-slate-400">Bugünkü Piyasa Taraması</p>

              <h3 className="mt-3 text-4xl font-bold">
                587 hisse tarandı,{" "}
                <span className="text-emerald-400">7 aday</span> öne çıktı.
              </h3>

              <p className="mt-4 text-sm text-slate-500">
                Demo arayüz. Gerçek veri ve skor motoru sonraki sprintlerde eklenecek.
              </p>

              <SearchBar />
            </div>
          </section>

          <StatsCard />

          <StockTable />
        </section>
      </div>
    </main>
  );
}