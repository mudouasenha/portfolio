# Phase 1: Baseline Stabilization - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish a reliable baseline for modernization by stabilizing dependency/build behavior, locking routing and language continuity rules, and removing active-path debug/dead-code blockers. This phase does not add new user-facing capabilities.

</domain>

<decisions>
## Implementation Decisions

### Build Baseline Policy
- Remove `@types/react-router-dom` and rely on `react-router-dom` bundled types.
- Package/dependency updates are allowed as needed for modernization in this phase (not limited to narrow patch-only changes).
- Standardize clean reinstall workflow for dependency/build instability.
- Baseline quality gate for this phase requires both `npm run lint` and `npm run build` passing.

### Routing and Language Source-of-Truth Contract
- URL language segment (`/:lang/*`) is the authoritative source of truth after routing is established.
- Hybrid contract: detect preferred language only when route is `/`, then redirect immediately to `/:lang` and keep URL-authoritative behavior afterward.
- Invalid language routes (for example `/es/...`) must force redirect to `/en/...`.
- `LangRouter` should render a minimal loading fallback during language sync instead of returning `null`.

### Dead Code and Debug Cleanup Boundary
- Keep a trimmed legacy snapshot instead of deleting historical text outright (use a dedicated legacy location such as `src/legacy/`).
- In active runtime code, disallow module-level `t(...)` access; translation reads must be component/hook scoped (or passed into pure helpers).
- Opportunistic cleanup is allowed in touched files (naming/format consistency, obvious stale blocks).
- Remove active debug logs from app code.

### Phase 1 Verification Gate
- Completion verification runs from clean install state, then `npm run lint` and `npm run build`.
- Manual routing/i18n smoke checks are required:
- `/` redirects to detected language route under hybrid contract
- Invalid lang redirects to `/en`
- Language switcher updates URL and rendered content together
- Verification reporting can be command/manual pass-fail focused (no expanded narrative required).
- If lint/build pass but routing/i18n smoke fails, phase is blocked.

### Claude's Discretion
- Exact implementation details for one-time language detection at `/` (preference source precedence and utility placement).
- Exact UI text/markup for loading fallback in `LangRouter`.
- Exact location and structure of trimmed legacy snapshot, as long as active runtime path is kept clean.

</decisions>

<specifics>
## Specific Ideas

- User requested modernization latitude for dependency updates instead of conservative patch-only constraints.
- User wants historical text preserved in a legacy folder rather than hard deletion.
- User explicitly approved hybrid i18n contract (detect at `/`, then URL-authoritative).

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Scope and Requirements
- `.planning/ROADMAP.md` — Phase 1 boundary, goals, and success criteria.
- `.planning/REQUIREMENTS.md` — Requirement mapping for QLTY-01, QLTY-04, I18N-01, QAV-04.
- `.planning/STATE.md` — Current project status and known blocker notes.
- `.planning/PROJECT.md` — modernization constraints and non-negotiables.

### Current Technical Risk Context
- `.planning/codebase/CONCERNS.md` — known debt/fragility list directly relevant to this phase.
- `.planning/codebase/ARCHITECTURE.md` — routing/localization flow and system boundaries.
- `.planning/codebase/STACK.md` — dependency/tooling baseline and mismatch context.
- `.planning/codebase/TESTING.md` — current verification posture (no automated tests yet).

### Runtime Integration Targets
- `src/MainRoutes.tsx` — root and fallback redirect behavior.
- `src/LangRouter.tsx` — language validation/sync gate.
- `src/i18n.tsx` — i18n bootstrap and detector configuration.
- `src/components/LanguageSwitcher.tsx` — URL + language switching behavior.
- `src/constants/index.ts` — cleanup/legacy handling source.
- `src/components/Projects.tsx` — debug logging cleanup and content mapping behavior.
- `package.json` — dependency/type package baseline and quality scripts.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/MainRoutes.tsx` already centralizes `/` and wildcard redirect policy; this is the correct insertion point for hybrid root-detection redirect logic.
- `src/LangRouter.tsx` already validates supported language list and synchronizes `i18n.changeLanguage(lang)`; can be extended with minimal loading fallback.
- `src/components/LanguageSwitcher.tsx` already rewrites URL language segment; preserve this behavior as route authority mechanism.

### Established Patterns
- Section components use `useTranslation()` and `t(..., { returnObjects: true })` for localized structured content.
- Current app has mixed motion imports (`motion/react` and `framer-motion`), which is a Phase 1 cleanup signal tied to QLTY-01.
- No automated test harness exists currently; this phase relies on command gates plus manual continuity smoke checks.

### Integration Points
- Route-level language detection should be added around root redirect logic (`MainRoutes`), not distributed across section components.
- i18n detector settings in `src/i18n.tsx` must be aligned with the hybrid contract so runtime does not override URL authority.
- Dead-code/debug cleanup should start from `src/constants/index.ts` and `src/components/Projects.tsx`, then opportunistically extend to directly touched files.

</code_context>

<deferred>
## Deferred Ideas

- None — discussion stayed within Phase 1 scope.

</deferred>

---

*Phase: 01-baseline-stabilization*
*Context gathered: 2026-03-29*
