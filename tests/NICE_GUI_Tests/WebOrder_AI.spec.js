const { test, expect } = require('@playwright/test');
const fs = require('fs');

const loginData = JSON.parse(fs.readFileSync('c:\\Training_Scripts\\Playwright_Training_NewVersion\\TestData\\loginData.json', 'utf8'));

test('login to app', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  await page.fill('input[name="ctl00$MainContent$username"]', loginData.username);
  await page.fill('input[name="ctl00$MainContent$password"]', loginData.password);
  await page.click('input[name="ctl00$MainContent$login_button"]');
  const logoutLink = await page.isVisible('text=Logout');
  expect(logoutLink).toBeTruthy();
  await page.click('//a[text()="Logout"]');
  const loginButton = await page.isVisible('input[name="ctl00$MainContent$login_button"]');
  expect(loginButton).toBeTruthy();
});
