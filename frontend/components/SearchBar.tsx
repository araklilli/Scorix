"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch?: (symbol: string) => void;
}

export default function SearchBar({
  onSearch,
}: SearchBarProps) {
  const [symbol, setSymbol] = useState("");

  function handleSearch() {
    if (!symbol.trim()) return;

    onSearch?.(symbol.trim().toUpperCase());
  }

  return (
    <div className="mt-8 flex gap-3">
      <input
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder="Hisse ara: THYAO, ASELS, AKBNK..."
        className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-sm outline-none placeholder:text-slate-600"
      />

      <button
        onClick={handleSearch}
        className="rounded-2xl bg-white px-6 py-4 text-sm font-bold text-black"
      >
        Ara
      </button>
    </div>
  );
}