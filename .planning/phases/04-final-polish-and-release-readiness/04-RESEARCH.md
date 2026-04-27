# Phase 4: Final Polish and Release Readiness - Research

**Researched:** 2026-04-01
**Domain:** Frontend quality polish, motion/accessibility consistency, and release readiness documentation
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
### Visual Polish Direction
- Phase 4 uses a strong Vega-expression polish pass (not conservative cleanup).
- `About` and `Tag` must be fully tokenized to align with the design system.
- Image framing should use stronger emphasis (more pronounced visual framing than the current subtle baseline).
- Accent usage should be medium emphasis: clearly present, not over-dominant.

### Responsive Priorities
- Mobile density target is balanced readability (not compact-heavy, not editorial-spacious).
- Apply minor mobile-only reorder improvements for readability while preserving anchor behavior and continuity.
- Keep the current mobile sheet navigation pattern and increase action prominence inside the drawer.
- Execution priority is mobile-first fixes, then desktop parity/refinement.

### Interaction and Motion Quality
- Keep medium default motion level, with tighter consistency across sections.
- Reduced-motion handling is strict: disable all non-essential motion.
- Hover/focus interactions should use medium emphasis for clear affordance.
- Keep scroll-triggered reveals, but unify timing/easing globally.

### Documentation and Release Readiness Scope
- Update a full documentation pack in Phase 4: README + planning artifacts + release-readiness checklist artifacts.
- Performance reporting in docs should stay qualitative (no explicit budget numbers required).
- QA sign-off artifact must include a structured checklist plus screenshots/evidence links.
- Phase completion requires code + docs + full verification command suite passing.

### Claude's Discretion
- Exact visual implementations of the stronger image framing treatment.
- Exact mobile-only reorder approach (layout-level vs component-level) as long as continuity contracts remain intact.
- Exact unified motion timing/easing values and transition tokens.
- Exact template/format for release checklist and evidence packaging.

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within the fixed Phase 4 boundary.
</user_constraints>

## Summary
Phase 4 should be planned as a constrained quality pass, not as a feature phase. The highest-value implementation focus is to finish token migration (`About`, `Tag`), normalize motion/reduced-motion behavior, and tighten responsive readability and action prominence on mobile while preserving current section anchors and navigation architecture.

The project already has a working quality gate (`lint`, `build`, integration tests, a11y Playwright tests). Planning should explicitly sequence visual polish before docs updates, then lock a release-readiness artifact that includes evidence links and screenshot references.

Performance work should remain qualitative per user constraint, but still use standard diagnostics language (Core Web Vitals and Lighthouse) to avoid subjective-only sign-off.

**Primary recommendation:** Plan 04-01 around token/motion/responsive consistency contracts first, then plan 04-02 around evidence-backed release documentation and checklist closure.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 18.3.1 (installed), 19.2.4 (latest verified) | UI runtime | Existing app baseline; avoid major upgrades during polish-only phase. |
| Vite | 6.0.5 (installed), 8.0.3 (latest verified) | Build/dev tooling | Current repo is Vite-based and stable for current quality gates. |
| Tailwind CSS | 3.4.17 (installed), 4.2.2 (latest verified) | Tokenized styling system | Existing semantic token workflow already in use via `src/index.css`. |
| Motion (`motion/react`) | 11.17.0 (installed), 12.38.0 (latest verified) | Motion and reduced-motion handling | Already standardized across active paths; Phase 4 should normalize usage patterns. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@playwright/test` | 1.58.2 (installed), 1.59.0 (latest verified) | Automated a11y/e2e checks | Use for release sign-off evidence and accessibility regression checks. |
| `@axe-core/playwright` | 4.11.1 (installed) | Accessibility rule engine in Playwright | Use in a11y test suites for objective pass/fail results. |
| Vitest | 2.1.9 (installed), 4.1.2 (latest verified) | Integration/unit runner in repo | Use for route/i18n/content adapter regression coverage. |
| React Router | 7.6.2 (installed), 7.13.2 (latest verified) | Language-prefixed routing continuity | Keep stable; do not change route contracts in this phase. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Existing installed versions | Upgrade to latest majors in Phase 4 | Higher risk for regressions; conflicts with polish/release-readiness scope. |
| Motion-based reveal consistency | Pure CSS transitions only | Weaker centralized reduced-motion control and less parity with existing code patterns. |

**Installation:**
```bash
npm install
```

**Version verification:**
```bash
npm view react version
npm view vite version
npm view motion version
npm view tailwindcss version
npm view vitest version
npm view @playwright/test version
```

Verified latest versions and publish timestamps (UTC, checked 2026-04-01):
- `react@19.2.4` — published 2026-01-26
- `vite@8.0.3` — published 2026-03-26
- `motion@12.38.0` — published 2026-03-17
- `tailwindcss@4.2.2` — published 2026-03-18
- `vitest@4.1.2` — published 2026-03-26
- `@playwright/test@1.59.0` — published 2026-04-01

## Architecture Patterns

### Recommended Project Structure
```text
src/
├── components/        # Section and UI primitives polish surfaces
├── components/sections/  # Shared section shells/cards/headers for consistency
├── index.css          # Semantic tokens and global visual calibration
└── App.tsx            # Section composition and scroll-anchor continuity

tests/
├── integration/       # i18n/routing/content consistency
└── a11y/              # Playwright + axe accessibility checks
```

### Pattern 1: Token-First Section Polish
**What:** Replace legacy utility color classes with semantic token classes (`border-border`, `bg-card`, `text-foreground`, etc.).
**When to use:** Any touched surface in `About`, `Tag`, and related section-level visual pass.
**Example:**
```tsx
// Source: src/components/sections/SectionCard.tsx
<article className="rounded-xl border border-border bg-card text-card-foreground shadow-sm" />
```

### Pattern 2: Reduced-Motion Guardrails
**What:** Gate non-essential motion using `useReducedMotion` and use opacity/static fallbacks.
**When to use:** Entry animations, scroll reveals, or transform-heavy interactions.
**Example:**
```tsx
// Source: https://motion.dev/docs/react-use-reduced-motion
const shouldReduceMotion = useReducedMotion()
const closedX = shouldReduceMotion ? 0 : "-100%"
```

### Pattern 3: Mobile-First Parity Then Desktop Refinement
**What:** Apply spacing/hierarchy/action-prominence changes for mobile first, then verify desktop parity.
**When to use:** Navbar sheet actions, section density, visual framing updates.
**Example:**
```tsx
// Source: src/components/Navbar.tsx
<div className="flex items-center gap-2 lg:hidden">...</div>
<div className="hidden items-center gap-2 lg:flex">...</div>
```

### Anti-Patterns to Avoid
- **Polish via one-off hardcoded classes:** creates drift from token system; use `index.css` tokens and shared primitives.
- **Motion consistency by copy-paste values:** centralize timing/easing tokens to avoid section divergence.
- **Scope creep into feature work:** Phase 4 is quality/release readiness only.
- **Route or anchor changes during polish:** risks breaking continuity and tests from Phases 1-3.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Reduced-motion preference detection | Custom `matchMedia` wrappers everywhere | `useReducedMotion` + `MotionConfig` | Built-in handling is reactive and less error-prone. |
| Accessibility regression checks | Manual-only QA notes | Playwright + `@axe-core/playwright` tests | Repeatable, automatable, evidence-producing checks. |
| Visual tokens per-component ad hoc | Component-local color constants | Central semantic tokens in `src/index.css` | Maintains consistency and simplifies later tuning. |
| Release sign-off memory checklist | Informal “looks good” process | Structured checklist with artifact links | Prevents missed gates and supports auditable release readiness. |

**Key insight:** Phase 4 succeeds by standardizing existing systems, not by inventing new infrastructure.

## Common Pitfalls

### Pitfall 1: “Polish” introduces architecture regressions
**What goes wrong:** Visual tweaks accidentally alter anchor order, routing behavior, or section continuity.
**Why it happens:** Changes are made directly in composition/layout without preserving contracts.
**How to avoid:** Treat `App.tsx` section order and anchor IDs as immutable for this phase.
**Warning signs:** Integration tests for i18n routing/parity start failing after layout edits.

### Pitfall 2: Incomplete reduced-motion implementation
**What goes wrong:** Some transforms/scroll reveals remain active for reduced-motion users.
**Why it happens:** Reduced motion applied only in top-level components, not section-level interactions.
**How to avoid:** Add an explicit reduced-motion acceptance checklist and verify section by section.
**Warning signs:** Motion still visible in reduced-motion mode on subsection cards/elements.

### Pitfall 3: Token drift in final pass
**What goes wrong:** New hardcoded classes are added while fixing visual details.
**Why it happens:** Fast cosmetic iteration bypasses design tokens.
**How to avoid:** Require token-only styling in touched files and run targeted grep checks.
**Warning signs:** `neutral-*`, `purple-*`, direct hex values reappear in updated components.

### Pitfall 4: Documentation does not reflect shipped reality
**What goes wrong:** README/planning docs lag behind implementation and test commands.
**Why it happens:** Docs are treated as afterthought after UI work.
**How to avoid:** Make 04-02 a first-class plan with explicit artifact inventory and verification matrix.
**Warning signs:** `.planning/codebase/TESTING.md` still states no test framework while tests exist.

## Code Examples

Verified patterns from official and in-repo sources:

### Reduced Motion Hook Usage
```tsx
// Source: https://motion.dev/docs/react-use-reduced-motion
import { useReducedMotion } from "motion/react"

const shouldReduceMotion = useReducedMotion()
```

### Existing App-Level Motion Guard
```tsx
// Source: src/App.tsx
const reduceMotion = useReducedMotion()

<motion.main
  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
  transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }}
/>
```

### Section Token Pattern
```tsx
// Source: src/components/sections/SectionShell.tsx
<section className="border-b border-border pb-16 sm:pb-20" />
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| CLS/FCP-centric perf narratives | Core Web Vitals includes INP with LCP/CLS focus | 2024-2026 ecosystem baseline | Better interaction quality framing for release-readiness discussions. |
| Manual accessibility spot-check only | Automated Playwright + axe checks in CI/local gate | Established in Phase 3 | Repeatable and evidence-backed accessibility sign-off. |
| Section-specific styling drift | Shared primitives + semantic tokens | Phases 2-3 | Faster and safer final polish consistency passes. |

**Deprecated/outdated:**
- `.planning/codebase/TESTING.md` current content: outdated (claims no framework/tests detected) and must be corrected in 04-02.

## Open Questions

1. **Should Phase 4 include dependency upgrades or remain lock-version?**
   - What we know: scope is polish/release readiness, not platform migration.
   - What's unclear: whether user wants opportunistic minor upgrades.
   - Recommendation: keep lock-version for Phase 4; defer upgrades to a dedicated follow-up phase.

2. **What is the exact release checklist artifact format?**
   - What we know: must include structured checklist + screenshots/evidence links.
   - What's unclear: preferred file path and markdown schema.
   - Recommendation: define one canonical checklist file in `.planning/phases/04-final-polish-and-release-readiness/` and reference it from README.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 2.1.9 + Playwright 1.58.2 + `@axe-core/playwright` 4.11.1 |
| Config file | `vitest.config.ts`, `playwright.config.ts` |
| Quick run command | `npm run test:integration` |
| Full suite command | `npm run verify:phase3` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PH4-SC1 | Mobile/desktop polish remains structurally consistent and routable | integration | `npm run test:integration` | ✅ |
| PH4-SC2 | Interaction/motion quality and reduced-motion behavior remain accessible | a11y + manual motion spot check | `npm run test:a11y` | ✅ |
| PH4-SC3 | Release docs/checklists match shipped architecture and checks | docs verification + full gate | `npm run verify:phase3` | ✅ (commands), ❌ (Phase 4 checklist doc) |

### Sampling Rate
- **Per task commit:** `npm run test:integration`
- **Per wave merge:** `npm run verify:phase3`
- **Phase gate:** `npm run verify:phase3` green plus checklist/evidence artifact complete

### Wave 0 Gaps
- [ ] `.planning/phases/04-final-polish-and-release-readiness/RELEASE-CHECKLIST.md` — structured sign-off with evidence links
- [ ] `.planning/codebase/TESTING.md` refresh — align with actual Vitest/Playwright setup
- [ ] Reduced-motion manual verification note template — section-by-section acceptance evidence

## Sources

### Primary (HIGH confidence)
- Motion docs — `https://motion.dev/docs/react-use-reduced-motion` (hook behavior and usage)
- Motion accessibility guide — `https://motion.dev/motion/guide-accessibility/` (`MotionConfig reducedMotion="user"` guidance)
- web.dev Core Web Vitals thresholds — `https://web.dev/articles/defining-core-web-vitals-thresholds`
- web.dev LCP optimization reference — `https://web.dev/articles/optimize-lcp`
- web.dev CLS optimization reference — `https://web.dev/articles/optimize-cls`
- Playwright best practices — `https://playwright.dev/docs/best-practices`
- Playwright accessibility testing — `https://playwright.dev/docs/next/accessibility-testing`
- Chrome Lighthouse scoring reference — `https://developer.chrome.com/docs/lighthouse/performance/performance-scoring`

### Secondary (MEDIUM confidence)
- Project-local implementation surfaces: `src/App.tsx`, `src/components/Navbar.tsx`, `src/components/About.tsx`, `src/components/Tag.tsx`, `src/index.css`
- Project test configuration: `vitest.config.ts`, `playwright.config.ts`, `tests/integration/*`, `tests/a11y/*`

### Tertiary (LOW confidence)
- None

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - verified against npm registry on 2026-04-01 and cross-checked with installed repo versions.
- Architecture: HIGH - based on direct codebase inspection plus locked Phase 4 context.
- Pitfalls: HIGH - derived from known project state, prior phase constraints, and official tooling guidance.

**Research date:** 2026-04-01
**Valid until:** 2026-05-01 (30 days)

## RESEARCH COMPLETE

**Phase:** 04 - final-polish-and-release-readiness
**Confidence:** HIGH

### Key Findings
- Phase 4 should not include dependency/platform upgrades; use a lock-version polish strategy.
- `About` and `Tag` are confirmed tokenization hotspots and should be first-class tasks in 04-01.
- Reduced-motion handling should be normalized with Motion’s built-in patterns, not bespoke logic.
- Existing automated quality gate is sufficient for release-readiness verification, but docs are stale and must be updated.
- Release sign-off must be evidence-backed (checklist + screenshots/links), not command-only assertions.

### File Created
`.planning/phases/04-final-polish-and-release-readiness/04-RESEARCH.md`

### Confidence Assessment
| Area | Level | Reason |
|------|-------|--------|
| Standard Stack | HIGH | npm-verified versions + repository baseline constraints align with phase scope |
| Architecture | HIGH | direct inspection of implementation files and locked context contracts |
| Pitfalls | HIGH | grounded in current code patterns, prior phase guardrails, and official docs |

### Open Questions
- Confirm whether the user wants any dependency changes included in Phase 4 (recommendation: no).
- Confirm preferred filename/location for the release checklist artifact.

### Ready for Planning
Research complete. Planner can now create PLAN.md files.
