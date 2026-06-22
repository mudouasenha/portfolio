---
phase: 02
slug: design-system-and-core-ux-migration
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-29
---

# Phase 02 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (Wave 0 setup required) |
| **Config file** | none — Wave 0 installs |
| **Quick run command** | `npm run lint` |
| **Full suite command** | `npm run lint && npm run build` |
| **Estimated runtime** | ~60 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run lint`
- **After every plan wave:** Run `npm run lint && npm run build`
- **Before `$gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 120 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | DSYS-01 | static checks | `npm run lint && npm run build` | ✅ | ⬜ pending |
| 02-02-01 | 02 | 1 | DSYS-02 | static checks | `npm run lint && npm run build` | ✅ | ⬜ pending |
| 02-03-01 | 03 | 2 | UX-01, UX-02 | static checks + manual UI | `npm run lint && npm run build` | ✅ | ⬜ pending |
| 02-04-01 | 04 | 2 | UX-03 | static checks + manual reduced-motion QA | `npm run lint && npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/test/` (or equivalent) — initialize Vitest test scaffold
- [ ] `vitest.config.*` — test runner configuration
- [ ] `@testing-library/react` and supporting deps — if UI tests are added in this phase

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Sticky navbar behavior across breakpoints | UX-01 | visual interaction fidelity | Validate on mobile/desktop; ensure no overlap with hero and no route regressions |
| Hero hierarchy + CTA prominence | UX-02 | subjective hierarchy check | Compare above-the-fold composition on mobile and desktop against context decisions |
| Reduced-motion behavior | UX-03 | OS setting integration | Enable reduced motion in OS/browser and verify animations are toned down or removed |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 120s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
