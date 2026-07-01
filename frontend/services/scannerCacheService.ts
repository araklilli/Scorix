import type { ScanResult } from "./scannerService";

const SCANNER_CACHE_TTL = 30 * 1000;

type ScannerCache = {
  data: ScanResult[];
  timestamp: number;
};

let scannerCache: ScannerCache | null = null;

export const scannerCacheService = {
  get(): ScanResult[] | null {
    if (!scannerCache) return null;

    const isExpired = Date.now() - scannerCache.timestamp > SCANNER_CACHE_TTL;

    if (isExpired) {
      scannerCache = null;
      return null;
    }

    return scannerCache.data;
  },

  set(data: ScanResult[]) {
    scannerCache = {
      data,
      timestamp: Date.now(),
    };
  },

  clear() {
    scannerCache = null;
  },
};