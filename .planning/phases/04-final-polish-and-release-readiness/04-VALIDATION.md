---
phase: 04
slug: final-polish-and-release-readiness
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-01
---

# Phase 04 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + Playwright + axe-core/playwright |
| **Config file** | `vitest.config.ts`, `playwright.config.ts` |
| **Quick run command** | `npm run lint` + `npm run test:integration` |
| **Full suite command** | `npm run verify:phase3` |
| **Estimated runtime** | ~30-60 seconds smoke / ~180 seconds full gate |

---

## Sampling Rate

- **After every task commit:** Run smoke checks (`npm run lint` and/or targeted `npm run test:integration`)
- **After every plan wave:** Run smoke checks only; defer Playwright/full gate
- **Before checkpoint/phase sign-off (`$gsd-verify-work`):** Run `npm run test:a11y` and `npm run verify:phase3`
- **Target smoke feedback latency:** 30-60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | SC-1 (responsive consistency) | integration | `npm run test:integration` | ✅ | ⬜ pending |
| 04-01-02 | 01 | 1 | SC-2 (interaction quality) | code smoke | `rg token/motion checks` + `npm run test:integration` | ✅ | ⬜ pending |
| 04-02-01 | 02 | 2 | SC-3 (docs reflect shipped architecture) | docs smoke | `rg docs/checklist linkage checks` | ✅ | ⬜ pending |
| 04-02-02 | 02 | 2 | SC-3 (release checklist evidence) | manual+docs | checklist verification | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `.planning/phases/04-final-polish-and-release-readiness/RELEASE-CHECKLIST.md` — structured release sign-off checklist with evidence links/screenshots
- [ ] `.planning/codebase/TESTING.md` — refresh to reflect actual Vitest/Playwright/a11y setup

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Reduced-motion behavior remains non-essential-motion free across polished sections | SC-2 | Automated suites do not fully assert subjective motion tone/absence of non-essential transforms | Run app with reduced-motion preference enabled, navigate all sections, verify no non-essential translate/scale/parallax animations occur |
| Mobile-first readability and action prominence in nav drawer | SC-1 | Requires visual/interaction evaluation across breakpoints | Validate at 390px viewport that drawer actions remain discoverable and tap targets are usable; capture screenshots |
| Release artifact completeness (checklist + evidence links) | SC-3 | Artifact quality and evidence linkage are documentation concerns | Confirm checklist entries are complete and every required evidence link resolves to command output or screenshot artifact |

---

## Phase Checkpoint Gates (Non-Routine)

- `npm run test:a11y`
- `npm run verify:phase3`
- Use these only at phase checkpoints/sign-off, not as per-task/per-wave routine checks.

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Smoke feedback latency <= 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
