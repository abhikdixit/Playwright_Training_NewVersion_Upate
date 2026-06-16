// @ts-check
import { test, expect } from '@playwright/test';

//import { test, expect } from '@playwright/test';

test('Weborder Login Functionality @sanity', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  await page.keyboard.type('Tester');
  await page.keyboard.press('Tab');
  //await page.getByLabel('Username:').type('Tester')
  await page.keyboard.type('test');
  await page.keyboard.press('Enter');
  await page.waitForLoadState()
  await expect.soft(page.locator('#ctl00_logout1')).toHaveText('Logout');
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.waitForTimeout(5000);

});