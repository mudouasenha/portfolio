import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

test.use({ viewport: { width: 390, height: 844 } });

test("mobile navigation open state has no serious or critical accessibility violations", async ({
  page,
}) => {
  await page.goto("/en");

  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(page.getByRole("dialog", { name: "Navigate" })).toBeVisible();

  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  const highImpactViolations = results.violations.filter(
    ({ impact }) => impact === "serious" || impact === "critical",
  );

  expect(highImpactViolations).toEqual([]);
});
