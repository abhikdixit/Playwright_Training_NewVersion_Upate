// @ts-check
const { test, expect } = require('@playwright/test');

//import { test, expect } from '@playwright/test';

test('Weborder Login Functionality', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

  await page.getByLabel('Username:').type('Tester')

  await page.getByLabel('Password:').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();

});