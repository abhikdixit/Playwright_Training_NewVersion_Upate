const { test, expect } = require('@playwright/test');

test('E2E Test of Weborders', async ({ page }) => {
  await test.step('Log in to WebOrder Application', async () => {

            await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

            // Click input[name="ctl00\$MainContent\$username"]
            await page.click('input[name="ctl00\\$MainContent\\$username"]');

            // Fill input[name="ctl00\$MainContent\$username"]
            await page.fill('input[name="ctl00\\$MainContent\\$username"]', 'Tester');

            // Click input[name="ctl00\$MainContent\$password"]
            await page.click('input[name="ctl00\\$MainContent\\$password"]');

            // Fill input[name="ctl00\$MainContent\$password"]
            await page.fill('input[name="ctl00\\$MainContent\\$password"]', 'test');

            // Click text=Login
            await page.click('text=Login');
            await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');
    await test.step('Logout from WebOrder Application', async () => {

            // Click text=Logout
            await page.click('text=Logout');
            await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx');
      });
    });
  });
