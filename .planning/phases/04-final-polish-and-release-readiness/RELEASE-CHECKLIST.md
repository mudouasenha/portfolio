# Phase 04 Release Checklist

Canonical sign-off artifact for final polish and release readiness.

## Build & Quality Gates

| Check | Command | Result | Evidence |
|---|---|---|---|
| Lint | `rtk npm run lint` | ✅ pass | `./evidence/lint.log` |
| Production build | `rtk npm run build` | ✅ pass | `./evidence/build.log` |
| Integration tests | `rtk npm run test:integration` | ✅ pass | `./evidence/integration.log` |
| Accessibility tests | `rtk npm run test:a11y` | ✅ pass | `./evidence/a11y.log` |
| Full phase gate | `rtk npm run verify:phase3` | ✅ pass | `./evidence/verify-phase3.log` |

## Manual Verification

| Scenario | Expected Outcome | Result | Evidence |
|---|---|---|---|
| Mobile navigation at 390px | Drawer behavior is stable and action prominence is clear | ✅ pass | `./evidence/mobile-nav-390.png`, `./evidence/mobile-nav-sheet.png` |
| Hero visual hierarchy on desktop | Hero remains polished and readable after final tuning | ✅ pass | `./evidence/hero-desktop.png` |
| About image framing treatment | Framing emphasis is visible and aligned with tokenized style | ✅ pass | `./evidence/about-image-framing.png` |
| Reduced-motion behavior | Non-essential transforms/animations are disabled when reduced motion is enabled | ✅ pass | `./evidence/reduced-motion-note.md` |
| Performance and interaction threshold review | Automated quality signals satisfy SC-2 threshold criteria with explicit pass/fail outcome | ✅ pass | `./evidence/performance-threshold.md` |

## Evidence Links

- Command logs:
  - `rtk npm run lint`: `./evidence/lint.log`
  - `rtk npm run build`: `./evidence/build.log`
  - `rtk npm run test:integration`: `./evidence/integration.log`
  - `rtk npm run test:a11y`: `./evidence/a11y.log`
  - `rtk npm run verify:phase3`: `./evidence/verify-phase3.log`
- Screenshots:
  - `mobile-nav-390.png`: `./evidence/mobile-nav-390.png`
  - `mobile-nav-sheet.png`: `./evidence/mobile-nav-sheet.png`
  - `hero-desktop.png`: `./evidence/hero-desktop.png`
  - `about-image-framing.png`: `./evidence/about-image-framing.png`
  - `reduced-motion-note.md`: `./evidence/reduced-motion-note.md`
  - `performance-threshold.md`: `./evidence/performance-threshold.md`

## Sign-off

| Role | Name | Date | Status | Notes |
|---|---|---|---|---|
| Engineering | Claude | 2026-04-01 | ✅ complete | All automated gates passed with linked logs |
| QA | User | 2026-04-01 | ✅ complete | Manual screenshots and reduced-motion note attached |
| Product/Owner | User | 2026-04-01 | ✅ complete | Release checklist reviewed and accepted |
