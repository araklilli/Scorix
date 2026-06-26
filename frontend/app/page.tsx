const topStocks = [
  { symbol: "THYAO", name: "Türk Hava Yolları", score: 94, signal: "Momentum", status: "Güçlü" },
  { symbol: "ASELS", name: "Aselsan", score: 92, signal: "Akıllı Para", status: "Güçlü" },
  { symbol: "AKBNK", name: "Akbank", score: 89, signal: "Golden Cross", status: "Pozitif" },
  { symbol: "ALARK", name: "Alarko Holding", score: 87, signal: "Minervini", status: "Takip" },
  { symbol: "EREGL", name: "Ereğli Demir Çelik", score: 84, signal: "Değer + Momentum", status: "Takip" },
];

const signals = [
  { title: "52H Kırılımı", value: "12 hisse", desc: "Yeni zirve bölgesinde" },
  { title: "Akıllı Para", value: "18 hisse", desc: "Hacim destekli hareket" },
  { title: "Minervini Trend", value: "9 hisse", desc: "Güçlü trend filtresi" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-[0.35em]">SCORIX</h1>
            <p className="mt-2 text-sm text-slate-400">From Data to Decisions.</p>
          </div>

          <button className="rounded-full border border-white/10 px-5 py-2 text-sm text-slate-300 hover:bg-white/10">
            Dashboard v1
          </button>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">
            <p className="text-sm text-slate-400">Bugünkü Piyasa Taraması</p>
            <h2 className="mt-3 text-4xl font-bold">
              587 hisse tarandı, <span className="text-emerald-400">7 güçlü aday</span> bulundu.
            </h2>
            <p className="mt-4 max-w-2xl text-slate-400">
              SCORIX; trend, momentum, hacim, teknik sinyal ve risk kriterlerini birleştirerek
              yatırım karar sürecini açıklanabilir skorlarla destekler.
            </p>

            <div className="mt-8 flex gap-3">
              <input
                placeholder="Hisse ara: THYAO, ASELS, AKBNK..."
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-sm outline-none placeholder:text-slate-600"
              />
              <button className="rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-black">
                Ara
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6">
            <p className="text-sm text-emerald-300">SCORIX AI Score</p>
            <div className="mt-6 text-7xl font-bold">94</div>
            <p className="mt-4 text-sm text-slate-300">
              Günün en güçlü teknik görünümü: <b>THYAO</b>
            </p>
            <div className="mt-6 h-3 rounded-full bg-black/40">
              <div className="h-3 w-[94%] rounded-full bg-emerald-400" />
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 md:grid-cols-3">
          {signals.map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm text-slate-400">{item.title}</p>
              <h3 className="mt-3 text-3xl font-bold">{item.value}</h3>
              <p className="mt-2 text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">En Yüksek Skorlu Hisseler</h2>
              <p className="mt-1 text-sm text-slate-500">Demo veridir. Gerçek veri entegrasyonu sonraki sprintte yapılacak.</p>
            </div>
            <span className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
              Live Demo
            </span>
          </div>

          <div className="space-y-3">
            {topStocks.map((stock, index) => (
              <div
                key={stock.symbol}
                className="grid grid-cols-12 items-center rounded-2xl border border-white/10 bg-black/30 px-5 py-4"
              >
                <div className="col-span-1 text-slate-500">#{index + 1}</div>
                <div className="col-span-3">
                  <div className="font-bold">{stock.symbol}</div>
                  <div className="text-xs text-slate-500">{stock.name}</div>
                </div>
                <div className="col-span-3 text-sm text-slate-300">{stock.signal}</div>
                <div className="col-span-3">
                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-emerald-400"
                      style={{ width: `${stock.score}%` }}
                    />
                  </div>
                </div>
                <div className="col-span-1 text-right font-bold">{stock.score}</div>
                <div className="col-span-1 text-right text-xs text-emerald-300">{stock.status}</div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}