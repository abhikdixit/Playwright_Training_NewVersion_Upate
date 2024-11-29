const { test,expect, chromium, devices, webkit } = require('@playwright/test');

//const iPhone11Pro = devices['iPhone 11 Pro'];
const Galaxy8 = devices['Galaxy S8'];
test('test', async() => {
    const browser = await webkit.launch({
      headless: false, 
    });
    const context = await browser.newContext({
        viewport: Galaxy8.viewport,
        userAgent: Galaxy8.userAgent,
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