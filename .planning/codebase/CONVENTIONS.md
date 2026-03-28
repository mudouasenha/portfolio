# Coding Conventions

**Analysis Date:** 2026-03-28

## Naming Patterns

**Files:**
- React components use `PascalCase.tsx` under `src/components/` (examples: `src/components/Navbar.tsx`, `src/components/LanguageSwitcher.tsx`).
- App-level files are mixed `PascalCase.tsx` and `camelCase.tsx` in `src/` (examples: `src/App.tsx`, `src/i18n.tsx`, `src/main.tsx`).
- “Models” are `PascalCase.tsx` classes under `src/models/` (examples: `src/models/ContactInfo.tsx`, `src/models/Project.tsx`).
- Barrel export present in `src/constants/index.ts`.

**Functions:**
- React components commonly use arrow functions assigned to `const` (examples: `src/components/Navbar.tsx`, `src/components/Projects.tsx`).
- Some components use `function` declarations (example: `src/MainRoutes.tsx`).
- Event handlers are named `handleX` (example: `handleLanguageChange` in `src/components/LanguageSwitcher.tsx`).

**Variables:**
- Constants use `UPPER_SNAKE_CASE` for static arrays (examples: `SUPPORTED_LANGS` in `src/LangRouter.tsx`, `LANGUAGES` in `src/components/LanguageSwitcher.tsx`).
- Locals and state use `camelCase` (examples: `rawProjects`, `dropdownRef`, `currentLang` in `src/components/LanguageSwitcher.tsx`).

**Types:**
- Class properties use definite assignment assertions (`property!: type`) in models (examples: `src/models/ContactInfo.tsx`, `src/models/Project.tsx`).
- Inline prop typing is used for simple components (example: `children: React.ReactNode` in `src/LangRouter.tsx`).

## Code Style

**Formatting:**
- No formatter config detected (no `.prettierrc*` / `prettier.config.*` in repo root listing; formatting varies across files like `src/main.tsx` vs `src/App.tsx`).
- Files commonly include semicolons, but usage is inconsistent across the codebase (examples: `src/MainRoutes.tsx` uses semicolons; `src/main.tsx` mixes semicolons and none).
- Quote style is mixed between single and double quotes (examples: `'react-router-dom'` imports in `src/MainRoutes.tsx` vs `"` imports in `src/App.tsx`).

**Linting:**
- ESLint is configured via flat config in `eslint.config.js` and run via `npm run lint` in `package.json`.
- TypeScript linting uses `typescript-eslint` recommended rules (see `extends: [...tseslint.configs.recommended]` in `eslint.config.js`).
- React Hooks linting uses `eslint-plugin-react-hooks` recommended rules (`eslint.config.js`).
- Fast Refresh rule enabled: `react-refresh/only-export-components` set to `warn` in `eslint.config.js`.
- `dist` is ignored by ESLint (`eslint.config.js`).

## Import Organization

**Order:**
1. Third-party modules (example: `react-router-dom` in `src/MainRoutes.tsx`)
2. Local modules (`./LangRouter`, `./App` in `src/MainRoutes.tsx`)
3. Side-effect/style imports appear alongside other imports (example: `src/main.tsx` imports `./index.css` and `./i18n`).

**Path Aliases:**
- No TS path aliases configured (no `compilerOptions.paths` present in `tsconfig.json` / `tsconfig.app.json`).
- Imports use relative paths like `./...` and `../...` (examples: `src/components/Projects.tsx`, `src/components/Navbar.tsx`).

## Error Handling

**Patterns:**
- Conditional routing fallback via `<Navigate />` (example: invalid language redirect in `src/LangRouter.tsx`).
- “Not ready” UI states sometimes return `null` (example: `if (!ready) return null;` in `src/LangRouter.tsx`).

## Logging

**Framework:** `console`

**Patterns:**
- Debug logging exists in component code (example: `console.log('rawProjects:', projects);` in `src/components/Projects.tsx`).

## Comments

**When to Comment:**
- JSX comments used for route intent and structure (example: comments in `src/MainRoutes.tsx`).
- Large commented-out blocks exist in constants/data modules (example: `src/constants/index.ts`).

**JSDoc/TSDoc:**
- Not detected in sampled files (`src/components/*`, `src/models/*`, `src/LangRouter.tsx`).

## Function Design

**Size:**
- Components are typically single-file and return JSX directly (examples: `src/components/Navbar.tsx`, `src/components/Projects.tsx`).

**Parameters:**
- Props are sometimes typed inline rather than via named interfaces (example: `src/LangRouter.tsx`).

**Return Values:**
- Components return JSX; conditional rendering uses `null` to render nothing (example: `src/LangRouter.tsx`).

## Module Design

**Exports:**
- Default exports are common for components/modules (examples: `export default function MainRoutes()` in `src/MainRoutes.tsx`, `export default Navbar;` in `src/components/Navbar.tsx`).
- Named exports used for some components/constants (example: `export const LanguageSwitcher` in `src/components/LanguageSwitcher.tsx`).

**Barrel Files:**
- Present for constants/data in `src/constants/index.ts`.

---

*Convention analysis: 2026-03-28*

