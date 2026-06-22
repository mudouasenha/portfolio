# Phase 2: Design System and Core UX Migration - Research

**Researched:** 2026-03-30
**Reasoning Pass:** High (rerun, artifact reuse)
**Domain:** shadcn/ui foundation + semantic token architecture + core UX shell/nav/hero migration
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
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

### Deferred Ideas (OUT OF SCOPE)
- None captured during this discussion.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DSYS-01 | Application uses a shadcn-based component foundation with semantic design tokens. | shadcn Vite init flow, `components.json` + CSS variable token model, semantic utility usage (`bg-background`, `text-foreground`). |
| DSYS-02 | Design contract is enforced by using preset `b1Z5ezr60`, or Vega style fallback when preset is unavailable. | Official preset-capable init flow (`--preset [CODE] --template vite`) plus locked one-attempt fallback protocol. |
| DSYS-03 | Shared UI primitives are centralized and reused across all migrated sections. | `src/components/ui/*` primitive strategy with shadcn-generated components (`sheet`, `navigation-menu`, `button`, etc.). |
| DSYS-04 | Hardcoded legacy color classes in migrated components are replaced by token-based styling. | shadcn CSS-variable theming + semantic token-only migration rules + hardcoded color ban in touched files. |
| UX-01 | Navigation and section hierarchy are clear and consistent on desktop and mobile. | Sticky mixed desktop nav + mobile `Sheet` drawer pattern + utility-level language switcher hierarchy. |
| UX-02 | Hero and section layouts communicate key value and project credibility with stronger visual hierarchy. | Credibility-first hero information architecture with explicit CTA cluster and mobile above-fold constraints. |
| UX-03 | Motion is purposeful, consistent, and respects reduced-motion preferences. | Keep `motion/react` only + `useReducedMotion` gating to reduce transforms/parallax/large movement. |
</phase_requirements>

## Summary

Phase 2 should be planned as a strict foundation-first migration: initialize shadcn in this existing Vite app, lock semantic token architecture, then migrate only app shell + navigation + hero on those tokens. This directly satisfies DSYS-01/02/03/04 while avoiding broad section churn.

The highest planning risk is not visual design itself but migration consistency: partial tokenization, mixed old/new nav patterns, and motion behavior drifting from reduced-motion expectations. The phase plan should enforce sequence gates: foundation setup, preset attempt + fallback decision capture, primitive assembly, then UX migration.

**Primary recommendation:** Plan Phase 2 as 4 waves aligned to existing roadmap plans (02-01..02-04) with explicit file-level acceptance checks for token purity, shadcn primitive use, and reduced-motion behavior.

## High-Reasoning Rerun Delta

This pass reuses existing context/research artifacts and tightens assumptions and execution gates instead of redefining scope.

### Dependency and Assumption Tightening
- Treat registry versions as advisory snapshots; execution should pin and verify against the local lockfile before applying shadcn-generated changes.
- If shadcn CLI output shape differs from prior expectations, preserve shadcn architecture intent (primitives + semantic tokens) instead of forcing exact file templates.
- Keep `motion/react` as the only animation path in touched files; regressions are flagged at plan level, not deferred.

### Sequencing Risk Controls
- Enforce a hard gate between 02-01 and 02-03: no shell/nav/hero migration before primitives and token contract are established.
- Enforce a hard gate in 02-02: exactly one preset attempt, then immediate Vega fallback if unresolved; no retry loops.
- Enforce a hard gate in 02-04: reduced-motion behavior must be manually verified in both `en` and `pt` routes.

### Requirement-to-Plan Mapping (Execution Contract)
| Requirement | Primary Plan | Gate |
|---|---|---|
| DSYS-01 | 02-01 | shadcn foundation initialized and buildable |
| DSYS-02 | 02-02 | one-attempt preset path resolved, decision documented |
| DSYS-03 | 02-01, 02-03 | shared primitives are consumed by migrated shell/nav/hero |
| DSYS-04 | 02-03 | token-only styling in migrated files, hardcoded color scan clean |
| UX-01 | 02-03 | sticky mixed desktop nav + mobile sheet behavior verified |
| UX-02 | 02-03 | credibility-first hero + explicit CTA hierarchy verified |
| UX-03 | 02-04 | consistent motion with reduced-motion safeguards verified |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| shadcn CLI (`shadcn`) | latest CLI (invoked via `npx shadcn@latest`) | Initialize and generate shadcn-aligned components in Vite project | Officially documented path for Vite + preset flow and component generation. |
| tailwindcss | 4.2.2 (published 2026-03-18) | Token-driven utility styling via theme variables | shadcn v4 docs assume Tailwind v4-compatible setup and CSS-variable theming. |
| motion | 12.38.0 (published 2026-03-17) | Unified animation primitives + reduced-motion hook | Already standardized in repo (`motion/react`) and has first-class reduced-motion hook. |
| react-router-dom | 7.13.2 (published 2026-03-23) | Preserve language-prefixed route continuity during nav migration | Existing app depends on route-driven language architecture. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @radix-ui/react-slot | 1.2.4 (published 2025-11-04) | shadcn primitive composition utility | Required by common shadcn primitives (`Button`, polymorphic components). |
| class-variance-authority | 0.7.1 (published 2024-11-26) | Variant API for shared primitives | Use for reusable button/nav/link style variants. |
| clsx | 2.1.1 (published 2024-04-23) | Conditional class composition | Use in `cn` helper chain. |
| tailwind-merge | 3.5.0 (published 2026-02-18) | Merge Tailwind class conflicts | Required for safe variant + override composition. |
| lucide-react | 1.7.0 (published 2026-03-25) | Default shadcn icon library | Keep iconography aligned with shadcn defaults. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| shadcn primitives | hand-rolled Tailwind components | Faster short-term, but violates locked architecture and reduces reuse consistency. |
| CSS variable semantics | hardcoded utility colors | Quick edits, but fails DSYS-04 and prevents contract-driven theming. |
| `Sheet` mobile nav | custom drawer state machine | Extra maintenance with no requirement benefit; shadcn already ships robust primitive. |

**Installation:**
```bash
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react
```

**Version verification (npm registry):**
```bash
npm view tailwindcss version
npm view tailwindcss time.4.2.2
npm view motion version
npm view motion time.12.38.0
npm view react-router-dom version
npm view react-router-dom time.7.13.2
npm view @radix-ui/react-slot version
npm view @radix-ui/react-slot time.1.2.4
npm view class-variance-authority version
npm view class-variance-authority time.0.7.1
npm view clsx version
npm view clsx time.2.1.1
npm view tailwind-merge version
npm view tailwind-merge time.3.5.0
npm view lucide-react version
npm view lucide-react time.1.7.0
```

## Architecture Patterns

### Recommended Project Structure
```text
src/
├── components/
│   ├── ui/                 # shadcn primitives (button, sheet, navigation-menu, etc.)
│   ├── app-shell/          # shell-level compositions (header wrapper, nav container)
│   └── sections/           # migrated hero + existing sections
├── lib/
│   └── utils.ts            # cn() helper (clsx + tailwind-merge)
└── styles/
    └── tokens.css          # semantic token declarations/overrides (if split from index.css)
```

### Pattern 1: Foundation-First shadcn Bootstrapping
**What:** Initialize shadcn and configure `components.json` for CSS-variable tokens before migrating UX surfaces.  
**When to use:** First step in Phase 2, before editing navbar/hero markup.  
**Example:**
```bash
# Source: https://ui.shadcn.com/docs/installation/vite
npx shadcn@latest init -t vite
# or preset path:
npx shadcn@latest init --preset b1Z5ezr60 --template vite
```

### Pattern 2: Semantic Token-Only Styling in Migrated Files
**What:** Use semantic utilities (`bg-background`, `text-foreground`, `border-border`, `ring-ring`, `bg-primary`) instead of hardcoded color utilities.  
**When to use:** All touched shell/nav/hero files in Phase 2.  
**Example:**
```tsx
// Source: https://ui.shadcn.com/docs/theming
<header className="bg-background/80 text-foreground border-border supports-[backdrop-filter]:bg-background/70" />
```

### Pattern 3: Mobile Nav via Sheet Primitive
**What:** Keep desktop mixed nav and mobile drawer using `Sheet` component.  
**When to use:** Navbar migration for UX-01.  
**Example:**
```bash
# Source: https://ui.shadcn.com/docs/components/radix/sheet
npx shadcn@latest add sheet
```

### Pattern 4: Reduced-Motion Aware Motion Defaults
**What:** Gate higher-amplitude transforms with `useReducedMotion`; keep opacity/fade fallback.  
**When to use:** Hero entrance and sticky-nav transition behaviors.  
**Example:**
```tsx
// Source: https://motion.dev/docs/react-use-reduced-motion
import { useReducedMotion } from "motion/react"
const reduce = useReducedMotion()
const y = reduce ? 0 : 24
```

### Anti-Patterns to Avoid
- **Color regression:** Introducing `text-purple-*`, `from-pink-*`, etc. in migrated files; use semantic tokens only.
- **Primitive bypass:** Building custom drawer/nav primitives instead of shadcn `Sheet` + `NavigationMenu`.
- **Motion drift:** Mixing animation APIs or adding unguarded large transform effects when reduced-motion is set.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Mobile drawer navigation | Custom portal/focus-trap drawer | shadcn `Sheet` | Handles accessibility and composability with less risk. |
| Nav menu semantics | Ad-hoc desktop mega menu structure | shadcn `NavigationMenu` | Mature pattern for keyboard/a11y behavior. |
| Variant class plumbing | Manual string concatenation | `cva` + `clsx` + `tailwind-merge` via `cn` helper | Prevents class conflicts and style drift. |
| Reduced-motion detection | Custom media-query listeners | `useReducedMotion` from Motion | Purpose-built hook already in approved animation stack. |

**Key insight:** In this phase, custom implementations increase migration noise and verification cost without improving delivery against DSYS/UX requirements.

## Common Pitfalls

### Pitfall 1: Preset Attempt Ambiguity
**What goes wrong:** Team retries preset multiple times or mixes preset + fallback states.  
**Why it happens:** No explicit one-attempt protocol in plan execution steps.  
**How to avoid:** Put one deterministic command attempt in plan, then immediate fallback path with context update in `02-CONTEXT.md`.  
**Warning signs:** Multiple `components.json` rewrites and unclear token source of truth.

### Pitfall 2: Partial Token Migration
**What goes wrong:** Navbar/hero still contain hardcoded color utilities after migration.  
**Why it happens:** Incremental edits without token audit.  
**How to avoid:** Add per-file grep checks for hardcoded palette classes in migrated files.  
**Warning signs:** Mixed `text-foreground` plus literal color classes in same component.

### Pitfall 3: Route Breakage from Nav Refactor
**What goes wrong:** Language-prefixed routes or switcher behavior regress after header rebuild.  
**Why it happens:** Desktop/mobile nav links bypass current route conventions.  
**How to avoid:** Reuse `LanguageSwitcher` behavior contract and validate `/en` + `/pt` continuity manually and with tests (Phase 3 baseline can start in Wave 0).  
**Warning signs:** URL path loses language segment after nav interaction.

### Pitfall 4: Motion Accessibility Regression
**What goes wrong:** Hero/nav animation remains high-motion under reduced-motion preference.  
**Why it happens:** Motion variants are hardcoded and not gated.  
**How to avoid:** Centralize reduced-motion condition in hero/nav animation config.  
**Warning signs:** Transform-heavy animations still run when reduced-motion is enabled.

## Code Examples

Verified patterns from official sources:

### shadcn Vite Init With Preset
```bash
# Source: https://ui.shadcn.com/docs/installation/vite
npx shadcn@latest init --preset b1Z5ezr60 --template vite
```

### Enable Semantic CSS-Variable Theming
```json
// Source: https://ui.shadcn.com/docs/components-json
{
  "style": "new-york",
  "tailwind": {
    "baseColor": "neutral",
    "cssVariables": true
  }
}
```

### Semantic Utility Usage
```tsx
// Source: https://ui.shadcn.com/docs/theming
<div className="bg-background text-foreground border-border" />
```

### Reduced-Motion Gating
```tsx
// Source: https://motion.dev/docs/react-use-reduced-motion
import { useReducedMotion } from "motion/react"
const prefersReducedMotion = useReducedMotion()
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| shadcn `default` style | `new-york` style | Documented in current shadcn components.json docs | New projects should not plan around deprecated default style. |
| Utility-color-only theming | CSS-variable semantic token theming | Current shadcn theming guidance | Easier contract enforcement and cross-surface consistency. |
| Mixed animation imports | single `motion/react` + reduced-motion hook | Already enforced in Phase 1 + current Motion docs | Cleaner motion architecture and better accessibility control. |

**Deprecated/outdated:**
- shadcn `default` style for initialization: deprecated; use `new-york`.

## Open Questions

1. **How exactly is preset `b1Z5ezr60` distributed (registry/auth/public access)?**
   - What we know: shadcn supports preset-driven init commands.
   - What's unclear: whether this specific preset code resolves in current environment without auth/private registry setup.
   - Recommendation: Make this the first executable step in 02-02, with immediate Vega fallback if unresolved per locked decision.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None currently installed (lint/build only) |
| Config file | none — see Wave 0 |
| Quick run command | `npm run lint` |
| Full suite command | `npm run verify:baseline` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DSYS-01 | shadcn foundation present and wired | integration | `npm run build` | ✅ |
| DSYS-02 | preset/fallback path documented and applied | manual + smoke | `npx shadcn@latest init --preset b1Z5ezr60 --template vite` | ❌ Wave 0 |
| DSYS-03 | shared primitives reused in migrated files | unit/static | `npm run lint` | ✅ |
| DSYS-04 | no hardcoded legacy colors in migrated files | static analysis | `rg -n "text-(purple|pink|cyan)-|bg-(purple|pink|cyan)-|from-|via-|to-" src/components/Navbar.tsx src/components/Hero.tsx src/App.tsx` | ✅ |
| UX-01 | nav works desktop/mobile with route continuity | manual + integration | `npm run build` | ✅ |
| UX-02 | hero hierarchy + CTA presence | manual visual | `npm run dev` | ✅ |
| UX-03 | reduced-motion respected in migrated animations | manual + unit (future) | `npm run lint` | ✅ |

### Sampling Rate
- **Per task commit:** `npm run lint`
- **Per wave merge:** `npm run verify:baseline`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/test/phase2-token-contract.spec.ts` — validates DSYS-04 color contract in migrated files
- [ ] `src/test/nav-language-continuity.spec.tsx` — validates UX-01 route/language continuity
- [ ] Framework install: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom` — no automated test runner exists

## Sources

### Primary (HIGH confidence)
- https://ui.shadcn.com/docs/installation/vite - Vite setup, init flow, preset-capable command.
- https://ui.shadcn.com/docs/components-json - style/tailwind/cssVariables config and deprecation notes.
- https://ui.shadcn.com/docs/theming - semantic token strategy and CSS-variable recommendation.
- https://ui.shadcn.com/docs/components/radix/sheet - mobile drawer primitive installation.
- https://ui.shadcn.com/docs/components/radix/navigation-menu - navigation primitive installation.
- https://motion.dev/docs/react-use-reduced-motion - reduced-motion hook behavior and usage.
- https://tailwindcss.com/docs/theme - Tailwind theme variable model (`@theme`).
- npm registry metadata via `npm view` (queried 2026-03-30) - current package versions and publish dates.

### Secondary (MEDIUM confidence)
- https://reactrouter.com/home - current React Router documentation entrypoint aligned with existing route architecture.

### Tertiary (LOW confidence)
- None.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - official docs + live npm version/date verification.
- Architecture: HIGH - directly aligned to locked context decisions and current codebase structure.
- Pitfalls: MEDIUM - derived from codebase and migration constraints, validated against official patterns.

**Research date:** 2026-03-30
**Valid until:** 2026-04-29
