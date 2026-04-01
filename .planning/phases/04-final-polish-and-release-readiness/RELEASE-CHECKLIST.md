# Phase 04 Release Checklist

Canonical sign-off artifact for final polish and release readiness.

## Build & Quality Gates

| Check | Command | Result | Evidence |
|---|---|---|---|
| Lint | `rtk npm run lint` | ⬜ pending | Link to terminal output/log |
| Production build | `rtk npm run build` | ⬜ pending | Link to terminal output/log |
| Integration tests | `rtk npm run test:integration` | ⬜ pending | Link to terminal output/log |
| Accessibility tests | `rtk npm run test:a11y` | ⬜ pending | Link to terminal output/log |
| Full phase gate | `rtk npm run verify:phase3` | ⬜ pending | Link to terminal output/log |

## Manual Verification

| Scenario | Expected Outcome | Result | Evidence |
|---|---|---|---|
| Mobile navigation at 390px | Drawer behavior is stable and action prominence is clear | ⬜ pending | `./evidence/mobile-nav-390.png`, `./evidence/mobile-nav-sheet.png` |
| Hero visual hierarchy on desktop | Hero remains polished and readable after final tuning | ⬜ pending | `./evidence/hero-desktop.png` |
| About image framing treatment | Framing emphasis is visible and aligned with tokenized style | ⬜ pending | `./evidence/about-image-framing.png` |
| Reduced-motion behavior | Non-essential transforms/animations are disabled when reduced motion is enabled | ⬜ pending | `./evidence/reduced-motion-note.md` |
| Performance and interaction threshold review | Automated quality signals satisfy SC-2 threshold criteria with explicit pass/fail outcome | ⬜ pending | `./evidence/performance-threshold.md` |

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
| Engineering | Pending (04-05) | Pending (04-05) | ⬜ pending |  |
| QA | Pending (04-05) | Pending (04-05) | ⬜ pending |  |
| Product/Owner | Pending (04-05) | Pending (04-05) | ⬜ pending |  |
