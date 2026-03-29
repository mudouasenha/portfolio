# Phase 1 Research: Baseline Stabilization

**Phase:** 1 - Baseline Stabilization  
**Researched:** 2026-03-29  
**Confidence:** HIGH  
**Primary Inputs:** `.planning/phases/01-baseline-stabilization/01-CONTEXT.md`, `.planning/REQUIREMENTS.md`, `.planning/STATE.md`, `.planning/codebase/*`

## Executive Summary

Phase 1 should focus on reliability primitives, not visual redesign. The best implementation path is:
1. Stabilize dependency/type baseline and define deterministic reinstall flow.
2. Lock routing + i18n contract around URL authority with one-time detection at `/`.
3. Remove active-path debug/dead-code blockers while preserving historical content in a legacy folder.
4. Enforce a strict completion gate: clean install, lint/build pass, and required manual routing/i18n smoke checks.

This directly addresses Phase 1 requirements (`QLTY-01`, `QLTY-04`, `I18N-01`, `QAV-04`) and sets low-risk foundations for Phase 2 migration.

## Requirement-Focused Findings

### QLTY-01: Consolidate Mixed Animation Library Usage

- Current code mixes `motion/react` and `framer-motion` imports in section components.
- `framer-motion` is imported in code but not declared in `package.json`, while `motion` is declared.
- Baseline-safe approach: normalize all animation imports to one approved library in this phase to avoid hidden dependency drift.
- Verification signal: no `framer-motion` imports remain in `src/`.

### QLTY-04: Remove Dead Code and Debug Artifacts

- `src/constants/index.ts` contains large commented legacy blocks and module-level translation access.
- `src/components/Projects.tsx` includes active render-time debug logging.
- User decision requires preserving old text in a non-runtime legacy location, then trimming active code.
- Baseline-safe approach: move preservation content to `src/legacy/` and keep runtime modules focused and reactive.

### I18N-01: Preserve Language-Prefixed Routing Stability

- Routing already flows through `MainRoutes` + `LangRouter` and supports `/:lang/*`.
- Fragility comes from competing language authorities (`LanguageDetector`, hardcoded `lng`, route param sync timing).
- User-selected hybrid contract:
- detect language only on `/`
- redirect to `/:lang`
- then route param stays authoritative
- invalid `:lang` must redirect to `/en`
- Baseline-safe approach: implement route-first sync and prevent detector from overriding active route decisions.

### QAV-04: Stable Build Process Free of Optional Dependency Blocking

- Known blocker: optional dependency instability in local environment history.
- Current scripts already provide baseline gates (`npm run lint`, `npm run build`).
- User decision requires clean-install-first verification before completion.
- Baseline-safe approach: lock a canonical reinstall/remediation sequence and use pass/fail command outputs as release evidence.

## Recommended Implementation Sequence

1. **Dependency and type baseline**
- Remove `@types/react-router-dom`.
- Reconcile animation dependency usage and imports.
- Validate fresh install path and update lockfile as needed.

2. **Routing/i18n contract lock**
- Implement one-time root detection redirect in `MainRoutes`.
- Keep `LangRouter` authoritative for route validation and sync.
- Add minimal loading fallback during `changeLanguage`.

3. **Cleanup and preservation**
- Move historical/commented data snapshots to `src/legacy/` (non-runtime path).
- Remove debug logs and dead/commented runtime blockers.
- Remove module-level `t(...)` access from active runtime modules.

4. **Verification gate execution**
- Clean install.
- `npm run lint`.
- `npm run build`.
- Manual smoke checks for `/`, invalid lang redirect, and language switch URL/content sync.

## Validation Architecture

### Objective

Guarantee that baseline changes do not regress route/i18n continuity while modernizing dependency/runtime hygiene.

### Dimensions

1. **Dependency correctness**
- `package.json` has no conflicting type/runtime pairing for router.
- Single approved motion library imports across `src/`.

2. **Runtime behavior continuity**
- `/` redirects to detected language route.
- Invalid language routes redirect to `/en`.
- Language switch updates both URL and translated UI content.

3. **Code hygiene**
- No debug `console.log` in active section render paths.
- No module-level translation reads in active runtime code.
- Legacy preservation material is isolated from runtime modules.

4. **Build gate**
- Clean-install flow completes.
- `npm run lint` and `npm run build` both pass.

### Evidence Model

- Command output pass/fail for install/lint/build.
- Grep/static checks for import cleanup and debug removal.
- Manual smoke checklist outcomes (pass/fail per item).

## Risks and Mitigations

### Risk 1: Route detection and LangRouter race conditions
- **Mitigation:** keep root detection isolated to `/` redirect path and keep `LangRouter` as post-route authority.

### Risk 2: Cleanup accidentally removing needed historical content
- **Mitigation:** migrate retained content snapshots into `src/legacy/` before trimming runtime modules.

### Risk 3: Optional dependency issues reappearing across machines
- **Mitigation:** codify clean reinstall baseline and verify from clean state before marking complete.

## Planner Guidance

- Keep Phase 1 scoped to baseline reliability; avoid pulling Phase 2 UI-system migration tasks forward.
- Treat user routing contract decisions as locked, not discretionary.
- Include explicit, grep-verifiable acceptance criteria in each plan task.
- Ensure all phase requirement IDs are mapped in plan frontmatter (`QLTY-01`, `QLTY-04`, `I18N-01`, `QAV-04`).

## Canonical References

- `.planning/ROADMAP.md`
- `.planning/REQUIREMENTS.md`
- `.planning/STATE.md`
- `.planning/phases/01-baseline-stabilization/01-CONTEXT.md`
- `.planning/codebase/CONCERNS.md`
- `.planning/codebase/ARCHITECTURE.md`
- `.planning/codebase/STACK.md`
- `.planning/codebase/TESTING.md`

---
*Research complete: 2026-03-29*  
*Ready for planning: yes*
