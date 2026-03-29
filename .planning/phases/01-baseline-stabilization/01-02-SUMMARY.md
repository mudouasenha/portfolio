---
phase: 01-baseline-stabilization
plan: 02
subsystem: ui
tags: [react-router, i18next, i18n, routing, accessibility]
requires: []
provides:
  - "Root redirect now detects preferred language one time and routes to /:lang"
  - "URL language segment remains authoritative after route resolution"
  - "LangRouter now exposes an accessible loading state during language sync"
  - "LanguageSwitcher persists selected language to localStorage"
affects: [01-03, phase-02, localization]
tech-stack:
  added: []
  patterns:
    - "Hybrid i18n contract: detect only on /, then URL-authoritative behavior"
    - "Route guard fallback for unsupported language segments to /en"
key-files:
  created:
    - src/features/i18n/detectPreferredLanguage.ts
  modified:
    - src/MainRoutes.tsx
    - src/i18n.tsx
    - src/LangRouter.tsx
    - src/components/LanguageSwitcher.tsx
key-decisions:
  - "Preferred language detection order is localStorage('portfolio.lang') then navigator.language then en."
  - "LangRouter uses a minimal aria-live polite loading status instead of rendering null."
patterns-established:
  - "Language resolution utility is isolated under src/features/i18n for route bootstrap use."
  - "Switcher updates i18n state, persisted preference, and URL segment in one handler."
requirements-completed: [I18N-01]
duration: 14min
completed: 2026-03-29
---

# Phase 01 Plan 02: Routing and Language Contract Summary

**Language routing now follows a deterministic hybrid model: root detects preference once, then route language drives rendering and switch behavior.**

## Performance

- **Duration:** 14 min
- **Started:** 2026-03-29T22:53:40Z
- **Completed:** 2026-03-29T23:07:06Z
- **Tasks:** 3
- **Files modified:** 5

## Accomplishments
- Added `detectPreferredLanguage()` utility with localStorage and browser-language fallback.
- Replaced hardcoded `/en` root redirect with dynamic redirect based on detected preference.
- Removed active `LanguageDetector` bootstrap path, added explicit `supportedLngs`, and introduced accessible loading fallback in `LangRouter`.
- Persisted language preference in `LanguageSwitcher` while preserving URL-segment and `i18n.changeLanguage` sync.

## Task Commits

Each task was committed atomically:

1. **Task 1: Add one-time root language detection utility and route redirect integration** - `8f74bcf` (feat)
2. **Task 2: Align i18n bootstrap and LangRouter with URL-authoritative contract** - `c483df9` (fix)
3. **Task 3: Persist language preference from LanguageSwitcher** - `301ac73` (feat)

**Plan metadata:** pending (this summary/state commit)

## Files Created/Modified
- `src/features/i18n/detectPreferredLanguage.ts` - Utility for one-time root language detection.
- `src/MainRoutes.tsx` - Root route now redirects to detected language.
- `src/i18n.tsx` - i18n bootstrap aligned to URL-authoritative contract.
- `src/LangRouter.tsx` - Accessible loading fallback and maintained invalid-lang redirect.
- `src/components/LanguageSwitcher.tsx` - Persisted selected language to localStorage before navigation.

## Decisions Made
- Keep detection scope limited to `/` to avoid competing language authorities after route resolution.
- Maintain `/en` as deterministic fallback for unsupported route language segments.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Local verification tools missing in environment**
- **Found during:** Plan-level verification
- **Issue:** `npm run lint` initially failed because `eslint` executable was unavailable.
- **Fix:** Installed project dependencies with `npm install`, then reran verification.
- **Files modified:** None tracked
- **Verification:** `npm run lint` and `npm run build` both passed after install.
- **Committed in:** N/A (environment-only fix, no repository file changes)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** No scope change; fix was required to run mandatory verification commands.

## Issues Encountered
- `rtk npm install` produced delayed/no streamed output in this environment; completion was confirmed by presence of `node_modules/.bin/eslint` and successful lint/build runs.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Routing and language continuity contract is implemented and stable for subsequent cleanup/migration work.
- Manual smoke checks remain recommended in-browser: `/` redirect behavior, `/es` fallback to `/en`, and switcher URL/content sync.

---
*Phase: 01-baseline-stabilization*
*Completed: 2026-03-29*

## Self-Check: PASSED

- FOUND: `.planning/phases/01-baseline-stabilization/01-02-SUMMARY.md`
- FOUND: `8f74bcf`
- FOUND: `c483df9`
- FOUND: `301ac73`
