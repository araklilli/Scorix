"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  portfolioService,
  type PortfolioPosition,
} from "../services/portfolioService";

type PortfolioContextValue = {
  positions: PortfolioPosition[];
  addPosition: (
    symbol: string,
    quantity: number,
    averageCost: number
  ) => void;
  removePosition: (id: string) => void;
  clearPortfolio: () => void;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

type PortfolioProviderProps = {
  children: ReactNode;
};

export function PortfolioProvider({ children }: PortfolioProviderProps) {
  const [positions, setPositions] = useState<PortfolioPosition[]>([]);

  useEffect(() => {
    setPositions(portfolioService.getAll());
  }, []);

  function addPosition(
    symbol: string,
    quantity: number,
    averageCost: number
  ) {
    const updated = portfolioService.add(symbol, quantity, averageCost);
    setPositions(updated);
  }

  function removePosition(id: string) {
    const updated = portfolioService.remove(id);
    setPositions(updated);
  }

  function clearPortfolio() {
    portfolioService.clear();
    setPositions([]);
  }

  return (
    <PortfolioContext.Provider
      value={{
        positions,
        addPosition,
        removePosition,
        clearPortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioContext() {
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error(
      "usePortfolioContext must be used inside PortfolioProvider"
    );
  }

  return context;
}