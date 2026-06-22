---
phase: 03-section-completion-and-quality-hardening
plan: 03
subsystem: testing
tags: [vitest, testing-library, i18n, react-router, jsdom]
requires:
  - phase: 03-02
    provides: Schema-validated locale adapters and parity validation consumed by new integration tests.
provides:
  - Integration test runtime with jsdom and shared setup.
  - Route/language continuity coverage for root redirect, invalid lang fallback, and switcher synchronization.
  - Locale parity and content-adapter safety coverage with warning-only unknown-key drift assertions.
affects: [phase-03-quality-gates, i18n-routing, localization-validation]
tech-stack:
  added: [vitest, "@testing-library/react", "@testing-library/user-event", "@testing-library/jest-dom", jsdom]
  patterns:
    [
      "Integration tests run via npm run test:integration with shared setup.",
      "Routing continuity tests assert URL and localized UI state in the same scenario.",
    ]
key-files:
  created:
    [
      tests/integration/i18n-routing.test.tsx,
      tests/integration/locale-parity.test.ts,
      tests/integration/content-adapters.test.ts,
    ]
  modified: [package.json, package-lock.json, vitest.config.ts, tests/setup.ts]
key-decisions:
  - "Used MemoryRouter with a location probe component to assert path continuity without browser navigation."
  - "Kept unknown-key locale drift warning-only while still failing required shape mismatches."
patterns-established:
  - "Integration harness includes jsdom environment, alias resolution, and browser API polyfills via tests/setup.ts."
  - "Adapter tests assert filtering behavior rather than crash semantics for malformed payloads."
requirements-completed: [I18N-02, I18N-03, QAV-02]
duration: 8min
completed: 2026-03-31
---

# Phase 03 Plan 03: Integration Routing and Locale Parity Tests Summary

**Vitest integration coverage now enforces language-route continuity and en/pt structured locale safety through repeatable CI-ready tests.**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-31T03:44:24Z
- **Completed:** 2026-03-31T03:52:05Z
- **Tasks:** 3
- **Files modified:** 7

## Accomplishments

- Added a reusable Vitest integration runtime and `test:integration` command.
- Added route/language continuity coverage for `/`, invalid lang fallback, and language switching.
- Added locale parity and content adapter integration tests for required keys and malformed payload safety.

## Task Commits

Each task was committed atomically:

1. **Task 1: Set up integration-test runtime, scripts, and base test harness** - `a32ef46` (chore)
2. **Task 2: Add route and language continuity integration tests** - `bddc512` (test)
3. **Task 3: Add locale parity and content-adapter integration tests** - `e47ba2d` (test)

**Plan metadata:** pending

## Files Created/Modified

- `package.json` - Added `test:integration` script and required integration-test dev dependencies.
- `package-lock.json` - Locked integration-test dependency graph.
- `vitest.config.ts` - Added jsdom test runtime, shared setup wiring, include glob, and `@` alias resolution.
- `tests/setup.ts` - Added jest-dom matcher setup and `IntersectionObserver` polyfill for motion components.
- `tests/integration/i18n-routing.test.tsx` - Added continuity tests for root redirect, invalid lang fallback, and language switch synchronization.
- `tests/integration/locale-parity.test.ts` - Added required-shape parity and warning-only unknown-key drift assertions.
- `tests/integration/content-adapters.test.ts` - Added valid/partial-invalid/malformed payload adapter behavior assertions.

## Decisions Made

- Used heading-role assertions (`Projects`/`Projetos`) to avoid ambiguous duplicate text matches from navigation labels.
- Kept test assertions focused on behavior contracts (path + localized render) rather than component implementation details.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added alias resolution in Vitest config**
- **Found during:** Task 2
- **Issue:** `@/MainRoutes` imports failed in integration tests.
- **Fix:** Added `resolve.alias` for `@` in `vitest.config.ts`.
- **Files modified:** `vitest.config.ts`
- **Verification:** `npm run test:integration -- tests/integration/i18n-routing.test.tsx`
- **Committed in:** `bddc512`

**2. [Rule 3 - Blocking] Added IntersectionObserver polyfill for jsdom**
- **Found during:** Task 2
- **Issue:** Motion viewport features crashed test execution (`IntersectionObserver is not defined`).
- **Fix:** Added `IntersectionObserver` mock in `tests/setup.ts`.
- **Files modified:** `tests/setup.ts`
- **Verification:** `npm run test:integration -- tests/integration/i18n-routing.test.tsx`
- **Committed in:** `bddc512`

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** Required to execute planned tests reliably; no scope creep.

## Issues Encountered

- `rtk npm install` required escalated execution to complete dependency installation in this environment.
- Integration runs emit an existing `Primitive.button.SlotClone` React ref warning from current UI code; tests still pass.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Integration foundation for route/i18n continuity and locale adapter safety is in place.
- Phase 03 remaining plans can build on `npm run test:integration` as a stable quality gate.

## Self-Check

PASSED

- FOUND: `.planning/phases/03-section-completion-and-quality-hardening/03-03-SUMMARY.md`
- FOUND: `a32ef46`
- FOUND: `bddc512`
- FOUND: `e47ba2d`

---
*Phase: 03-section-completion-and-quality-hardening*
*Completed: 2026-03-31*
