# Phase 3: Section Completion and Quality Hardening - Context

**Gathered:** 2026-03-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Complete the migration of remaining legacy sections to the shared design-system conventions and lock quality gates for translation validation, route/i18n continuity, and accessibility before phase closure.

</domain>

<decisions>
## Implementation Decisions

### Section Migration Contract
- Remaining sections must be normalized to a shared section system (Section wrapper + shared card/list primitives + consistent spacing rhythm).
- Visual density target is balanced (not compact-heavy, not spacious-editorial).
- Motion in remaining sections stays medium but constrained to reveal transitions and subtle hover feedback only.
- Keep both `Technologies` and `Skills` as separate sections, with clear functional differentiation:
- `Technologies`: stack/icon-oriented presentation
- `Skills`: categorized capability chips/tags

### Action Visibility Contract
- CTA hierarchy is locked:
- Primary action emphasis = contact
- Secondary action emphasis = projects
- Contact section uses one primary action button plus secondary text links.
- Project entries remain full-card clickable, and each card must also expose an explicit action label (for example, "View project").
- External project/contact outbound links must always include disclosure cues (icon/label) and open in a new tab.

### Translation Data Validation Contract
- All translation-derived structured payloads (`skills`, `projectsList`, `experiences`, `certifications`, `contact`) require strict schema validation before render.
- On invalid payloads, hide invalid items and show a localized section-level fallback message.
- Locale parity is a gate: required keys/object shape must be validated for both `en` and `pt`.
- Unknown keys should produce warnings in test output but must not fail the gate.

### Quality Gate Contract
- Integration tests must cover:
- Root redirect language continuity (`/` -> detected language)
- Invalid language redirect to canonical fallback
- Language switch updates URL segment and rendered localized content together
- Accessibility verification must be automated for core route plus key sections (`hero`, `projects`, `contact`, navigation/mobile menu flows).
- Phase completion gate is strict: lint + build + integration tests + accessibility checks must all pass.
- All high/critical issues discovered during this phase must be fixed before phase close.

### Claude's Discretion
- Exact section primitive names and file decomposition strategy, as long as shared wrapper/card/list consistency is enforced.
- Exact localized fallback microcopy for invalid translation payloads.
- Exact test tooling/package choices and assertion granularity that satisfy the locked gate contracts.
- Exact visual treatment for external-link disclosure, as long as disclosure + new-tab behavior are explicit.

</decisions>

<specifics>
## Specific Ideas

- Preserve two-surface skills storytelling: technology stack visibility and categorized capability visibility should coexist, but look intentionally distinct.
- Keep project cards easy to scan and easy to act on by combining full-card click area with explicit action affordance.
- Validation strategy should prioritize user-safe rendering over crashing UI on malformed translation data.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Scope and Requirement Contracts
- `.planning/ROADMAP.md` — Phase 3 boundary, requirements, and success criteria.
- `.planning/REQUIREMENTS.md` — UX-04, QLTY-02, QLTY-03, I18N-02, I18N-03, QAV-01, QAV-02, QAV-03 mappings.
- `.planning/PROJECT.md` — modernization constraints and quality expectations.
- `.planning/STATE.md` — current project state (Phase 03 ready, no prior plans).

### Locked Upstream Decisions (Do Not Re-open)
- `.planning/phases/01-baseline-stabilization/01-CONTEXT.md` — URL-authoritative i18n continuity contract and hybrid root detection behavior.
- `.planning/phases/02-design-system-and-core-ux-migration/02-CONTEXT.md` — shadcn-first architecture, semantic token direction, motion baseline, and Vega fallback decision.

### Primary Implementation Targets
- `src/App.tsx` — section composition order and anchors for migrated surfaces.
- `src/components/About.tsx`
- `src/components/Technologies.tsx`
- `src/components/Skills.tsx`
- `src/components/Experience.tsx`
- `src/components/Projects.tsx`
- `src/components/Certifications.tsx`
- `src/components/Contact.tsx`
- `src/components/Tag.tsx` — shared chip/tag styling alignment with tokenized system.
- `src/components/ui/button.tsx` / `src/components/ui/navigation-menu.tsx` / `src/components/ui/sheet.tsx` — shared interaction primitives for CTA and nav consistency.
- `src/components/LanguageSwitcher.tsx` / `src/MainRoutes.tsx` / `src/LangRouter.tsx` — continuity behavior that integration tests must protect.
- `src/locales/en/translation.json` / `src/locales/pt/translation.json` — structured payload parity and schema validation inputs.
- `src/models/*.tsx` — current typed translation object shape references.
- `package.json` — quality gate scripts baseline to extend with test/a11y checks.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/App.tsx` already centralizes ordered sections and anchor IDs, so section migration can stay compositional without routing changes.
- shadcn primitives are already present (`button`, `navigation-menu`, `sheet`) and should be reused for action affordances and responsive interaction patterns.
- `src/components/LanguageSwitcher.tsx` and route wrappers already enforce language-URL coupling; quality tests should assert continuity, not redesign the mechanism.

### Established Patterns
- Remaining legacy sections still use hardcoded neutral/purple classes and ad-hoc motion patterns; this is the main migration delta versus phase-2 surfaces.
- Structured translation payloads are currently consumed via direct casts from `t(..., { returnObjects: true })` with no runtime safeguards.
- Project/contact actions currently exist but need explicit hierarchy and trust/disclosure consistency per locked decisions.

### Integration Points
- Translation validation should be inserted at section data-adapter boundaries before render loops.
- Integration tests should exercise route handling through `MainRoutes`/`LangRouter` and language switching through `LanguageSwitcher`.
- Accessibility checks should target core route render plus key interactive sections and mobile navigation states.

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within the fixed Phase 3 boundary.

</deferred>

---

*Phase: 03-section-completion-and-quality-hardening*
*Context gathered: 2026-03-30*
