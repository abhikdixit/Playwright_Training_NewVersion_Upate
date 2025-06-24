import { test, expect } from '@playwright/test';
import loginData from '../../TestData/WebOrder_Login_AI.json';

for (const scenario of loginData.scenarios) {
  test(`Login Test - ${scenario.description}`, async ({ page }) => {
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx');
    await page.getByLabel('Username:').fill(scenario.username);
    await page.getByLabel('Password:').fill(scenario.password);
    await page.getByRole('button', { name: 'Login' }).click();

    if (scenario.expected === 'List of All Orders') {
      await expect(page.locator('h2')).toContainText('List of All Orders');
      await page.getByRole('link', { name: 'Logout' }).click();
      await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    } else {
      await expect(page.locator('#ctl00_MainContent_status')).toHaveText(scenario.expectedMessage);
      await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    }
  });
}