"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { scannerService, type ScanResult } from "../services/scannerService";

export type ScannerFilters = {
  minScore: number;
  ratings: string[];
  risks: Array<"LOW" | "MEDIUM" | "HIGH">;
  breakoutOnly: boolean;
  smartMoneyOnly: boolean;
  minerviniOnly: boolean;
};

type ScannerContextValue = {
  results: ScanResult[];
  filteredResults: ScanResult[];
  filters: ScannerFilters;
  isLoading: boolean;
  setMinScore: (score: number) => void;
  toggleRating: (rating: string) => void;
  toggleRisk: (risk: "LOW" | "MEDIUM" | "HIGH") => void;
  toggleBreakoutOnly: () => void;
  toggleSmartMoneyOnly: () => void;
  toggleMinerviniOnly: () => void;
  refreshScanner: () => Promise<void>;
};

const defaultFilters: ScannerFilters = {
  minScore: 0,
  ratings: [],
  risks: [],
  breakoutOnly: false,
  smartMoneyOnly: false,
  minerviniOnly: false,
};

const ScannerContext = createContext<ScannerContextValue | null>(null);

type ScannerProviderProps = {
  children: ReactNode;
};

function applyFilters(results: ScanResult[], filters: ScannerFilters) {
  return results.filter((item) => {
    if (item.score < filters.minScore) return false;

    if (filters.ratings.length > 0 && !filters.ratings.includes(item.rating)) {
      return false;
    }

    if (filters.risks.length > 0 && !filters.risks.includes(item.risk)) {
      return false;
    }

    if (filters.breakoutOnly && !item.breakout) return false;
    if (filters.smartMoneyOnly && !item.smartMoney) return false;
    if (filters.minerviniOnly && !item.minervini) return false;

    return true;
  });
}

export function ScannerProvider({ children }: ScannerProviderProps) {
  const [results, setResults] = useState<ScanResult[]>([]);
  const [filters, setFilters] = useState<ScannerFilters>(defaultFilters);
  const [isLoading, setIsLoading] = useState(false);

  async function refreshScanner() {
    setIsLoading(true);

    const scanResults = await scannerService.scanMarket();

    setResults(scanResults);
    setIsLoading(false);
  }

  useEffect(() => {
    refreshScanner();
  }, []);

  const filteredResults = applyFilters(results, filters);

  function setMinScore(score: number) {
    setFilters((current) => ({
      ...current,
      minScore: score,
    }));
  }

  function toggleRating(rating: string) {
    setFilters((current) => ({
      ...current,
      ratings: current.ratings.includes(rating)
        ? current.ratings.filter((item) => item !== rating)
        : [...current.ratings, rating],
    }));
  }

  function toggleRisk(risk: "LOW" | "MEDIUM" | "HIGH") {
    setFilters((current) => ({
      ...current,
      risks: current.risks.includes(risk)
        ? current.risks.filter((item) => item !== risk)
        : [...current.risks, risk],
    }));
  }

  function toggleBreakoutOnly() {
    setFilters((current) => ({
      ...current,
      breakoutOnly: !current.breakoutOnly,
    }));
  }

  function toggleSmartMoneyOnly() {
    setFilters((current) => ({
      ...current,
      smartMoneyOnly: !current.smartMoneyOnly,
    }));
  }

  function toggleMinerviniOnly() {
    setFilters((current) => ({
      ...current,
      minerviniOnly: !current.minerviniOnly,
    }));
  }

  return (
    <ScannerContext.Provider
      value={{
        results,
        filteredResults,
        filters,
        isLoading,
        setMinScore,
        toggleRating,
        toggleRisk,
        toggleBreakoutOnly,
        toggleSmartMoneyOnly,
        toggleMinerviniOnly,
        refreshScanner,
      }}
    >
      {children}
    </ScannerContext.Provider>
  );
}

export function useScannerContext() {
  const context = useContext(ScannerContext);

  if (!context) {
    throw new Error("useScannerContext must be used inside ScannerProvider");
  }

  return context;
}