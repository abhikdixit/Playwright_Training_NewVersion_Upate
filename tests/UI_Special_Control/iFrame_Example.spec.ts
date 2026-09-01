import { test, expect } from '@playwright/test';

test('Without Frame/iFrame', async ({ page }) => {
  await page.goto('https://jqueryui.com/datepicker/');
  await page.waitForLoadState('load');
  await page.locator('iframe').contentFrame().locator('#datepicker').fill('05/05/2026');
  //await page.frameLocator('[src*="default.html"]').locator('#datepicker').fill('05/05/2026');
  //await page.locator("#datepicker").fill("05/05/2026");
  await page.waitForTimeout(5000) // Thread.sleep(5000)

});