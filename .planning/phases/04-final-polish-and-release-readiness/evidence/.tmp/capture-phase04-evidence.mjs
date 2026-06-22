import { chromium, devices } from '@playwright/test';

const baseUrl = 'http://127.0.0.1:4173/';
const browser = await chromium.launch({ headless: true });

try {
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const desktopPage = await desktop.newPage();
  await desktopPage.goto(baseUrl, { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1200);

  await desktopPage.screenshot({
    path: '.planning/phases/04-final-polish-and-release-readiness/evidence/hero-desktop.png',
    fullPage: false,
  });

  await desktopPage.locator('a[href="#about"]').first().click();
  await desktopPage.waitForTimeout(700);
  const aboutImage = desktopPage.locator('#about img[alt="about"]').first();
  await aboutImage.scrollIntoViewIfNeeded();
  await aboutImage.screenshot({
    path: '.planning/phases/04-final-polish-and-release-readiness/evidence/about-image-framing.png',
  });
  await desktop.close();

  const mobile = await browser.newContext({ ...devices['iPhone 12'], viewport: { width: 390, height: 844 } });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(baseUrl, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1200);

  await mobilePage.screenshot({
    path: '.planning/phases/04-final-polish-and-release-readiness/evidence/mobile-nav-390.png',
    fullPage: false,
  });

  await mobilePage.getByRole('button', { name: 'Open navigation menu' }).click();
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({
    path: '.planning/phases/04-final-polish-and-release-readiness/evidence/mobile-nav-sheet.png',
    fullPage: false,
  });
  await mobile.close();
} finally {
  await browser.close();
}
