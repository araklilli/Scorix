import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SelectedStockProvider } from "../context/SelectedStockContext";
import { WatchlistProvider } from "../context/WatchlistContext";
import { AnalysisProvider } from "../context/AnalysisContext";
import { ScannerProvider } from "../context/ScannerContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SCORIX",
  description: "AI Powered Stock Analysis Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SelectedStockProvider>
          <WatchlistProvider>
            <AnalysisProvider>
              <ScannerProvider>{children}</ScannerProvider>
            </AnalysisProvider>
          </WatchlistProvider>
        </SelectedStockProvider>
      </body>
    </html>
  );
}