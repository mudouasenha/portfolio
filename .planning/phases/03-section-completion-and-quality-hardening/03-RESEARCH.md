# Phase 3: Section Completion and Quality Hardening - Research

**Researched:** 2026-03-31
**Domain:** React section migration, i18n structured-data validation, and quality-gate hardening
**Confidence:** MEDIUM-HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
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

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within the fixed Phase 3 boundary.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| UX-04 | Contact and external project actions are visible and actionable. | Shared action primitives, explicit outbound-label pattern, integration/a11y checks for contact + project cards. |
| QLTY-02 | Translation-derived structured data is validated before rendering. | Zod adapter boundary + safeParse handling + section fallback rendering contract. |
| QLTY-03 | Section components follow consistent architecture and naming conventions. | Section wrapper/card/list pattern and recommended file structure for migrated sections. |
| I18N-02 | Language switching updates both URL and rendered localized content reliably. | Route/i18n continuity integration tests around `MainRoutes`, `LangRouter`, and `LanguageSwitcher`. |
| I18N-03 | Translation parity is maintained for all user-visible updated sections. | Locale parity tests (`en` vs `pt`) at structured payload schema level. |
| QAV-01 | Lint and type checks pass after migration changes. | Phase gate commands include `npm run lint` and `npm run build` on every full check. |
| QAV-02 | Integration tests cover critical route and i18n continuity behavior. | Vitest + Testing Library integration test stack and route test matrix. |
| QAV-03 | Accessibility checks pass for critical user flows and core sections. | Playwright + `@axe-core/playwright` automated scans for homepage and mobile-nav flows. |
</phase_requirements>

## Summary

Phase 3 should be planned as a convergence phase: migrate the remaining legacy sections (`Technologies`, `Skills`, `Experience`, `Projects`, `Certifications`, `Contact`) onto the same section primitives already implied by the Phase 2 shell, then harden all translation-driven rendering through a runtime schema boundary before UI loops execute.

Current code inspection shows the highest-risk regression point is translation object handling. Structured content is currently cast directly from `t(..., { returnObjects: true })` without runtime validation, and at least one shape mismatch already exists (`experiences` uses `year` in locale JSON while `ExperienceItem`/UI expects `date`). This is exactly the failure class QLTY-02 and I18N-03 target.

There is also no test infrastructure in-repo yet. To satisfy QAV-01/02/03 in this phase, planning should include Wave 0 setup for integration tests and accessibility checks, then lock release gates to lint + build + integration + a11y.

**Primary recommendation:** Implement a Zod-based translation adapter layer first, then migrate remaining sections onto shared primitives, then enforce route/i18n and a11y gates with Vitest + Playwright.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `zod` | `4.3.6` (modified 2026-01-25) | Runtime schema validation for translation-derived objects | TypeScript-only casts do not validate runtime JSON; Zod gives deterministic parse/error paths. |
| `vitest` | `4.1.2` (modified 2026-03-26) | Fast TS-native test runner for integration-style component/router tests | First-class Vite integration, modern watch mode, strong TS ergonomics. |
| `@testing-library/react` | `16.3.2` (modified 2026-01-19) | Render and assert app behavior through user-observable UI | Standard React behavior-first testing approach. |
| `@playwright/test` | `1.58.2` (modified 2026-03-31) | Browser-level verification for route/mobile flows and accessibility context | Real browser execution for navigation + responsive states that jsdom cannot fully emulate. |
| `@axe-core/playwright` | `4.11.1` (modified 2026-03-10) | Automated accessibility scanning integrated into Playwright | Officially documented pairing for Playwright a11y testing. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@testing-library/user-event` | `14.6.1` (modified 2025-12-13) | User-like interactions in integration tests | Language switch clicks, menu open/close, CTA interactions. |
| `@testing-library/jest-dom` | `6.9.1` (modified 2025-12-13) | Rich DOM matchers | Readable assertions for visible/accessible state. |
| `jsdom` | `29.0.1` (modified 2026-03-20) | Browser-like environment for Vitest | Component/router tests not requiring full browser engine. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `zod` | Manual type guards | More boilerplate, weaker error reporting, harder parity enforcement. |
| Playwright + axe | `vitest-axe` only | Faster but weaker for responsive/mobile navigation and real routing flows. |
| Vitest + Testing Library integration tests | Playwright-only integration | Better fidelity but slower feedback loop for per-commit checks. |

**Installation:**
```bash
npm install zod
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom @playwright/test @axe-core/playwright
```

**Version verification:** verified via npm registry (`npm view <package> version time.modified`) on 2026-03-31.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── sections/                 # section wrapper/title/card/list primitives
│   └── [Section].tsx             # migrated section composition
├── features/i18n/
│   ├── contentSchemas.ts         # zod schemas for structured translation payloads
│   ├── contentAdapters.ts        # parse + fallback + unknown-key warning logic
│   └── parity.ts                 # en/pt parity helpers
└── MainRoutes.tsx/LangRouter.tsx # route + language continuity behavior

tests/
├── integration/                  # route/language/section behavior tests
└── a11y/                         # playwright + axe scans
```

### Pattern 1: Translation Adapter Boundary
**What:** Every `t(..., { returnObjects: true })` payload passes through a schema adapter before render.
**When to use:** `skills`, `projectsList`, `experiences`, `certifications`, `contact`.
**Example:**
```typescript
// Source: https://zod.dev/basics?curius=1296&id=handling-errors
import * as z from "zod";

const experienceSchema = z.object({
  year: z.string(),
  role: z.string(),
  company: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
});

export function parseExperiences(raw: unknown) {
  const result = z.array(experienceSchema).safeParse(raw);
  return result.success ? result.data : [];
}
```

### Pattern 2: Section Contract Unification
**What:** Use one section shell contract (spacing/title/card rhythm) across remaining sections.
**When to use:** Migrating `Technologies`, `Skills`, `Experience`, `Projects`, `Certifications`, `Contact`.
**Example:**
```typescript
// Source: repo pattern from src/App.tsx + migrated Hero/Navbar
type SectionShellProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};
```

### Pattern 3: Router Continuity Integration Tests
**What:** Verify URL-language continuity and localized rendering together.
**When to use:** `MainRoutes`, `LangRouter`, `LanguageSwitcher` behavior.
**Example:**
```typescript
// Source: https://reactrouter.com/api/data-routers/createMemoryRouter
import { createMemoryRouter, RouterProvider } from "react-router-dom";
```

### Anti-Patterns to Avoid
- **Direct type assertions from `t(returnObjects)`**: `as Project[]` without runtime parse gives false safety.
- **Index keys in content lists**: causes unstable rendering during data evolution.
- **Legacy hardcoded neutral/purple classes in migrated sections**: violates phase contract and visual consistency goals.
- **A11y scan before UI reaches target state**: leads to false negatives in menu/dialog checks.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Runtime validation of locale payloads | Custom `if`-chains per section | `zod` schemas + adapters | Better maintainability and structured errors. |
| Route context mocking | Ad-hoc mocked `useNavigate`/`useParams` | Memory/data router test helpers | Keeps tests aligned with real router behavior. |
| Accessibility rule engine | Custom DOM audits | `@axe-core/playwright` | Established WCAG rule mapping and maintained engine. |
| Outbound-link disclosure consistency | One-off per-component JSX | Shared link/action primitive | Prevents UX-04 drift across sections. |

**Key insight:** This phase is mostly boundary-hardening; leverage battle-tested libraries so planning focuses on migration sequencing, not infrastructure reinvention.

## Common Pitfalls

### Pitfall 1: Translation Key Drift Hidden by Type Assertions
**What goes wrong:** UI compiles but renders empty fields when locale keys drift (`year` vs expected `date`).
**Why it happens:** Type assertions do not validate runtime object shape.
**How to avoid:** Parse all structured payloads with Zod before mapping.
**Warning signs:** `undefined` fields in rendered cards/timelines without compile errors.

### Pitfall 2: Unknown-Key Policy Implemented as Hard Failure
**What goes wrong:** CI fails on harmless locale metadata additions.
**Why it happens:** Strict schemas are used without separate warning pipeline.
**How to avoid:** Keep required-shape validation strict, but log unknown-key warnings as non-blocking.
**Warning signs:** Frequent false-positive gate failures after translation updates.

### Pitfall 3: Incomplete i18n Continuity Tests
**What goes wrong:** Language switch updates URL but not rendered content (or vice versa).
**Why it happens:** Tests check only navigation or only text.
**How to avoid:** Assert both pathname and localized UI text in same scenario.
**Warning signs:** Regressions around `/` redirects and `/:lang/*` transitions.

### Pitfall 4: Accessibility Scans Run in Wrong UI State
**What goes wrong:** Mobile nav/dialog issues are missed.
**Why it happens:** Axe scan runs before menu/sheet is opened and settled.
**How to avoid:** Drive interaction first, wait for target region, then run `AxeBuilder`.
**Warning signs:** A11y suite stays green while manual mobile walkthrough finds issues.

## Code Examples

Verified patterns from official sources:

### Parse Safely Without Throwing
```typescript
// Source: https://zod.dev/basics?curius=1296&id=handling-errors
const result = Player.safeParse(input);
if (!result.success) {
  return [];
}
return result.data;
```

### Return Structured Objects from i18next
```typescript
// Source: https://www.i18next.com/translation-function/objects-and-arrays
const skills = i18next.t("skills", { returnObjects: true });
```

### Browser A11y Scan with Axe
```typescript
// Source: https://playwright.dev/docs/accessibility-testing
const accessibilityScanResults = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
  .analyze();
expect(accessibilityScanResults.violations).toEqual([]);
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Type assertions only for translation objects | Runtime schema parsing + typed output | Zod 4 era / current best practice | Prevents silent runtime shape failures. |
| No automated UI behavior tests | Vitest + Testing Library integration coverage | Current SPA QA baseline | Safer route/i18n refactors. |
| Manual-only accessibility checks | Playwright + axe automated gates + manual follow-up | Current frontend QA standard | Early detection of repeatable WCAG issues. |

**Deprecated/outdated:**
- Module-level or cast-only trust of structured i18n payloads as a quality strategy.
- Treating lint/build alone as sufficient release gate for UX/i18n-heavy frontend changes.

## Open Questions

1. **Should route continuity checks live entirely in Vitest or be split with Playwright?**
   - What we know: Vitest is faster for frequent checks; Playwright is better for browser-fidelity flows.
   - What's unclear: Desired CI runtime budget.
   - Recommendation: Keep primary route/i18n continuity in Vitest; reserve Playwright for critical path + a11y.

2. **Where should localized fallback microcopy live for invalid payloads?**
   - What we know: Locked decision requires section-level localized fallback.
   - What's unclear: Dedicated `errors.*` keys vs colocated section keys.
   - Recommendation: Add dedicated translation keys per section fallback for explicit parity testing.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest `4.1.2` + Testing Library (`@testing-library/react` `16.3.2`) + Playwright `1.58.2` + `@axe-core/playwright` `4.11.1` |
| Config file | `vitest.config.ts` and `playwright.config.ts` (none currently — create in Wave 0) |
| Quick run command | `npm run test:integration` |
| Full suite command | `npm run lint && npm run build && npm run test:integration && npm run test:a11y` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| UX-04 | Contact/project actions are visible, explicit, and outbound-safe | integration | `npm run test:integration -- tests/integration/actions.test.ts` | ❌ Wave 0 |
| QLTY-02 | Invalid translation-derived payloads are filtered and fallback is shown | unit | `npm run test:integration -- tests/integration/content-adapters.test.ts` | ❌ Wave 0 |
| QLTY-03 | Remaining sections follow shared wrapper/card/list architecture | integration | `npm run test:integration -- tests/integration/section-contract.test.ts` | ❌ Wave 0 |
| I18N-02 | Language switch updates URL and localized content together | integration | `npm run test:integration -- tests/integration/i18n-routing.test.ts` | ❌ Wave 0 |
| I18N-03 | `en` and `pt` maintain required structured parity | unit | `npm run test:integration -- tests/integration/locale-parity.test.ts` | ❌ Wave 0 |
| QAV-01 | Lint + typecheck stay green | quality gate | `npm run lint && npm run build` | ✅ |
| QAV-02 | Critical route/i18n continuity covered by automated tests | integration | `npm run test:integration` | ❌ Wave 0 |
| QAV-03 | Core route/sections/mobile nav pass accessibility scan | a11y | `npm run test:a11y` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npm run test:integration`
- **Per wave merge:** `npm run lint && npm run build && npm run test:integration`
- **Phase gate:** `npm run lint && npm run build && npm run test:integration && npm run test:a11y`

### Wave 0 Gaps
- [ ] `vitest.config.ts` — define jsdom environment and integration test include globs
- [ ] `playwright.config.ts` — configure local server and a11y test project
- [ ] `tests/integration/i18n-routing.test.ts` — covers I18N-02 and QAV-02
- [ ] `tests/integration/locale-parity.test.ts` — covers I18N-03 and QLTY-02
- [ ] `tests/integration/actions.test.ts` — covers UX-04 visibility/actionability
- [ ] `tests/a11y/homepage.a11y.spec.ts` — covers QAV-03 homepage + key sections
- [ ] `tests/a11y/mobile-nav.a11y.spec.ts` — covers QAV-03 navigation/mobile menu flows
- [ ] `tests/setup.ts` — shared testing-library and matcher setup
- [ ] Framework install: `npm install zod && npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom @playwright/test @axe-core/playwright`

## Sources

### Primary (HIGH confidence)
- npm registry (`npm view`) - current package versions and last modified dates for recommended stack.
- https://zod.dev/basics?curius=1296&id=handling-errors - `parse`, `safeParse`, error-handling behavior.
- https://zod.dev/api?id=transform - object strictness behavior (`z.object`, `z.strictObject`, unknown-key handling).
- https://www.i18next.com/translation-function/objects-and-arrays - `returnObjects` behavior for structured translation payloads.
- https://vitest.dev/config/environment.html - test environment configuration (`jsdom`/`node` and defaults).
- https://reactrouter.com/api/data-routers/createMemoryRouter - in-memory router for non-DOM test environments.
- https://reactrouter.com/start/framework/testing - `createRoutesStub` guidance and router-context testing constraints.
- https://playwright.dev/docs/accessibility-testing - Playwright + axe guidance and WCAG-tag scanning patterns.
- https://testing-library.com/docs/example-react-router/ - React Router test examples with Testing Library.

### Secondary (MEDIUM confidence)
- None.

### Tertiary (LOW confidence)
- None.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - verified package versions from npm registry + official docs for APIs.
- Architecture: MEDIUM - grounded in current repo shape, but final decomposition choices are discretionary.
- Pitfalls: HIGH - based on direct code/locale inspection plus official testing/accessibility guidance.

**Research date:** 2026-03-31  
**Valid until:** 2026-04-07 (fast-moving dependency/testing ecosystem)
