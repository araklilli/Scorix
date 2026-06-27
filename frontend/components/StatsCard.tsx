export default function StatsCard() {
  const stats = [
    {
      title: "En Yüksek Skor",
      value: "94",
      desc: "THYAO / Momentum",
      highlight: true,
    },
    {
      title: "Piyasa Durumu",
      value: "Bullish",
      desc: "Trend pozitif izleniyor.",
      highlight: false,
    },
    {
      title: "52H Kırılımı",
      value: "12 hisse",
      desc: "Aktif sinyal sayısı",
      highlight: false,
    },
    {
      title: "Akıllı Para",
      value: "18 hisse",
      desc: "Aktif sinyal sayısı",
      highlight: false,
    },
    {
      title: "Minervini Trend",
      value: "9 hisse",
      desc: "Aktif sinyal sayısı",
      highlight: false,
    },
  ];

  return (
    <section className="mt-6 grid gap-6 lg:grid-cols-3">
      {stats.map((item) => (
        <div
          key={item.title}
          className={`rounded-3xl border p-6 ${
            item.highlight
              ? "border-emerald-400/20 bg-emerald-400/10"
              : "border-white/10 bg-white/[0.03]"
          }`}
        >
          <p className={item.highlight ? "text-sm text-emerald-300" : "text-sm text-slate-400"}>
            {item.title}
          </p>
          <div className={`mt-3 font-bold ${item.value === "94" ? "text-6xl" : "text-3xl"}`}>
            {item.value}
          </div>
          <p className="mt-3 text-sm text-slate-500">{item.desc}</p>
        </div>
      ))}
    </section>
  );
}