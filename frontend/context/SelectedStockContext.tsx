"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type SelectedStockContextValue = {
  selectedSymbol: string;
  setSelectedSymbol: (symbol: string) => void;
};

const SelectedStockContext =
  createContext<SelectedStockContextValue | null>(null);

type SelectedStockProviderProps = {
  children: ReactNode;
};

export function SelectedStockProvider({
  children,
}: SelectedStockProviderProps) {
  const [selectedSymbol, setSelectedSymbolState] = useState("THYAO");

  function setSelectedSymbol(symbol: string) {
    setSelectedSymbolState(symbol.trim().toUpperCase());
  }

  return (
    <SelectedStockContext.Provider
      value={{
        selectedSymbol,
        setSelectedSymbol,
      }}
    >
      {children}
    </SelectedStockContext.Provider>
  );
}

export function useSelectedStockContext() {
  const context = useContext(SelectedStockContext);

  if (!context) {
    throw new Error(
      "useSelectedStockContext must be used inside SelectedStockProvider"
    );
  }

  return context;
}