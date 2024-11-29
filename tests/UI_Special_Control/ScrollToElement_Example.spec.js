// @ts-check
import { test, expect } from '@playwright/test';

test('Scroll To Particular Element Example @sanity', async ({ page }) => {
  await page.goto('https://stackoverflow.com/');
  //await page.pause()
  const element = page.locator("//a[normalize-space()='Careers at Stack Overflow']")
  await element.scrollIntoViewIfNeeded()
  await element.click()
  await page.pause()
});