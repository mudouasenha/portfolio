# Pitfalls Research

**Domain:** Developer portfolio frontend modernization  
**Researched:** 2026-03-28  
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Token Drift During Migration

**What goes wrong:** migrated components mix semantic tokens and ad hoc utility colors.  
**Why it happens:** migration is performed section-by-section without shared token guardrails.  
**How to avoid:** enforce semantic token usage in shared primitives and review all section overrides.  
**Warning signs:** repeated direct color classes (`text-gray-*`, `bg-white`, etc.) in migrated sections.  
**Phase to address:** Phase 2 and Phase 3.

---

### Pitfall 2: Language Routing Regression

**What goes wrong:** URL language segment and i18n state become unsynchronized.  
**Why it happens:** refactors touch routing and language switch behavior simultaneously without tests.  
**How to avoid:** lock routing and language behavior with tests before broad UI changes.  
**Warning signs:** flicker during language switch, unexpected redirect loops, mixed-language sections.  
**Phase to address:** Phase 1 and Phase 5.

---

### Pitfall 3: Preset Dependency Blocking Progress

**What goes wrong:** work stalls while trying to resolve unavailable preset code.  
**Why it happens:** design setup assumes remote preset availability with no fallback policy.  
**How to avoid:** validate preset early and switch to Vega immediately if unresolved.  
**Warning signs:** repeated setup retries with no component migration progress.  
**Phase to address:** Phase 2.

---

### Pitfall 4: Motion Overuse

**What goes wrong:** animations distract from content and degrade performance.  
**Why it happens:** motion is added per element instead of by hierarchy and purpose.  
**How to avoid:** define a motion budget and reduced-motion behavior upfront.  
**Warning signs:** delayed interaction readiness, stutter on mobile, difficult reading flow.  
**Phase to address:** Phase 3 and Phase 6.

---

### Pitfall 5: Quality Claims Without Regression Coverage

**What goes wrong:** code appears cleaner but behavior regressions ship.  
**Why it happens:** no tests for routing, i18n, and critical links.  
**How to avoid:** add practical integration tests and lightweight a11y checks before final polish.  
**Warning signs:** repeated manual rechecks, inconsistent behavior across locales.  
**Phase to address:** Phase 5.

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Direct type casts for translation objects | Faster coding | Runtime defects and brittle UI | Rarely acceptable; use schema checks. |
| Section-local visual rules | Faster initial styling | Inconsistent UI and costly redesign | Only temporary during migration if tracked. |
| Skipping test setup | Faster short-term delivery | High regression risk | Not acceptable for this milestone. |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| shadcn initialization | Assuming preset always resolves | Attempt preset once, fallback to Vega, continue migration. |
| react-router + i18next | Multiple language sources of truth | Keep URL param as source of truth and sync i18n to it. |
| external links | Placeholder anchors (`#`) left in production | Validate actionable links and add explicit href checks. |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Large hero/media assets | Slow first contentful render | Use optimized image formats and explicit sizing | Mobile and low-bandwidth users first |
| Unbounded animated elements | Jank and battery drain | Animate key moments only; respect reduced-motion | Mid-range devices and older browsers |
| Multiple overlapping utility layers | Hard-to-predict layout and repaint cost | Consolidate through primitives and tokens | As section complexity grows |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Unvalidated external URLs in content objects | Broken links or unsafe navigation patterns | Validate URLs and sanitize render boundaries. |
| Missing `rel` safeguards on external links | Reverse-tabnabbing risk | Keep `rel="noopener noreferrer"` consistently. |
| Blind rendering of markdown content | Potential rendering surprises | Restrict markdown usage and sanitize rendering path. |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Dense text blocks without hierarchy | Low readability and quick drop-off | Use clear type scale, spacing rhythm, and chunked content. |
| Generic template look | Weak differentiation in hiring contexts | Apply a clear visual direction with consistent component language. |
| Contact actions hidden or non-actionable | Conversion loss | Keep contact entry points obvious and test all links. |

## Looks-Done-But-Isnt Checklist

- [ ] **Language switch:** both URL and translated content update correctly in all routes.
- [ ] **Project cards:** all cards have valid links and deterministic image mapping.
- [ ] **Contact section:** email/contact actions are actionable, not placeholders.
- [ ] **Accessibility:** keyboard navigation and focus visibility verified on all major sections.
- [ ] **Responsive behavior:** tested on small, medium, and large viewport ranges.

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Token drift | MEDIUM | centralize styles in primitives, remove direct color utilities, retest screens. |
| Routing regression | HIGH | restore route sync logic, add tests, verify locale switch end-to-end. |
| Motion overload | LOW | remove low-value animations, keep section-level motion only. |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Token drift | Phase 2-3 | no hardcoded color classes in migrated sections. |
| Routing regression | Phase 1 and 5 | routing and i18n tests pass in both locales. |
| Preset blocking | Phase 2 | decision log shows preset validation or Vega fallback selected. |
| Motion overload | Phase 3 and 6 | reduced-motion behavior and mobile smoothness confirmed. |
| No regression coverage | Phase 5 | test suite and a11y checks run in CI/local validation. |

## Sources

- Local codebase concerns and architecture docs in `.planning/codebase`.
- https://react.dev/blog/2024/04/25/react-19-upgrade-guide
- https://ui.shadcn.com/docs/cli
- https://ui.shadcn.com/docs/changelog/2025-12-shadcn-create
- https://tailwindcss.com/docs/compatibility

---
*Pitfalls research for: developer portfolio modernization*  
*Researched: 2026-03-28*
