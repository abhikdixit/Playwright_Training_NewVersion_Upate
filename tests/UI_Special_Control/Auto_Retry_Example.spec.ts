import { test, expect } from '@playwright/test';

test.describe.configure({
  retries: 2
});

test('Payment Test', async ({ page }) => {
   // Page is already created by fixture
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
    await page.getByLabel('Username:').fill('Tester');
    await page.getByLabel('Password:').fill('test');
    await page.getByRole('button', {name: 'Login1'}).click();
    // Verify login
    await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');
    await expect(page.getByRole('link', {name:'Logout'})).toBeVisible();

});