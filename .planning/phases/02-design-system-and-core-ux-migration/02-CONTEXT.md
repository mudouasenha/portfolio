# Phase 2: Design System and Core UX Migration - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the shared design-system foundation and migrate the highest-impact UX surfaces (app shell, navigation, hero) using shadcn architecture, consistent semantic tokens, and purposeful motion.

</domain>

<decisions>
## Implementation Decisions

### Non-Negotiable Architecture Constraint
- Architecture for this phase must follow shadcn patterns and primitives.
- New core UI composition should be built from shadcn-aligned component structure rather than ad-hoc one-off component patterns.

### Design Token Contract (Locked)
- Use a **single brand accent** in Phase 2.
- Visual direction: **neutral base + cyan/teal accent** (`A`).
- Migration strictness: in migrated files, **fully ban legacy hardcoded colors** (`A`); use semantic tokens instead.
- Typography: keep **Inter** as the primary typeface in Phase 2.

### Preset Fallback Execution (`b1Z5ezr60` -> Vega)
- Execution policy: **one attempt** to apply preset `b1Z5ezr60`; if unavailable/unresolvable, immediately lock Vega fallback (`A`).
- Canonical documentation: record fallback decision in **`02-CONTEXT.md` only** (`A`).
- Vega interpretation for this repo: **stronger gradients and bolder visual treatment** (`B`) while preserving clarity.
- If preset partially applies with mismatches, proceed in Phase 2 with **manual token overrides** (`yes`).

#### 2026-03-30 Execution Outcome
- Single attempt executed with `npm exec shadcn@latest -- init --preset b1Z5ezr60 ...`.
- Attempt halted at existing `components.json` overwrite gate in non-interactive execution and was treated as unresolved (no retry performed).
- **Final locked decision for Phase 2:** use **Vega fallback** and proceed with manual token overrides.
- Applied fallback profile by strengthening cyan/teal semantic token values in `src/index.css` while keeping semantic token usage and Inter typography intact.

### Shell and Navigation Migration Behavior
- Navbar behavior: **sticky on scroll** (`A`).
- Desktop nav density: **mixed layout** (`B`) (logo + section links + actions).
- Mobile nav behavior: **collapsed drawer/sheet** (`A`).
- Language switcher emphasis: keep as **utility control** (`A`), not a primary CTA.

### Hero Migration Direction
- Priority: **quick credibility scan** (`A`) over visual storytelling-first.
- CTA strategy: **add explicit CTAs in Phase 2** (`A`).
- Mobile above-the-fold: **name + title + short summary** (`B`).
- Motion level: **medium** (`B`) with reduced-motion safeguards preserved.

### Scope Guardrail
- Phase 2 remains limited to design-system foundation plus shell/nav/hero core migration.
- Additional capabilities outside this boundary are deferred to future phases.

### Claude's Discretion
- Exact token naming format and token file layout, as long as semantics are clear and shadcn-oriented.
- Exact CTA labels and destination anchors in hero, as long as they support credibility scan intent.
- Exact sticky-nav trigger thresholds and shadow/background transitions.

</decisions>

<specifics>
## Specific Ideas

- Enforce shadcn-first architecture explicitly during migration.
- Treat token replacement as mandatory in touched/migrated files (no hardcoded legacy color fallback in those files).
- Keep language switcher functional but visually secondary within navigation hierarchy.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Scope and Requirements
- `.planning/ROADMAP.md` — Phase 2 boundary, plans, and success criteria.
- `.planning/REQUIREMENTS.md` — DSYS-01..04 and UX-01..03 mapping.
- `.planning/STATE.md` — current project position and known blockers.
- `.planning/PROJECT.md` — global constraints and design contract fallback rule.
- `.planning/phases/01-baseline-stabilization/01-CONTEXT.md` — prior-phase locked decisions to avoid regressions.

### Existing Code and Integration Targets
- `src/App.tsx` — current shell composition and section ordering.
- `src/components/Navbar.tsx` — current top navigation and language switcher placement.
- `src/components/Hero.tsx` — current hero hierarchy, animation, and content structure.
- `src/components/LanguageSwitcher.tsx` — i18n switcher behavior to preserve while restyling/repositioning.
- `src/index.css` — current typography/global style baseline.
- `src/MainRoutes.tsx` and `src/LangRouter.tsx` — route/i18n continuity constraints that migration must not break.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Current section composition is centralized in `src/App.tsx`, enabling shell/nav/hero migration without touching all sections immediately.
- `LanguageSwitcher` already enforces URL-language rewriting behavior and should be reused functionally.
- `motion/react` is already the active motion import pattern from Phase 1 and should remain the sole motion path.

### Established Patterns
- Current UI relies heavily on hardcoded Tailwind color utilities and inline visual decisions; Phase 2 should replace these in migrated surfaces with semantic token usage.
- Navbar currently uses icon-link social actions and utility switcher in one row; this can be evolved into mixed desktop layout and collapsed mobile structure.
- Hero currently uses left/right split with animated heading/text/image and no explicit CTA; Phase 2 will add CTA-driven hierarchy.

### Integration Points
- shadcn foundation and token setup should occur before shell/nav/hero migration to prevent rework.
- Sticky nav behavior must not interfere with section anchors or language-prefixed routes.
- Reduced-motion safeguards must be applied consistently in hero and shell transitions while keeping medium default motion.

</code_context>

<deferred>
## Deferred Ideas

- None captured during this discussion.

</deferred>

---

*Phase: 02-design-system-and-core-ux-migration*
*Context gathered: 2026-03-29*
