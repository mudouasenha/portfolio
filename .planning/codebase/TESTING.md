# Testing Patterns

**Last Updated:** 2026-04-01

## Test Stack

- **Runner:** Vitest (`vitest`)
- **Browser Automation:** Playwright (`@playwright/test`)
- **Accessibility Engine:** `@axe-core/playwright`
- **Lint Gate:** ESLint

## Commands

```bash
rtk npm run lint
rtk npm run test:integration
rtk npm run test:a11y
rtk npm run verify:phase3
```

## Test Organization

- `tests/integration`
  - Route/language continuity assertions
  - i18n schema and fallback behavior checks
- `tests/a11y`
  - Homepage and mobile navigation accessibility checks
  - Axe violations gate under Playwright execution

## Config Sources

- `vitest.config.ts`
- `playwright.config.ts`
- `tests/setup.ts`

## Execution Notes

- `verify:phase3` is the strict phase gate (`lint` + `build` + `tests/integration` + `tests/a11y`).
- Linux hosts may require browser dependencies before a11y execution:
  - `rtk npm run a11y:install-deps`
- Manual visual checks remain required for final release screenshots/evidence.
