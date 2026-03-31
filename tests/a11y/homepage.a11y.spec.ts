import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

test("homepage /en has no serious or critical accessibility violations", async ({ page }) => {
  await page.goto("/en");

  await expect(page.getByRole("heading", { level: 1, name: "Matheus Gomes" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Projects" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Get In Touch" })).toBeVisible();

  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  const highImpactViolations = results.violations.filter(
    ({ impact }) => impact === "serious" || impact === "critical",
  );

  expect(highImpactViolations).toEqual([]);
});
