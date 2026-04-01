# Architecture

**Analysis Date:** 2026-03-28

## Pattern Overview

**Overall:** Vite + React single-page application (SPA) with React Router and i18next-based localization.

**Key Characteristics:**
- Client-only rendering; no server/API layer detected (entry HTML loads `src/main.tsx` via `index.html`).
- Route-driven language selection (`/:lang/*`) that synchronizes i18next language with the URL (see `src/MainRoutes.tsx`, `src/LangRouter.tsx`).
- Page composed as a single long “section stack” (navbar + multiple sections) rendered by `src/App.tsx`.

## Phase 4 Final Polish Note (2026-04-01)

- Final polish surfaces were completed in:
  - `src/components/About.tsx`
  - `src/components/Tag.tsx`
  - `src/components/Hero.tsx`
  - `src/components/Navbar.tsx`
  - `src/App.tsx`
  - `src/index.css`
- Continuity constraint preserved: section order and anchor behavior in `App.tsx` were kept stable to avoid regressions in existing integration coverage.

## Layers

**Build/Runtime Layer:**
- Purpose: Dev server, bundling, and React compilation.
- Location: `vite.config.ts`, `index.html`, `package.json`
- Contains: Vite config and entry HTML referencing `src/main.tsx`.
- Depends on: Vite + `@vitejs/plugin-react-swc` (declared in `package.json`).
- Used by: `npm run dev`, `npm run build` (see `package.json`).

**App Bootstrap Layer:**
- Purpose: Mount React tree and initialize cross-cutting configuration.
- Location: `src/main.tsx`, `src/i18n.tsx`, `src/index.css`
- Contains: React root creation (`createRoot(...)`), router wrapper, global CSS, i18n initialization.
- Depends on: `react-dom/client`, `react-router-dom`, `i18next`, `react-i18next`.
- Used by: `index.html` script tag (`/src/main.tsx`).

**Routing/Localization Layer:**
- Purpose: Enforce language-prefixed routes and keep UI language consistent with URL.
- Location: `src/MainRoutes.tsx`, `src/LangRouter.tsx`
- Contains: `/` → `/en` redirect, `:lang/*` route wrapper, unsupported language fallback redirect.
- Depends on: `react-router-dom` (`Routes`, `Route`, `Navigate`, `useParams`, `useLocation`), i18n instance from `react-i18next`.
- Used by: `src/main.tsx` renders `<MainRoutes />`.

**UI Composition Layer (Sections):**
- Purpose: Render the portfolio page sections and navigation.
- Location: `src/App.tsx`, `src/components/*.tsx`
- Contains: Section components (`Hero`, `About`, `Skills`, `Projects`, etc.) and UI primitives (e.g., `src/components/Tag.tsx`).
- Depends on: Tailwind classes in JSX, motion animations (`motion/react`), and translations (`react-i18next`) in content-driven components.
- Used by: `src/MainRoutes.tsx` wraps `src/App.tsx` under the language router.

**Domain/Data-Shaping Layer (Lightweight):**
- Purpose: Provide lightweight typed containers used when reading translation objects.
- Location: `src/models/*.tsx`
- Contains: Simple classes with `constructor(data: Partial<T>) { Object.assign(this, data); }` (e.g., `src/models/Project.tsx`, `src/models/ContactInfo.tsx`).
- Depends on: TypeScript only (no external libs).
- Used by: Components that map translation JSON objects into typed objects (e.g., `src/components/Projects.tsx`, `src/components/Certifications.tsx`).

**Content Layer (Localization Files):**
- Purpose: Store copy and structured content (lists) for each language.
- Location: `src/locales/en/translation.json`, `src/locales/pt/translation.json`
- Contains: Translation keys and list/object payloads consumed via `t(..., { returnObjects: true })`.
- Depends on: i18next resource loading configured in `src/i18n.tsx`.
- Used by: Most “content sections” (e.g., `src/components/Experience.tsx`, `src/components/Projects.tsx`).

## Data Flow

**App Startup:**
1. Browser loads `index.html` which imports `/src/main.tsx`.
2. `src/main.tsx` imports `src/i18n.tsx` (initializes i18next) and renders React inside `<BrowserRouter>`.
3. `src/MainRoutes.tsx` redirects `/` to `/en`, then renders the `:lang/*` route.
4. `src/LangRouter.tsx` validates `lang` (`en|pt`), calls `i18n.changeLanguage(lang)` if needed, and only renders children once ready.
5. `src/App.tsx` renders the page sections from `src/components/*`.

**Content Rendering (Typical Section):**
1. Component calls `const { t } = useTranslation()` (e.g., `src/components/Projects.tsx`).
2. Structured data is pulled from translation JSON using `t('key', { returnObjects: true })`.
3. Data is optionally wrapped into model instances (e.g., `new Project(...)` in `src/components/Projects.tsx`).
4. Static images are imported from `src/assets/**` and associated with translation-driven IDs.

**State Management:**
- Minimal local state via React hooks.
- Localization state is centralized in i18next (`src/i18n.tsx`) and synchronized with route params (`src/LangRouter.tsx`).

## Key Abstractions

**Language-Scoped Routing:**
- Purpose: Ensure language choice is encoded in the URL and drives i18next.
- Examples: `src/MainRoutes.tsx`, `src/LangRouter.tsx`, `src/components/LanguageSwitcher.tsx`
- Pattern: Wrapper component (`LangRouter`) gate-keeps rendering until language is set; `LanguageSwitcher` navigates by rewriting the first path segment.

**Translation-as-Content (Lists/Objects):**
- Purpose: Treat translation JSON as both text and structured content source.
- Examples: `src/components/Experience.tsx` (`t('experiences', { returnObjects: true })`), `src/components/Projects.tsx` (`t('projectsList', { returnObjects: true })`)
- Pattern: Translation key returns arrays/objects, then mapped into UI.

## Entry Points

**HTML Entry:**
- Location: `index.html`
- Triggers: Browser page load.
- Responsibilities: Provide `<div id="root"></div>` and load module entry `src/main.tsx`.

**React Entry:**
- Location: `src/main.tsx`
- Triggers: Imported by `index.html`.
- Responsibilities: Initialize i18n, mount React root, attach router, render `MainRoutes`.

## Error Handling

**Strategy:** Redirect-based handling for invalid language routes; otherwise rely on default React runtime behavior.

**Patterns:**
- Invalid or missing `:lang` redirects to `/en...` (`src/LangRouter.tsx`).
- Fallback route redirects to `/en` (`src/MainRoutes.tsx`).

## Cross-Cutting Concerns

**Logging:** Direct `console.log` present in `src/components/Projects.tsx`.
**Validation:** Route param validation for `lang` in `src/LangRouter.tsx`.
**Authentication:** Not detected.

---

*Architecture analysis: 2026-03-28*
