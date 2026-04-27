---
phase: 03
slug: section-completion-and-quality-hardening
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-31
---

# Phase 03 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + Testing Library + Playwright + `@axe-core/playwright` |
| **Config file** | none — Wave 0 installs `vitest.config.ts` and `playwright.config.ts` |
| **Quick run command** | `npm run test:integration` |
| **Full suite command** | `npm run lint && npm run build && npm run test:integration && npm run test:a11y` |
| **Estimated runtime** | ~180 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run test:integration`
- **After every plan wave:** Run `npm run lint && npm run build && npm run test:integration`
- **Before `$gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 240 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | QLTY-03 | integration | `npm run test:integration -- tests/integration/section-contract.test.ts` | ❌ W0 | ⬜ pending |
| 03-02-01 | 02 | 1 | QLTY-02, I18N-03 | unit/integration | `npm run test:integration -- tests/integration/content-adapters.test.ts && npm run test:integration -- tests/integration/locale-parity.test.ts` | ❌ W0 | ⬜ pending |
| 03-03-01 | 03 | 2 | I18N-02, QAV-02 | integration | `npm run test:integration -- tests/integration/i18n-routing.test.ts` | ❌ W0 | ⬜ pending |
| 03-04-01 | 04 | 2 | UX-04, QAV-03 | integration + a11y | `npm run test:integration -- tests/integration/actions.test.ts && npm run test:a11y` | ❌ W0 | ⬜ pending |
| 03-04-02 | 04 | 2 | QAV-01 | quality gate | `npm run lint && npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest.config.ts` — jsdom environment and integration test include globs
- [ ] `playwright.config.ts` — local server + a11y test project configuration
- [ ] `tests/setup.ts` — shared Testing Library and matcher setup
- [ ] `tests/integration/i18n-routing.test.ts` — language continuity (`/` redirect, invalid lang fallback, switcher parity)
- [ ] `tests/integration/locale-parity.test.ts` — `en`/`pt` schema parity for structured translation payloads
- [ ] `tests/integration/content-adapters.test.ts` — invalid payload filtering + localized section fallback behavior
- [ ] `tests/integration/actions.test.ts` — contact/project action visibility, explicit labels, outbound behavior
- [ ] `tests/a11y/homepage.a11y.spec.ts` — homepage + key section scans
- [ ] `tests/a11y/mobile-nav.a11y.spec.ts` — mobile menu/navigation accessibility scans
- [ ] `npm install zod && npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom @playwright/test @axe-core/playwright`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual consistency across migrated sections (`Technologies`, `Skills`, `Experience`, `Projects`, `Certifications`, `Contact`) | QLTY-03 | Requires design judgment across breakpoints and motion cadence | Verify section spacing rhythm, title hierarchy, and hover/reveal intensity on mobile + desktop |
| Outbound-link disclosure clarity in project/contact actions | UX-04 | A11y tools cannot validate semantic clarity of disclosure wording/icons | Validate each external action shows disclosure cue and opens in a new tab |
| Fallback microcopy quality for invalid structured payloads in both locales | I18N-03 | Localization quality/tone cannot be fully machine-evaluated | Force invalid payload in each section and verify localized fallback message is clear in `en` and `pt` |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 240s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
