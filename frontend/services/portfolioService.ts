const PORTFOLIO_STORAGE_KEY = "scorix_portfolio";

export interface PortfolioPosition {
  id: string;
  symbol: string;
  quantity: number;
  averageCost: number;
  createdAt: string;
}

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeSymbol(symbol: string) {
  return symbol.trim().toUpperCase();
}

function createId() {
  return crypto.randomUUID();
}

export const portfolioService = {
  getAll(): PortfolioPosition[] {
    if (!isBrowser()) return [];

    const raw = localStorage.getItem(PORTFOLIO_STORAGE_KEY);

    if (!raw) return [];

    try {
      return JSON.parse(raw) as PortfolioPosition[];
    } catch {
      return [];
    }
  },

  save(positions: PortfolioPosition[]) {
    if (!isBrowser()) return;

    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(positions));
  },

  add(symbol: string, quantity: number, averageCost: number) {
    const current = this.getAll();

    const newPosition: PortfolioPosition = {
      id: createId(),
      symbol: normalizeSymbol(symbol),
      quantity,
      averageCost,
      createdAt: new Date().toISOString(),
    };

    const updated = [...current, newPosition];

    this.save(updated);

    return updated;
  },

  remove(id: string) {
    const current = this.getAll();
    const updated = current.filter((position) => position.id !== id);

    this.save(updated);

    return updated;
  },

  clear() {
    this.save([]);
  },
};