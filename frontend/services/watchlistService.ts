const WATCHLIST_STORAGE_KEY = "scorix_watchlist";
const MAX_WATCHLIST_ITEMS = 20;

export type WatchlistSymbol = string;

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeSymbol(symbol: string) {
  return symbol.trim().toUpperCase();
}

export const watchlistService = {
  getAll(): WatchlistSymbol[] {
    if (!isBrowser()) return [];

    const raw = localStorage.getItem(WATCHLIST_STORAGE_KEY);

    if (!raw) return [];

    try {
      return JSON.parse(raw) as WatchlistSymbol[];
    } catch {
      return [];
    }
  },

  save(symbols: WatchlistSymbol[]) {
    if (!isBrowser()) return;

    localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(symbols));
  },

  add(symbol: string): WatchlistSymbol[] {
    const normalizedSymbol = normalizeSymbol(symbol);
    const current = this.getAll();

    if (!normalizedSymbol) return current;

    if (current.includes(normalizedSymbol)) {
      return current;
    }

    if (current.length >= MAX_WATCHLIST_ITEMS) {
      return current;
    }

    const updated = [...current, normalizedSymbol];

    this.save(updated);

    return updated;
  },

  remove(symbol: string): WatchlistSymbol[] {
    const normalizedSymbol = normalizeSymbol(symbol);
    const current = this.getAll();

    const updated = current.filter((item) => item !== normalizedSymbol);

    this.save(updated);

    return updated;
  },

  toggle(symbol: string): WatchlistSymbol[] {
    const normalizedSymbol = normalizeSymbol(symbol);
    const current = this.getAll();

    if (current.includes(normalizedSymbol)) {
      return this.remove(normalizedSymbol);
    }

    return this.add(normalizedSymbol);
  },

  includes(symbol: string): boolean {
    const normalizedSymbol = normalizeSymbol(symbol);

    return this.getAll().includes(normalizedSymbol);
  },
};