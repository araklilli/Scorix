export default function SearchBar() {
  return (
    <div className="mt-8 flex gap-3">
      <input
        placeholder="Hisse ara: THYAO, ASELS, AKBNK..."
        className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-sm outline-none placeholder:text-slate-600"
      />

      <button className="rounded-2xl bg-white px-6 py-4 text-sm font-bold text-black">
        Ara
      </button>
    </div>
  );
}