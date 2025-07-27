//import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  await page.getByLabel('Username:').fill('Tester');
  await page.getByLabel('Password:').fill('test');
  await page.pause();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle');
  //await page.waitForURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');
  await expect(page).toHaveURL("http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx")
  await page.url().includes("/default.aspx")
  await page.getByRole('link', { name: 'Logout' }).click();
});