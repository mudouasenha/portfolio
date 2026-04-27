# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Project Overview

**portfolio** is a personal website built with React 18 + TypeScript. It showcases projects, skills, certifications, contact information, and professional experience with bilingual support (`pt` and `en`). Vite frontend with TailwindCSS, shadcn/ui components, Framer Motion animations, i18next localization, and deployment on Vercel.

## Commands

```bash
npm install              # Install dependencies
npm run dev              # Run local dev server (default http://localhost:5173)
npm run build            # TypeScript check + Vite production build
npm run lint             # ESLint checks
npm run preview          # Preview production build locally
npm run storybook        # Start Storybook on http://localhost:6006
npm run build-storybook  # Build static Storybook into storybook-static/
npm run bones:build      # Generate skeleton bones once
npm run bones:watch      # Re-capture bones while developing (CLI mode)
npm run test:integration # Run Vitest integration tests
npm run test:a11y        # Run Playwright accessibility scans
npm run verify:baseline  # lint + build (Phase 1 gate)
npm run verify:phase3    # lint + build + integration + a11y
npm run a11y:install-deps # Install Playwright Chromium + system deps
```

## Architecture & Documentation

**Read `README.md` first** for setup, stack, and repository structure.

| Where | What |
|---|---|
| `README.md` | Setup, scripts, stack, and repository structure |
| `DESIGN.md` | **Canonical design system** — colors, typography, components, layout, elevation, and responsive rules. Read before any UI work. |
| `.planning/codebase/ARCHITECTURE.md` | High-level frontend architecture and routing flow |
| `.planning/codebase/STRUCTURE.md` | Directory layout and file responsibilities |
| `.planning/codebase/CONVENTIONS.md` | Naming, component patterns, and coding conventions |
| `.planning/codebase/TESTING.md` | Testing/linting posture and quality practices |
| `.planning/codebase/INTEGRATIONS.md` | External integrations and third-party services |
| `.planning/codebase/CONCERNS.md` | Known technical debt and fragile areas |
| `.planning/codebase/STACK.md` | Runtime, dependencies, and tooling stack |

## Design System

**`DESIGN.md` is the single source of truth for all visual decisions.** Before writing or modifying any UI code, read it. It contains:

- Exact color tokens (OKLCH + hex) with semantic roles
- Typography hierarchy (Cormorant Garamond for headings, Manrope for body)
- Component specifications (buttons, cards, navbar, tags) with exact CSS values
- Layout principles, spacing system, and grid patterns
- Shadow/elevation levels and frosted-glass conventions
- Do's and Don'ts guardrails
- Responsive breakpoint behavior
- Ready-to-use agent prompts for consistent component creation

When in doubt about a color, spacing, or component style, check `DESIGN.md` before inventing new values.

## Skills Available

| Skill | When to use |
|---|---|
| `gsd-map-codebase` | Refresh codebase mapping docs after significant structural changes |
| `requesting-code-review` | Request a focused review before merge or handoff |

## Git Workflow

- Branch from `main` using descriptive feature/fix branch names.
- Open PRs in GitHub targeting `main`.
- Keep commits scoped; avoid mixing unrelated changes in one PR.

## Documentation Hygiene

After any AI-assisted work, verify whether these files need updating before considering the task done:

| File | Update when |
|---|---|
| `README.md` | Setup steps, scripts, stack, or structure changed |
| `DESIGN.md` | Colors, typography, component styles, layout patterns, or visual conventions changed |
| `.planning/codebase/ARCHITECTURE.md` | Routing flow, component architecture, or app entry changed |
| `.planning/codebase/STRUCTURE.md` | New directories/files or responsibility shifts |
| `.planning/codebase/CONVENTIONS.md` | New coding/naming patterns introduced |
| `.planning/codebase/INTEGRATIONS.md` | New external libraries/services requiring integration notes |
| `.planning/codebase/STACK.md` | Dependency/runtime/tooling changes |
| `.planning/codebase/CONCERNS.md` | New risks, debt, or fragile areas identified |
| `.planning/codebase/TESTING.md` | Validation strategy or quality tooling changes |
