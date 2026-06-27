export default function Sidebar() {
  return (
    <aside className="w-64 bg-black border-r border-white/10 min-h-screen p-6">
      <h1 className="text-3xl font-bold tracking-[0.3em]">
        SCORIX
      </h1>

      <p className="text-slate-400 mt-2 text-sm">
        From Data to Decisions.
      </p>

      <nav className="mt-10 space-y-3">
        <button className="w-full rounded-xl bg-emerald-500/20 text-emerald-400 px-4 py-3 text-left">
          Kontrol Paneli
        </button>

        <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-white/5">
          Tarayıcı
        </button>

        <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-white/5">
          Piyasalar
        </button>

        <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-white/5">
          Portföy
        </button>

        <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-white/5">
          Yapay Zeka
        </button>

        <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-white/5">
          Ayarlar
        </button>
      </nav>
    </aside>
  );
}