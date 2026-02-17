import { test, expect, Page } from '@playwright/test';

/* ---------------- Helper Functions ---------------- */

async function goToStartScreen(page: Page) {
  await page.goto('http://localhost:5173/');
}

async function goToRegionScreen(page: Page) {
  await page.getByTestId('start-screen').click();
}

async function goToGameScreen(page: Page) {
  await goToRegionScreen(page);
  await page.getByTestId('region-1').click();
  await page.getByTestId('region-2').click();
  // await page.waitForEvent({ timeout: 1000 });
  await page.getByTestId('start-game-button').click();
}

/* ---------------- Global Setup ---------------- */

test.beforeEach(async ({ page }) => {
  await goToStartScreen(page);
});

/* ---------------- Tests ---------------- */

test('should display the start screen', async ({ page }) => {
  let startScreen = await page.getByTestId('start-screen')
  await expect(startScreen).toBeVisible();
});

test('should navigate to region screen on click', async ({ page }) => {
  await goToRegionScreen(page);
  await expect(page.getByTestId('region-screen')).toBeVisible();
});

test('should navigate to game screen on region selection', async ({ page }) => {
  await goToGameScreen(page);
  await expect(page.getByTestId('game-screen')).toBeVisible();
});

test('should display win modal on game win', async ({ page }) => {
  await goToGameScreen(page);

  // TODO: Simulate winning condition properly
  await expect(await page.getByTestId('win-modal')).toBeVisible();
});

test('should display lose modal on game lose', async ({ page }) => {
  await goToGameScreen(page);

  // TODO: Simulate losing condition properly
  await expect(await page.getByTestId('lose-modal')).toBeVisible();
});
