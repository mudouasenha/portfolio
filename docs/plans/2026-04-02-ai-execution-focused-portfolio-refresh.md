# AI Execution-Focused Portfolio Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refresh the existing portfolio with an AI-execution narrative while preserving the current layout style and only compressing sections/content for higher hiring signal.

**Architecture:** Keep the same React component architecture and routing, but reduce top-level sections to six by removing `About` and `Skills` blocks from page flow/nav and strengthening `Hero`, `Experience`, and `Projects` content. Store all narrative updates in bilingual locale JSON so content remains maintainable and parity-checked.

**Tech Stack:** React 18, TypeScript, i18next locale JSON, Vitest integration tests, Vite build.

---

### Task 1: Add regression test for new section structure and proof strip

**Files:**
- Create: `tests/integration/ai-portfolio-structure.test.ts`
- Test: `src/App.tsx`, `src/components/Navbar.tsx`, `src/components/Hero.tsx`, `src/locales/en/translation.json`, `src/locales/pt/translation.json`

**Step 1: Write the failing test**

```ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import enLocale from "@/locales/en/translation.json";
import ptLocale from "@/locales/pt/translation.json";

const readSource = (relativePath: string) => readFileSync(resolve(process.cwd(), relativePath), "utf8");

describe("ai execution-focused portfolio contracts", () => {
  it("keeps only the 6 target top-level sections in app layout", () => {
    const appSource = readSource("src/App.tsx");
    expect(appSource).toContain('id="technologies"');
    expect(appSource).toContain('id="certifications"');
    expect(appSource).toContain('id="experience"');
    expect(appSource).toContain('id="projects"');
    expect(appSource).toContain('id="contact"');
    expect(appSource).not.toContain('id="about"');
    expect(appSource).not.toContain('id="skills"');
  });

  it("includes the infra cost reduction proof strip signal", () => {
    const heroSource = readSource("src/components/Hero.tsx");
    expect(heroSource).toContain("R$4k/month infra cost reduction");
  });

  it("uses AI systems wording in section labels", () => {
    expect(enLocale.projects).toBe("AI Systems & Projects");
    expect(ptLocale.projects).toBe("Sistemas de IA e Projetos");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `rtk npm run test:integration -- ai-portfolio-structure.test.ts`  
Expected: FAIL because `about/skills` still exist and new proof/labels are not fully present.

**Step 3: Commit test scaffold**

```bash
rtk git add tests/integration/ai-portfolio-structure.test.ts
rtk git commit -m "test: add ai portfolio structure and proof-strip contracts"
```

### Task 2: Compress page sections while preserving current portfolio flow

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/Navbar.tsx`

**Step 1: Update `App.tsx` section stack**

Implementation:
- Remove `About` and `Skills` imports.
- Remove `<section id="about">` and `<section id="skills">`.
- Keep order as: `Hero`, `Technologies`, `Certifications`, `Experience`, `Projects`, `Contact`.

**Step 2: Update navbar items**

Implementation:
- Remove `About` and `Skills` nav items from `NAV_ITEMS`.
- Keep `Technologies`, `Projects`, `Contact` and rename projects label to AI wording (matching locale strategy below).

**Step 3: Run contract test**

Run: `rtk npm run test:integration -- ai-portfolio-structure.test.ts`  
Expected: section assertions PASS, wording may still FAIL until locale task is done.

**Step 4: Commit**

```bash
rtk git add src/App.tsx src/components/Navbar.tsx
rtk git commit -m "refactor: compress sections to execution-focused structure"
```

### Task 3: Update Hero with execution-first positioning and cost proof

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/locales/en/translation.json`
- Modify: `src/locales/pt/translation.json`

**Step 1: Update hero headline support text**

Implementation:
- Keep current component composition/animation.
- Update role badge text to reflect AI execution focus while staying grounded (e.g., `.NET Fullstack Engineer`).
- Keep CTA layout unchanged.

**Step 2: Update proof strip chips in `Hero.tsx`**

Set proof chips to execution signals:
- `.NET + AI systems delivery`
- `11k+ invoices/month production context`
- `R$4k/month infra cost reduction`

**Step 3: Update `hero.content` in both locales**

Implementation:
- Replace long generic paragraph with concise execution-driven summary aligned with real responsibilities:
  - spec-driven AI development
  - internal Claude Code enablement/tooling
  - AI code review in CI/CD
  - bill parsing AI agent work

**Step 4: Run tests**

Run: `rtk npm run test:integration -- ai-portfolio-structure.test.ts`  
Expected: proof-strip assertion PASS.

**Step 5: Commit**

```bash
rtk git add src/components/Hero.tsx src/locales/en/translation.json src/locales/pt/translation.json
rtk git commit -m "feat: add execution-focused hero and infra cost proof signal"
```

### Task 4: Rewrite Experience + Projects content for scan speed and measurable signal

**Files:**
- Modify: `src/locales/en/translation.json`
- Modify: `src/locales/pt/translation.json`
- Optional modify (if heading copy needs custom text): `src/components/Projects.tsx`

**Step 1: Update section labels**

Implementation:
- `projects` key:
  - EN: `AI Systems & Projects`
  - PT: `Sistemas de IA e Projetos`

**Step 2: Rewrite `experiences` descriptions (concise, impact-first)**

Implementation rules:
- Keep role/company/year factual.
- First sentence = scope.
- Second sentence = measurable/operational signal when available.
- Avoid generic stack dumps.

**Step 3: Rewrite `projectsList` descriptions**

Implementation rules:
- Focus on execution and production intent.
- Include explicit impact target or operational purpose.
- Keep each description short enough to scan in ~10–15 seconds.

**Step 4: Run locale integrity tests**

Run: `rtk npm run test:integration -- locale-parity.test.ts content-adapters.test.ts`  
Expected: PASS (no schema/parity drift).

**Step 5: Commit**

```bash
rtk git add src/locales/en/translation.json src/locales/pt/translation.json
rtk git commit -m "content: rewrite experience and ai systems projects for execution clarity"
```

### Task 5: Full verification and polish

**Files:**
- Verify only (no required file edits)

**Step 1: Run lint + build + integration**

Run:
- `rtk npm run lint`
- `rtk npm run build`
- `rtk npm run test:integration`

Expected:
- All commands exit 0.
- No locale parity/content adapter regressions.

**Step 2: Optional accessibility smoke check**

Run: `rtk npm run test:a11y`  
Expected: PASS (if local Playwright deps already installed).

**Step 3: Final commit (if polish edits were needed)**

```bash
rtk git add <polish-files-if-any>
rtk git commit -m "chore: finalize ai execution-focused portfolio refresh"
```

