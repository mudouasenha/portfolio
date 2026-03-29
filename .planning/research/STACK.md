# Stack Research

**Domain:** Brownfield React portfolio frontend modernization  
**Researched:** 2026-03-28  
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| React | 19.x | UI runtime and component model | Current React baseline with strong ecosystem support and updated APIs. |
| Vite | 8.x | Dev server and production bundling | Current supported major with fast iteration loops for frontend work. |
| Tailwind CSS | 4.2.x | Utility-first styling and token workflow | Current Tailwind line with improved modern CSS workflow. |
| shadcn/ui | latest CLI + generated components | Accessible component primitives and design-system base | Best fit for owned component code and token-driven consistency. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `react-router-dom` | 7.x | Language-scoped routing and navigation | Keep URL-based locale behavior and navigation continuity. |
| `i18next` + `react-i18next` | 25.x + 15.x | Localization runtime | Preserve bilingual behavior while tightening typed access. |
| `motion` | 11.x | Motion choreography and transitions | Keep one animation package only and remove mixed imports. |
| `zod` | 3.x or 4.x | Runtime schema validation | Validate structured translation objects before rendering. |
| `vitest` + `@testing-library/react` | latest stable | Unit and integration confidence | Add coverage for routing, i18n continuity, and section rendering. |
| a11y tooling (`jest-axe` or Playwright checks) | latest stable | Accessibility verification | Catch semantic and contrast regressions after redesign. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint + TypeScript | Static quality gate | Keep strict lint and type checks; remove mismatched type packages. |
| shadcn CLI | Component scaffolding and style setup | Try preset `b1Z5ezr60` first; if unresolved, initialize with Vega style. |
| Lighthouse (optional) | Performance sanity check | Run near final phase to detect regressions in LCP/CLS. |

## Installation

```bash
# Core modernization baseline
npm install react@^19 react-dom@^19 react-router-dom@^7 i18next react-i18next motion zod

# UI system and quality tooling
npx shadcn@latest init
npm install -D tailwindcss@latest @tailwindcss/vite vitest @testing-library/react @testing-library/jest-dom
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| React 19.x | Stay on React 18.3 | Use only if migration blockers appear in critical dependencies. |
| Tailwind 4.2 | Stay on Tailwind 3.4 | Use if browser compatibility constraints force delay. |
| shadcn generated components | full external UI library | Use if strict enterprise design-system policy requires it. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Mixed animation packages (`motion` and `framer-motion`) | API inconsistency and bundle complexity | Standardize on one motion library. |
| `Object.assign` model wrappers as validation substitute | No runtime safety for malformed locale data | Use typed interfaces and schema parsing at boundaries. |
| Hardcoded non-token colors during shadcn migration | Breaks theme coherence and future extensibility | Use semantic token classes (`bg-background`, `text-foreground`, etc.). |

## Stack Patterns by Variant

**If shadcn preset `b1Z5ezr60` resolves:**
- Apply preset as base visual contract.
- Keep structural component architecture independent from style preset specifics.

**If preset does not resolve:**
- Use Vega style as baseline and customize typography, spacing, and accents.
- Record fallback explicitly in planning artifacts and continue implementation.

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| `react@19.x` | `react-dom@19.x` | Upgrade together and follow React migration guide. |
| `vite@8.x` | modern Node LTS and Tailwind 4.x | Keep plugin alignment during migration. |
| `react-router-dom@7.x` | built-in TypeScript types | Remove legacy `@types/react-router-dom` package mismatch. |

## Sources

- https://react.dev/blog/2024/04/25/react-19-upgrade-guide - React 19 migration guidance.
- https://vite.dev/releases - supported Vite majors and current stable line.
- https://tailwindcss.com/docs/compatibility - Tailwind 4.x compatibility baseline.
- https://ui.shadcn.com/docs/cli - shadcn CLI initialization and usage.
- https://ui.shadcn.com/docs/changelog/2025-12-shadcn-create - Vega style and modern shadcn style system.

---
*Stack research for: portfolio frontend modernization*  
*Researched: 2026-03-28*
