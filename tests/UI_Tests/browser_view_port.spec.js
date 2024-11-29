const { test,expect, chromium, devices, webkit } = require('@playwright/test');

//const iPhone11Pro = devices['iPhone 11 Pro'];
const chrome = devices['Desktop Chrome'];

test('test', async() => {
  const browser = await chromium.launch({
    headless: false, 
  });
  const context = await browser.newContext({
      viewport: chrome.viewport,
      userAgent: chrome.userAgent,
  });
  const page = await context.newPage();
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
    //await page.getByLabel('Username:').click();
    await page.getByLabel('Username:').fill('Tester');
    //await page.getByLabel('Password:').click();
    await page.getByLabel('Password:').fill('test');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();await context.close();
    await browser.close();
})