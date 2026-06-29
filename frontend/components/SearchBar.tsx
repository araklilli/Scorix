"use client";

import { useState } from "react";
import { getMarketStocks } from "../services/marketService";

interface SearchBarProps {
  onSearch?: (symbol: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [symbol, setSymbol] = useState("");
  const [error, setError] = useState("");

  const validSymbols = getMarketStocks().map((stock) => stock.symbol);

  function handleSearch() {
    const normalizedSymbol = symbol.trim().toUpperCase();

    if (!normalizedSymbol) {
      setError("Lütfen bir hisse sembolü gir.");
      return;
    }

    if (!validSymbols.includes(normalizedSymbol)) {
      setError("Hisse bulunamadı. Geçerli bir BIST sembolü gir.");
      return;
    }

    setError("");
    onSearch?.(normalizedSymbol);
  }

  return (
    <div className="mt-8">
      <div className="flex gap-3">
        <input
          value={symbol}
          onChange={(e) => {
            setSymbol(e.target.value);
            setError("");
          }}
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

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </div>
  );
}