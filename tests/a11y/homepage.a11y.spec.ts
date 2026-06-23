import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

test.use({ reducedMotion: "reduce" });

test("homepage /en has no serious or critical accessibility violations", async ({ page }) => {
  await page.goto("/en");

  await expect(page.getByRole("heading", { level: 1, name: /Hands-on Tech Lead for backend, product platform, observability, and modernization/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Selected Systems & Case Studies" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Get In Touch" })).toBeVisible();
  await page.waitForTimeout(1200);

  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  const highImpactViolations = results.violations.filter(
    ({ impact }) => impact === "serious" || impact === "critical",
  );

  expect(highImpactViolations).toEqual([]);
});
