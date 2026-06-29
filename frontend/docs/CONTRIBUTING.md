# Contributing to SCORIX

Thank you for contributing to SCORIX.

## Development Principles

- Keep components reusable.
- Keep business logic inside engine modules.
- UI components should never calculate stock analysis.
- Use TypeScript strict typing.
- Prefer composition over duplication.
- Every feature should have a dedicated sprint.

## Commit Convention

Example:

Sprint 18: Add Watchlist foundation

Sprint 19: Portfolio architecture

Sprint 20: Real market data integration

## Pull Requests

Every Pull Request should:

- Build successfully
- Have no TypeScript errors
- Have no ESLint errors
- Update documentation if architecture changes
- Keep UI consistent

## Folder Responsibilities

components/
→ UI only

engine/
→ Financial calculations

services/
→ External data

context/
→ Global application state

docs/
→ Project documentation

## Engineering Standard

Every sprint follows:

Plan

↓

Implementation

↓

Problems = 0

↓

UI Test

↓

Documentation

↓

GitHub