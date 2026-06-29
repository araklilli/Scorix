"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  watchlistService,
  type WatchlistSymbol,
} from "../services/watchlistService";

type WatchlistContextValue = {
  watchlist: WatchlistSymbol[];
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  toggleWatchlist: (symbol: string) => void;
  isInWatchlist: (symbol: string) => boolean;
};

const WatchlistContext = createContext<WatchlistContextValue | null>(null);

type WatchlistProviderProps = {
  children: ReactNode;
};

export function WatchlistProvider({ children }: WatchlistProviderProps) {
  const [watchlist, setWatchlist] = useState<WatchlistSymbol[]>([]);

  useEffect(() => {
    setWatchlist(watchlistService.getAll());
  }, []);

  function addToWatchlist(symbol: string) {
    const updated = watchlistService.add(symbol);
    setWatchlist(updated);
  }

  function removeFromWatchlist(symbol: string) {
    const updated = watchlistService.remove(symbol);
    setWatchlist(updated);
  }

  function toggleWatchlist(symbol: string) {
    const updated = watchlistService.toggle(symbol);
    setWatchlist(updated);
  }

  function isInWatchlist(symbol: string) {
    return watchlist.includes(symbol.trim().toUpperCase());
  }

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        toggleWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlistContext() {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error(
      "useWatchlistContext must be used inside WatchlistProvider"
    );
  }

  return context;
}