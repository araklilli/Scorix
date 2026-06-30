"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  stockAnalysisService,
  type StockAnalysisResult,
} from "../services/stockAnalysisService";
import { useSelectedStockContext } from "./SelectedStockContext";

type AnalysisContextValue = {
  stockAnalysis: StockAnalysisResult | null;
  isLoading: boolean;
  error: string | null;
  refreshAnalysis: () => Promise<void>;
};

const AnalysisContext = createContext<AnalysisContextValue | null>(null);

type AnalysisProviderProps = {
  children: ReactNode;
};

export function AnalysisProvider({ children }: AnalysisProviderProps) {
  const { selectedSymbol } = useSelectedStockContext();

  const [stockAnalysis, setStockAnalysis] =
    useState<StockAnalysisResult | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadAnalysis() {
    try {
      setIsLoading(true);
      setError(null);

      const result = await stockAnalysisService.analyze(selectedSymbol);

      setStockAnalysis(result);
    } catch {
      setError("Analysis could not be loaded.");
      setStockAnalysis(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadAnalysis();
  }, [selectedSymbol]);

  return (
    <AnalysisContext.Provider
      value={{
        stockAnalysis,
        isLoading,
        error,
        refreshAnalysis: loadAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysisContext() {
  const context = useContext(AnalysisContext);

  if (!context) {
    throw new Error("useAnalysisContext must be used inside AnalysisProvider");
  }

  return context;
}