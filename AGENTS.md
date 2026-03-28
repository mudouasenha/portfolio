# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**portfolio** is a personal website project built with React + TypeScript. It showcases projects, skills, certifications, contact information, and professional experience. The app is a Vite frontend with TailwindCSS styling, i18next localization (`pt` and `en`), and deployment on Vercel.

## Commands

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build for production
npm run build

# Run lint checks
npm run lint

# Preview production build locally
npm run preview
```

## Architecture & Documentation

**Always read `README.md` first** — it describes setup, structure, and project context.

Before making changes, read the relevant docs:

| Where | What |
|---|---|
| `README.md` | Setup, scripts, stack, and repository structure |
| `.planning/codebase/ARCHITECTURE.md` | High-level frontend architecture and routing flow |
| `.planning/codebase/STRUCTURE.md` | Directory layout and file responsibilities |
| `.planning/codebase/CONVENTIONS.md` | Naming, component patterns, and coding conventions |
| `.planning/codebase/TESTING.md` | Testing/linting posture and quality practices |
| `.planning/codebase/INTEGRATIONS.md` | External integrations and third-party services |
| `.planning/codebase/CONCERNS.md` | Known technical debt and fragile areas |
| `.planning/codebase/STACK.md` | Runtime, dependencies, and tooling stack |

## Skills Available

When working on this repo, the following skills apply:

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
| `.planning/codebase/ARCHITECTURE.md` | Routing flow, component architecture, or app entry changed |
| `.planning/codebase/STRUCTURE.md` | New directories/files or responsibility shifts |
| `.planning/codebase/CONVENTIONS.md` | New coding/naming patterns introduced |
| `.planning/codebase/INTEGRATIONS.md` | New external libraries/services requiring integration notes |
| `.planning/codebase/STACK.md` | Dependency/runtime/tooling changes |
| `.planning/codebase/CONCERNS.md` | New risks, debt, or fragile areas identified |
| `.planning/codebase/TESTING.md` | Validation strategy or quality tooling changes |
