# Testing Patterns

**Analysis Date:** 2026-03-28

## Test Framework

**Runner:**
- Not detected (no `test` script in `package.json`; scripts are `dev`, `build`, `lint`, `preview` in `package.json`).
- No common runner config detected (no `vitest.config.*`, `jest.config.*`, `playwright.config.*`, `cypress.config.*` found in repo root listing).

**Assertion Library:**
- Not applicable (no test runner detected).

**Run Commands:**
```bash
npm run lint          # Lint (closest available quality gate)
npm run build         # Type-check + build (`tsc -b && vite build`)
```

## Test File Organization

**Location:**
- Not detected (no `*.test.*` / `*.spec.*` files discovered under `src/` based on repository scan).

**Naming:**
- Not applicable (no tests detected).

**Structure:**
- Not applicable (no tests detected).

## Test Structure

**Suite Organization:**
- Not applicable (no tests detected).

**Patterns:**
- Not applicable (no tests detected).

## Mocking

**Framework:** Not applicable (no tests detected).

**Patterns:**
- Not applicable (no tests detected).

**What to Mock:**
- Not applicable (no tests detected).

**What NOT to Mock:**
- Not applicable (no tests detected).

## Fixtures and Factories

**Test Data:**
- Not applicable (no tests detected).

**Location:**
- Not applicable (no tests detected).

## Coverage

**Requirements:** Not applicable (no tests detected).

**View Coverage:**
```bash
# Not configured (no test runner detected)
```

## Test Types

**Unit Tests:**
- Not detected.

**Integration Tests:**
- Not detected.

**E2E Tests:**
- Not detected.

## Common Patterns

**Async Testing:**
- Not applicable (no tests detected).

**Error Testing:**
- Not applicable (no tests detected).

---

*Testing analysis: 2026-03-28*

