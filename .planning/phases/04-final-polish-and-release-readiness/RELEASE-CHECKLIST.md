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
| Mobile navigation at 390px | Drawer behavior is stable and action prominence is clear | ⬜ pending | `mobile-nav-390.png`, `mobile-nav-sheet.png` |
| Hero visual hierarchy on desktop | Hero remains polished and readable after final tuning | ⬜ pending | `hero-desktop.png` |
| About image framing treatment | Framing emphasis is visible and aligned with tokenized style | ⬜ pending | `about-image-framing.png` |
| Reduced-motion behavior | Non-essential transforms/animations are disabled when reduced motion is enabled | ⬜ pending | Link to recording or QA note |

## Evidence Links

- Command logs:
  - `rtk npm run lint`: TODO
  - `rtk npm run build`: TODO
  - `rtk npm run test:integration`: TODO
  - `rtk npm run test:a11y`: TODO
  - `rtk npm run verify:phase3`: TODO
- Screenshots:
  - `mobile-nav-390.png`: TODO
  - `mobile-nav-sheet.png`: TODO
  - `hero-desktop.png`: TODO
  - `about-image-framing.png`: TODO

## Sign-off

| Role | Name | Date | Status | Notes |
|---|---|---|---|---|
| Engineering | TODO | TODO | ⬜ pending |  |
| QA | TODO | TODO | ⬜ pending |  |
| Product/Owner | TODO | TODO | ⬜ pending |  |
