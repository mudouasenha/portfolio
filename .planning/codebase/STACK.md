# Technology Stack

**Analysis Date:** 2026-03-28

## Languages

**Primary:**
- TypeScript - Application code in `src/**/*.ts` and `src/**/*.tsx` (React components and models)

**Secondary:**
- JavaScript (ESM) - Tooling/config in `eslint.config.js`, `tailwind.config.js`, `postcss.config.js`, `i18next-scanner.config.js`
- CSS - Global styling + Tailwind directives in `src/index.css`
- HTML - App entry document in `index.html`

## Runtime

**Environment:**
- Browser SPA (client-side) mounted into `index.html` and bootstrapped from `src/main.tsx`

**Package Manager:**
- npm
- Lockfile: present (`package-lock.json`)

## Frameworks

**Core:**
- React 18 - UI components and rendering (`package.json`, `src/main.tsx`, `src/components/*.tsx`)
- React Router 7 - Client-side routing and language-based route handling (`package.json`, `src/MainRoutes.tsx`, `src/LangRouter.tsx`)

**Styling:**
- Tailwind CSS 3 - Utility-first styling (`tailwind.config.js`, `postcss.config.js`, `src/index.css`)

**i18n:**
- i18next + react-i18next - Localization and translation hooks/components (`package.json`, `src/i18n.tsx`, `src/locales/**/translation.json`)
- i18next-browser-languagedetector - Language detection (`package.json`, `src/i18n.tsx`)

**Animation:**
- Motion - Animations used via `motion/react` (`package.json`, `src/components/About.tsx`, `src/components/Projects.tsx`)
- Framer Motion - Also used in some components (`package.json` does not list `framer-motion`, but imports exist in `src/components/Technologies.tsx`, `src/components/Skills.tsx`)

**Content Rendering:**
- react-markdown - Markdown rendering in UI (`package.json`, `src/components/About.tsx`)

## Build/Dev Tooling

**Build System:**
- Vite 6 - Dev server and production bundling (`package.json`, `vite.config.ts`)
- `@vitejs/plugin-react-swc` - React + SWC transform plugin (`package.json`, `vite.config.ts`)
- Storybook 10 (`storybook`, `@storybook/react-vite`) - Isolated component development and static story builds (`package.json`, `.storybook/main.ts`, `.storybook/preview.tsx`)

**Type Checking:**
- TypeScript project references build (`tsc -b`) (`package.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`)

**Linting:**
- ESLint 9 + typescript-eslint flat config (`package.json`, `eslint.config.js`)

## Key Dependencies

**UI & UX:**
- `react-icons` - Icon pack usage (dependency declared in `package.json`)
- `flag-icons` - Flag icon assets (dependency declared in `package.json`)

**Routing:**
- `react-router-dom` - Route definitions and navigation (`src/MainRoutes.tsx`, `src/LangRouter.tsx`)

**Localization:**
- `i18next`, `react-i18next` - Translation resources and hooks (`src/i18n.tsx`)

## Configuration

**Environment:**
- No `.env*` files detected at repo root (checked via `ls -la .env*`)
- No `import.meta.env`/`process.env` references detected (ripgrep across repo)

**Build:**
- Vite config: `vite.config.ts`
- TypeScript: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- Tailwind: `tailwind.config.js`
- PostCSS: `postcss.config.js`
- ESLint: `eslint.config.js`
- i18n scanning: `i18next-scanner.config.js`

## Platform Requirements

**Development:**
- npm-based workflow via Vite scripts in `package.json` (`dev`, `build`, `lint`, `preview`)

**Production:**
- Static SPA build output (Vite) suitable for static hosting; deployment is referenced as Vercel in `README.md` and `MAINTAINANCE-AND-SUPPORT.md`

---

*Stack analysis: 2026-03-28*

