# SCORIX Architecture

SCORIX is an AI-powered stock analysis platform built with Next.js, TypeScript and a modular engine architecture.

## Core Principles

- Engine-first architecture
- UI does not calculate financial logic
- Single source of truth for selected stock
- Components consume shared context
- Services provide market data
- Engines process data
- UI only displays results

## Main Layers

```text
UI Components
      ↓
SelectedStockContext
      ↓
Services
      ↓
Analysis Engine
      ↓
Intelligence Engine
      ↓
Decision / Explanation Engine
      ↓
Dashboard