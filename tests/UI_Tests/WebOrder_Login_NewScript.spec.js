//import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');
test('test', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  await page.getByLabel('Username:').click();
  await page.getByLabel('Username:').fill('Tester');
  await page.getByLabel('Password:').click();
  await page.getByLabel('Password:').fill('test1');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');
  await page.getByRole('link', { name: 'Logout' }).click();
  const login = page.locator('#ctl00_MainContent_login_button');
  await expect(login).toBeVisible();
});