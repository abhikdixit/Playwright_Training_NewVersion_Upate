const { test, expect } = require('@playwright/test');

test('Dynamic Load Element- Wait for Selector @smoke', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/dynamic-loading/2');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.waitForSelector("//h4[normalize-space()='Hello World!']");
    //await page.waitForLoadState('networkidle');
    await expect(page.locator("//h4[normalize-space()='Hello World!']")).toHaveText("Hello World!")
  });