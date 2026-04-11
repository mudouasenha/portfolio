import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

test.use({ reducedMotion: "reduce" });

test("homepage /en has no serious or critical accessibility violations", async ({ page }) => {
  await page.goto("/en");

  await expect(page.getByRole("heading", { level: 1, name: /Backend and AI systems engineer/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "AI Systems & Projects" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Get In Touch" })).toBeVisible();
  await page.waitForFunction(() => {
    const badge = document.querySelector(".rounded-full");
    if (!badge) return true;
    return Number.parseFloat(getComputedStyle(badge).opacity || "1") >= 0.99;
  });

  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  const highImpactViolations = results.violations.filter(
    ({ impact }) => impact === "serious" || impact === "critical",
  );

  expect(highImpactViolations).toEqual([]);
});
