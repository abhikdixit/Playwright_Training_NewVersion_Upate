const { test, expect, devices } = require('@playwright/test');

test('Intercept network requests', async ({ page }) => {
    // Log and continue all network requests
    await page.route('**', route => {
      console.log(route.request().url());
      console.log(route.request().failure())
      route.continue();
    });
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    //await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx');
  
  });