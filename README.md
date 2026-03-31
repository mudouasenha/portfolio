# Portfolio — Personal Website

Personal portfolio application built with React + TypeScript.  
It presents projects, skills, certifications, contact information, and professional experience with bilingual support (`pt` and `en`).

## Live Demo

- [Visit My Portfolio](https://portfolio-matheus-miranda-torres-gomes-projects.vercel.app/)

![website sample](image.png)

## Prerequisites

- Node.js 20+
- npm 10+

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run development server:

   ```bash
   npm run dev
   ```

3. Open Vite local URL (default `http://localhost:5173`).

## Build & Test Commands

```bash
# Build (TypeScript + Vite)
npm run build

# Lint
npm run lint

# Preview production build
npm run preview
```

## Accessibility Runtime Dependencies

Linux host libraries must be installed before a11y scans can launch Playwright Chromium.

```bash
rtk npm run a11y:install-deps
rtk npm run test:a11y
rtk npm run verify:phase3
```

## Build Baseline Recovery

Use this deterministic recovery flow if local dependencies drift or build checks fail:

```bash
rm -rf node_modules package-lock.json
npm install
npm run verify:baseline
```

This is the required Phase 1 baseline flow before marking work as done.

## Technology Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **Routing:** React Router
- **Localization:** i18next + react-i18next
- **Animation:** Motion
- **Deployment:** Vercel

## Repository Structure

| Path | Purpose |
|---|---|
| `src/components/` | Page sections and reusable UI blocks |
| `src/models/` | Typed content models (`Project`, `SkillSet`, `ExperienceItem`, etc.) |
| `src/locales/` | Translation dictionaries (`en` and `pt`) |
| `src/assets/` | Images for profile, projects, and certifications |
| `src/constants/` | Shared constants and static labels |
| `public/` | Public static assets |

## Content Update Guide

- Edit text content in `src/locales/en/translation.json` and `src/locales/pt/translation.json`.
- Keep translation keys synchronized across both locale files.
- Update images in `src/assets/` and keep component references consistent.
- Update model-driven content in `src/models/` when adding projects, skills, or certifications.

## Contribution Notes

- Keep changes aligned with current folder organization.
- Prefer small, focused pull requests.
- Validate with `npm run lint` and `npm run build` before opening a PR.
