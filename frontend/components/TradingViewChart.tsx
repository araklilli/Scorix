export default function TradingViewChart() {
  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">TradingView Grafik</h3>
          <p className="mt-1 text-sm text-slate-500">
            BIST:THYAO günlük grafik
          </p>
        </div>

        <span className="rounded-full bg-purple-400/10 px-4 py-2 text-xs text-purple-300">
          Live Chart
        </span>
      </div>

      <div className="h-[520px] overflow-hidden rounded-2xl border border-white/10">
        <iframe
          src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_thyao&symbol=BIST%3ATHYAO&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=0&toolbarbg=131722&studies=[]&theme=dark&style=1&timezone=Europe%2FIstanbul&withdateranges=1&hideideas=1&locale=tr"
          className="h-full w-full"
          allowFullScreen
        />
      </div>
    </section>
  );
}