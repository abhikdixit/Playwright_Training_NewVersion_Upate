const { test, expect, devices } = require('@playwright/test');

test('Intercept network requests', async ({ page }) => {
    // Log and continue all network requests
    await page.route('**', route => {
      console.log(route.request().url());
      route.continue();
    });
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });