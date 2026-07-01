"use client";

import { useState } from "react";
import { usePortfolioContext } from "../context/PortfolioContext";
import { useSelectedStockContext } from "../context/SelectedStockContext";

export default function PortfolioCard() {
  const { positions, addPosition, removePosition, clearPortfolio } =
    usePortfolioContext();

  const { selectedSymbol } = useSelectedStockContext();

  const [quantity, setQuantity] = useState("");
  const [averageCost, setAverageCost] = useState("");

  function handleAddPosition() {
    const parsedQuantity = Number(quantity);
    const parsedAverageCost = Number(averageCost);

    if (!selectedSymbol || parsedQuantity <= 0 || parsedAverageCost <= 0) {
      return;
    }

    addPosition(selectedSymbol, parsedQuantity, parsedAverageCost);

    setQuantity("");
    setAverageCost("");
  }

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">My Portfolio</h3>
          <p className="mt-1 text-sm text-slate-500">
            Track your positions using SCORIX portfolio engine.
          </p>
        </div>

        {positions.length > 0 && (
          <button
            onClick={clearPortfolio}
            className="rounded-2xl bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/30"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <input
          value={selectedSymbol}
          readOnly
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none text-slate-300"
        />

        <input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity / Lot"
          type="number"
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-slate-600"
        />

        <input
          value={averageCost}
          onChange={(e) => setAverageCost(e.target.value)}
          placeholder="Average Cost"
          type="number"
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-slate-600"
        />
      </div>

      <button
        onClick={handleAddPosition}
        className="mt-4 rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-emerald-300"
      >
        Add Position
      </button>

      {positions.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-8 text-center">
          <p className="text-slate-400">Portfolio is empty.</p>
          <p className="mt-2 text-sm text-slate-500">
            Add your first position using the active stock.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {positions.map((position) => (
            <div
              key={position.id}
              className="rounded-2xl border border-white/10 bg-black/30 p-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-black">{position.symbol}</h4>

                <button
                  onClick={() => removePosition(position.id)}
                  className="text-red-300 transition hover:text-red-200"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-xs text-slate-500">Quantity</p>
                  <p className="mt-1 font-bold">{position.quantity}</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-xs text-slate-500">Avg. Cost</p>
                  <p className="mt-1 font-bold">
                    ₺{position.averageCost.toFixed(2)}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Saved in Local Storage
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}