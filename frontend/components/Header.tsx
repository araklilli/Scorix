export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">SCORIX Terminal</p>
        <h2 className="mt-1 text-3xl font-bold">Dashboard</h2>
      </div>

      <button className="rounded-full border border-white/10 px-5 py-2 text-sm text-slate-300">
        MVP v0.1
      </button>
    </header>
  );
}