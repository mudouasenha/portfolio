---
phase: 1
slug: baseline-stabilization
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-29
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | none — command-gate validation (lint/build + targeted manual smoke) |
| **Config file** | none |
| **Quick run command** | `npm run lint` |
| **Full suite command** | `npm run lint && npm run build` |
| **Estimated runtime** | ~120 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run lint`
- **After every plan wave:** Run `npm run lint && npm run build`
- **Before `$gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 180 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | QAV-04 | command gate | `npm run lint && npm run build` | ✅ | ⬜ pending |
| 1-01-02 | 02 | 1 | I18N-01 | static + smoke prep | `npm run lint && npm run build` | ✅ | ⬜ pending |
| 1-01-03 | 03 | 2 | QLTY-01, QLTY-04 | static checks | `rg -n "framer-motion|console\\.log\\(" src` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Existing infrastructure covers phase requirements; no test-runner bootstrap required for Phase 1.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| `/` redirects to detected language route | I18N-01 | No route automation harness exists yet | Open `/`; confirm redirect to `/en` or `/pt` based on detection contract |
| Invalid language route redirects to `/en` | I18N-01 | No integration test harness yet | Navigate to `/es`; confirm redirect to `/en` preserving path/search when applicable |
| Language switch updates URL and rendered content together | I18N-01 | UI interaction currently only manually verifiable | Use language switcher on a content section page; confirm URL segment and translated content both change |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 180s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
