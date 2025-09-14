import { test, expect } from '@playwright/test';

test('OrangeHRM Login Functional', async ({ page }) => {
  await page.goto('https://www.orangehrm.com/en/30-day-free-trial');
  //await page.getByLabel('Username:').click();
  await page.pause();
  const name = await page.locator("//input[@id='Form_getForm_Name']")
  await name.focus()
  await page.waitForTimeout(2000)
  await name.fill("Tester")
  await page.waitForTimeout(2000)
});