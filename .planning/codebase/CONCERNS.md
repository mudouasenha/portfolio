# Codebase Concerns

**Analysis Date:** 2026-03-28

## Tech Debt

**Dead/legacy constants module (commented blocks + unused exports):**
- Issue: `src/constants/index.ts` contains large commented-out sections and exports (`PROJECTS`, `CONTACT`, `LANGUAGES`) that are not imported anywhere in `src/`.
- Files: `src/constants/index.ts`
- Impact: Increases maintenance cost and confusion (multiple “sources of truth” for content); higher risk of reintroducing stale data by accident.
- Fix approach: Delete unused exports and commented blocks, or move content to i18n JSON and always derive display data inside React components/hooks.

**i18n translation access at module load time (non-reactive):**
- Issue: `src/constants/index.ts` calls `t('contact', { returnObjects: true })` and `t('languages', { returnObjects: true })` at import time.
- Files: `src/constants/index.ts`, `src/i18n.tsx`
- Impact: Values can become stale if language changes after module evaluation; also makes module initialization order matter (fragile imports).
- Fix approach: Only call `t()` inside components/hooks (e.g., `useTranslation`) or provide selector helpers that accept `t` as an argument.

**Type package mismatch for React Router:**
- Issue: App depends on `react-router-dom` v7 while also installing `@types/react-router-dom` v5.
- Files: `package.json`
- Impact: Conflicting/incorrect TypeScript types; confusing IDE errors; risk of “fixing” code to satisfy wrong typings.
- Fix approach: Remove `@types/react-router-dom` (React Router v6+ ships types) and rely on the package-provided typings.

**Debug output left in UI code:**
- Issue: `console.log('rawProjects:', projects);` runs on every render.
- Files: `src/components/Projects.tsx`
- Impact: Noisy production console, minor performance impact, and harder debugging of real issues.
- Fix approach: Remove the log or guard it behind an explicit dev-only flag.

## Known Bugs

**Project links may navigate to invalid/empty URLs:**
- Symptoms: Clicking a project card may navigate to an empty string URL (browser treats as current document), or `undefined` (depending on data).
- Files: `src/components/Projects.tsx`, `src/locales/en/translation.json`, `src/locales/pt/translation.json`
- Trigger: `project.url` missing/empty in i18n data; `href={project.url}` is always rendered.
- Workaround: None in code; users must avoid clicking.

**Contact email is not actionable:**
- Symptoms: Email appears as a link but does not open an email client.
- Files: `src/components/Contact.tsx`
- Trigger: Anchor uses `href="#"` rather than a `mailto:` link.
- Workaround: Copy/paste the email text.

## Security Considerations

**Unvalidated “typed” content from i18n resources:**
- Risk: Components cast `t(..., { returnObjects: true })` results to model types without runtime validation.
- Files: `src/components/Certifications.tsx`, `src/components/Projects.tsx`, `src/components/Contact.tsx`
- Current mitigation: None (pure TypeScript casts; `Object.assign` constructors in `src/models/*.tsx` do not validate).
- Recommendations: Validate/parse translation objects (e.g., schema validation) or keep them as plain objects and render defensively (null/empty checks, URL checks).

## Performance Bottlenecks

**Repeated mapping and object creation during render:**
- Problem: On every render, translation arrays are mapped and wrapped into class instances (and `imagesMap` is re-created in `Projects`).
- Files: `src/components/Certifications.tsx`, `src/components/Projects.tsx`, `src/models/Certification.tsx`, `src/models/Project.tsx`
- Cause: Derived view-models are computed inline without memoization.
- Improvement path: Use `useMemo` keyed on `i18n.language`/`t` output, and hoist stable maps/constants outside component scope.

## Fragile Areas

**Language routing vs language detection conflict:**
- Files: `src/i18n.tsx`, `src/LangRouter.tsx`, `src/MainRoutes.tsx`, `src/components/LanguageSwitcher.tsx`
- Why fragile: There are two competing sources of truth for language (URL param + `i18next-browser-languagedetector` + explicit `lng: 'en'`). This can cause flicker, unexpected redirects, and confusing state during navigation.
- Safe modification: Decide a single source of truth (URL-first or detector-first) and make the other follow it (e.g., remove `lng` override, configure `supportedLngs`, and ensure URL updates always mirror `i18n.language`).
- Test coverage: No automated tests detected for routing/i18n flows.

**Index keys and clickable wrappers in lists:**
- Files: `src/components/Projects.tsx`
- Why fragile: Uses `key={index}` at the `<a>` level; changes in list ordering can cause React to reuse DOM incorrectly, making UI bugs hard to reproduce.
- Safe modification: Use stable IDs (`project.id`) as keys and conditionally render the `<a>` only when `project.url` is valid.
- Test coverage: None.

## Scaling Limits

**Content scaling is translation-file bound:**
- Current capacity: Content lists (projects/certifications/contact) are embedded in `src/locales/*/translation.json`.
- Limit: Larger content sets become hard to maintain, translate, and validate; no tooling enforces schema parity across locales at runtime.
- Scaling path: Move structured data to separate JSON files with schema validation and import them per locale, or fetch from a CMS and validate at the boundary.

## Dependencies at Risk

**Third-party type packages can drift from runtime packages:**
- Risk: `@types/react-router-dom` version mismatch with `react-router-dom`.
- Impact: Developer friction and incorrect fixes.
- Migration plan: Remove the `@types/*` package and keep runtime deps as the single version authority.

## Missing Critical Features

**No automated tests:**
- Problem: No unit/integration/e2e tests exist under `src/` or a dedicated tests directory.
- Blocks: Safe refactors of routing/i18n, and confidence when changing content models and rendering logic.

## Test Coverage Gaps

**Routing/i18n behavior untested:**
- What's not tested: Redirect behavior (`/` → `/en`), invalid `:lang` handling, and `LanguageSwitcher` URL rewriting.
- Files: `src/LangRouter.tsx`, `src/MainRoutes.tsx`, `src/components/LanguageSwitcher.tsx`, `src/i18n.tsx`
- Risk: Regressions that only show up as navigation loops or missing translations in production.
- Priority: High

---

*Concerns audit: 2026-03-28*
