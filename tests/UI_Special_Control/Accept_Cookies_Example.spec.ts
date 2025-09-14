import { test, expect } from '@playwright/test';

test('OrangeHRM Login Functional', async ({ page }) => {
  await page.goto('https://practicalaction.org/privacy-notice/website-and-cookies/');
  const accept_cookies = await page.locator("//button[@id='onetrust-accept-btn-handler']")
  await page.waitForTimeout(2000)
  await accept_cookies.focus()
  await page.waitForTimeout(2000)
  await accept_cookies.click()
  await page.waitForTimeout(2000)
});