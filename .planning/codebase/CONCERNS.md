# Codebase Concerns

**Last Updated:** 2026-04-01

This file tracks active risks only.

## Active Risks

### Playwright host dependency gate for a11y verification

- **Issue:** `rtk npm run test:a11y` can fail on Linux hosts without required Chromium libraries.
- **Impact:** Full gate (`rtk npm run verify:phase3`) may fail even when app code is healthy.
- **Mitigation:** Run `rtk npm run a11y:install-deps` before a11y/phase verification and keep this prerequisite explicit in release docs.

### Manual visual evidence remains required for release sign-off

- **Issue:** Automated tests do not replace screenshot-based visual QA for final polish claims.
- **Impact:** Release readiness can be declared without auditable visual evidence if checklist is skipped.
- **Mitigation:** Keep `.planning/phases/04-final-polish-and-release-readiness/RELEASE-CHECKLIST.md` as the source of truth and require screenshot evidence keys before sign-off.

### Locale content drift can still appear as warning-only parity gaps

- **Issue:** Locale parity signaling is warning-first; unknown keys may not block execution.
- **Impact:** Copy inconsistencies can slip into release unless logs are reviewed.
- **Mitigation:** Include parity and route continuity checks in integration test runs and review warning output during verification.
