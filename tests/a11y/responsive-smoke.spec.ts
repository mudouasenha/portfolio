import { expect, test } from "@playwright/test";

const scenarios = [
  { name: "mobile-en", locale: "en", viewport: { width: 390, height: 844 }, menuExpected: true },
  { name: "tablet-pt", locale: "pt", viewport: { width: 768, height: 1024 }, menuExpected: true },
  { name: "small-laptop-en", locale: "en", viewport: { width: 1024, height: 768 }, menuExpected: true },
  { name: "desktop-pt", locale: "pt", viewport: { width: 1280, height: 800 }, menuExpected: false },
  { name: "wide-desktop-en", locale: "en", viewport: { width: 1440, height: 900 }, menuExpected: false },
];

for (const scenario of scenarios) {
  test(`${scenario.name} keeps layout within viewport`, async ({ page }) => {
    await page.setViewportSize(scenario.viewport);
    await page.goto(`/${scenario.locale}`);

    await expect(page.locator("header")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const horizontalOverflow = await page.evaluate(() => {
      const { documentElement } = document;
      return documentElement.scrollWidth - documentElement.clientWidth;
    });

    expect(horizontalOverflow).toBeLessThanOrEqual(1);

    const menuButton = page.getByRole("button", { name: "Open navigation menu" });

    if (scenario.menuExpected) {
      await expect(menuButton).toBeVisible();
      await menuButton.click();
      await expect(page.getByRole("dialog")).toBeVisible();
    } else {
      await expect(menuButton).toHaveCount(0);
      await expect(page.getByRole("link", { name: /contact|contato/i })).toBeVisible();
    }
  });
}
