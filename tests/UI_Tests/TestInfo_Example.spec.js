const { test, expect } = require('@playwright/test');

test('Test Info Example', async ({ page }, testInfo) => {
  await page.goto('https://playwright.dev/');
  const title = page.locator('.navbar__inner .navbar__title');
  await expect(title).toHaveText('Playwright');
  console.log(testInfo)
  //If you want to display title
  console.log(testInfo.title)
});