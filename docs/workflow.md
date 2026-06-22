# Repository Workflow

This is the default way to work in the portfolio repo.

## 1. Orient

- Read `README.md` for setup and repo map
- Read `PRODUCT.md` for audience and success criteria
- Read `DESIGN.md` before any UI or visual change
- Read the relevant `.planning/codebase/*.md` reference docs for the task

## 2. Scope the change

- Prefer the smallest change that achieves the goal
- Preserve the existing editorial design direction unless the task explicitly asks for a redesign
- Keep EN/PT parity in mind for user-facing copy
- Treat internal/company work carefully and avoid exposing proprietary details

## 3. Implement

- Update content in locale files when copy is translated
- Update models/schemas/adapters together when structured content changes
- Keep visual changes aligned with `DESIGN.md`
- Prefer existing primitives in `src/components/ui/` and `src/components/sections/`

## 4. Verify

Choose the smallest verification set that proves the change, then expand if the surface is broad.

### Typical checks

```bash
npm run lint
npm run build
npm run test:integration
npm run test:a11y
```

### Suggested defaults

| Change type | Minimum verification |
|---|---|
| Copy-only change | `npm run build` |
| Component/layout change | `npm run build` + relevant Storybook/manual review |
| Routing or i18n change | `npm run build` + `npm run test:integration` |
| Accessibility-sensitive interaction | `npm run build` + `npm run test:a11y` |
| Broad UI refactor | `npm run verify:phase3` |

## 5. Update docs

Before considering the task done, check whether the change also requires updates to:

- `README.md`
- `PRODUCT.md`
- `DESIGN.md`
- `AGENTS.md`
- `.planning/codebase/*.md`
- `docs/decisions/*.md`

## 6. Final review questions

Before shipping, ask:

1. Does this improve recruiter understanding or proof quality?
2. Does this preserve the repo’s design direction?
3. Does it increase maintenance burden unnecessarily?
4. Are the docs still truthful?
5. Did I verify the exact surface I changed?
