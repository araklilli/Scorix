import { topStocks } from "../data/stocks";
import { calculateScore } from "../engine/scoreEngine";

function getRiskStyle(risk: string) {
  if (risk === "Düşük") return "bg-emerald-400/10 text-emerald-300";
  if (risk === "Orta") return "bg-yellow-400/10 text-yellow-300";
  return "bg-red-400/10 text-red-300";
}

export default function StockTable() {
  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">En Yüksek Skorlu Hisseler</h3>
          <p className="mt-1 text-sm text-slate-500">
            SCORIX Engine tarafından hesaplanan demo skorlar
          </p>
        </div>

        <span className="rounded-full bg-emerald-400/10 px-4 py-2 text-xs text-emerald-300">
          Engine v1
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <div className="grid grid-cols-12 bg-white/[0.04] px-5 py-3 text-xs font-semibold text-slate-500">
          <div className="col-span-1">#</div>
          <div className="col-span-2">Hisse</div>
          <div className="col-span-2">RSI</div>
          <div className="col-span-2">Hacim</div>
          <div className="col-span-2">Sinyal</div>
          <div className="col-span-2">SCORIX</div>
          <div className="col-span-1 text-right">Risk</div>
        </div>

        <div className="divide-y divide-white/10">
          {topStocks.map((stock, index) => {
            const score = calculateScore(stock);

            return (
              <div
                key={stock.symbol}
                className="grid grid-cols-12 items-center px-5 py-4 transition hover:bg-emerald-400/5"
              >
                <div className="col-span-1 text-slate-500">#{index + 1}</div>

                <div className="col-span-2">
                  <div className="font-bold">{stock.symbol}</div>
                  <div className="text-xs text-slate-500">BIST</div>
                </div>

                <div className="col-span-2 text-sm text-slate-400">
                  RSI {stock.rsi}
                </div>

                <div className="col-span-2 text-sm text-slate-400">
                  {stock.volumeRatio}x
                </div>

                <div className="col-span-2">
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                    {stock.signal}
                  </span>
                </div>

                <div className="col-span-2 flex items-center gap-3">
                  <div className="h-2 flex-1 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-emerald-400"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-sm font-bold">
                    {score}
                  </span>
                </div>

                <div className="col-span-1 text-right">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${getRiskStyle(
                      stock.risk
                    )}`}
                  >
                    {stock.risk}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}