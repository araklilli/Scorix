"use client";

import { useWatchlistContext } from "../context/WatchlistContext";
import { useSelectedStockContext } from "../context/SelectedStockContext";

export function WatchlistCard() {
  const { watchlist, toggleWatchlist, isInWatchlist } =
    useWatchlistContext();

  const { selectedSymbol } = useSelectedStockContext();

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">My Watchlist</h3>
          <p className="mt-1 text-sm text-slate-500">
            Favorite stocks are stored locally.
          </p>
        </div>

        <button
          onClick={() => toggleWatchlist(selectedSymbol)}
          className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
            isInWatchlist(selectedSymbol)
              ? "bg-red-500/20 text-red-300"
              : "bg-emerald-500/20 text-emerald-300"
          }`}
        >
          {isInWatchlist(selectedSymbol) ? "★ Remove" : "☆ Add"}
        </button>
      </div>

      {watchlist.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">
          <p className="text-slate-400">Watchlist is empty.</p>
          <p className="mt-2 text-sm text-slate-500">
            Add your first favorite stock.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {watchlist.map((symbol) => (
            <div
              key={symbol}
              className="rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-emerald-400/30"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold">{symbol}</h4>

                <button
                  onClick={() => toggleWatchlist(symbol)}
                  className="text-red-300 transition hover:text-red-200"
                >
                  ✕
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Saved in Local Storage
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}