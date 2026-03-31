# Roadmap: Portfolio Frontend Modernization

## Overview

This roadmap modernizes the existing portfolio through a controlled brownfield path: stabilize environment and behavior first, establish a shadcn and tokenized design system foundation, complete UX migration with section parity and quality hardening, then finish with final polish.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [x] **Phase 1: Baseline Stabilization** - Lock environment, routing continuity, and migration guardrails.
- [x] **Phase 2: Design System and Core UX Migration** - Establish shadcn foundation and migrate shell and key sections. (completed 2026-03-30)
- [ ] **Phase 3: Section Completion and Quality Hardening** - Complete section migration, validation, testing, and accessibility.
- [ ] **Phase 4: Final Polish and Release Readiness** - Tune final UX quality, performance, and documentation.

## Phase Details

### Phase 1: Baseline Stabilization
**Goal**: Establish a reliable technical baseline before visual and system migration.  
**Depends on**: Nothing (first phase)  
**Requirements**: QLTY-01, QLTY-04, I18N-01, QAV-04  
**Success Criteria** (what must be TRUE):
  1. Build and dependency baseline is stable for migration work.
  2. Routing and language continuity behavior is documented and preserved.
  3. Known code-level blockers are identified and triaged with explicit fixes.
**Plans**: 3 plans

Plans:
- [x] 01-01: Resolve dependency and build baseline issues.
- [x] 01-02: Normalize routing and language source-of-truth behavior.
- [x] 01-03: Remove debug and dead-code blockers in active paths.

### Phase 2: Design System and Core UX Migration
**Goal**: Build shared design system foundation and deliver high-impact UX migration.  
**Depends on**: Phase 1  
**Requirements**: DSYS-01, DSYS-02, DSYS-03, DSYS-04, UX-01, UX-02, UX-03  
**Success Criteria** (what must be TRUE):
  1. shadcn foundation is initialized and integrated in the app.
  2. Preset `b1Z5ezr60` is applied or Vega fallback is selected and documented.
  3. App shell, navigation, and hero are migrated with improved hierarchy and consistent motion.
  4. Shared primitives and semantic theme tokens are used across migrated core sections.
**Plans**: 4 plans

Plans:
- [ ] 02-01: Initialize shadcn and base theme primitives.
- [ ] 02-02: Validate preset `b1Z5ezr60`; apply Vega fallback if unresolved.
- [ ] 02-03: Migrate app shell, navigation, and hero.
- [ ] 02-04: Apply motion conventions and reduced-motion safeguards.

### Phase 3: Section Completion and Quality Hardening
**Goal**: Complete remaining migration and lock quality with verification gates.  
**Depends on**: Phase 2  
**Requirements**: UX-04, QLTY-02, QLTY-03, I18N-02, I18N-03, QAV-01, QAV-02, QAV-03  
**Success Criteria** (what must be TRUE):
  1. Remaining sections are migrated and visually consistent.
  2. Translation-derived structured data is validated before rendering.
  3. Language switching and translation parity remain correct.
  4. Lint, typecheck, integration tests, and accessibility checks pass.
**Plans**: 4 plans

Plans:
- [ ] 03-01-PLAN.md — Migrate remaining sections to shared primitives and enforce action visibility contract.
- [ ] 03-02-PLAN.md — Add runtime schema adapters for translation-derived structured payloads.
- [ ] 03-03-PLAN.md — Add integration tests for route/language continuity and locale parity.
- [ ] 03-04-PLAN.md — Add automated accessibility verification and strict phase quality gate.

### Phase 4: Final Polish and Release Readiness
**Goal**: Finalize presentation quality and complete release documentation updates.  
**Depends on**: Phase 3  
**Requirements**: (cross-phase completion)  
**Success Criteria** (what must be TRUE):
  1. Mobile and desktop experiences are polished and consistent.
  2. Performance and interaction quality are within acceptable thresholds.
  3. Documentation and planning artifacts reflect shipped architecture.
**Plans**: 2 plans

Plans:
- [ ] 04-01: Final responsive, motion, and visual polish pass.
- [ ] 04-02: Update docs and release readiness checklist.

## Progress

**Execution Order:**  
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Baseline Stabilization | 3/3 | Complete | 2026-03-29 |
| 2. Design System and Core UX Migration | 4/4 | Complete   | 2026-03-30 |
| 3. Section Completion and Quality Hardening | 0/4 | Not started | - |
| 4. Final Polish and Release Readiness | 0/2 | Not started | - |
