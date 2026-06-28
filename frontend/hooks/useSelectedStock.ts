"use client";

import { useState } from "react";

export function useSelectedStock(defaultSymbol = "THYAO") {
  const [selectedSymbol, setSelectedSymbol] = useState(defaultSymbol);

  return {
    selectedSymbol,
    setSelectedSymbol,
  };
}