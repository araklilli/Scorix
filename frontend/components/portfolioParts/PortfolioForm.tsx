"use client";

import { useState } from "react";
import { useSelectedStockContext } from "../../context/SelectedStockContext";

type PortfolioFormProps = {
  onAddPosition: (
    symbol: string,
    quantity: number,
    averageCost: number
  ) => void;
};

export default function PortfolioForm({ onAddPosition }: PortfolioFormProps) {
  const { selectedSymbol } = useSelectedStockContext();

  const [quantity, setQuantity] = useState("");
  const [averageCost, setAverageCost] = useState("");

  function handleAddPosition() {
    const parsedQuantity = Number(quantity);
    const parsedAverageCost = Number(averageCost);

    if (!selectedSymbol || parsedQuantity <= 0 || parsedAverageCost <= 0) {
      return;
    }

    onAddPosition(selectedSymbol, parsedQuantity, parsedAverageCost);

    setQuantity("");
    setAverageCost("");
  }

  return (
    <>
      <div className="grid gap-3 md:grid-cols-3">
        <input
          value={selectedSymbol}
          readOnly
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-300 outline-none"
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
    </>
  );
}