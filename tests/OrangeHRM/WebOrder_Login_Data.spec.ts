//import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const loginData = JSON.parse(fs.readFileSync('c:/Training_Scripts/Playwright_Training_NewVersion/TestData/WebOrder_Login_AI.json', 'utf8'));

test('test', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  await page.getByLabel('Username:').click();
  await page.getByLabel('Username:').fill(loginData.username);
  await page.getByLabel('Password:').click();
  await page.getByLabel('Password:').fill(loginData.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
});