import { test, expect } from '@playwright/test';

test('WebOrder Login with valid credentials', async ({ page }) => {
  test.info()
  test.setTimeout(60000); // Set timeout to 60 seconds for the entire test
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  //await page.getByRole('textbox', { name: 'Username:' }).fill('Tester');
  await page.getByLabel('Username:').fill('Tester',{timeout:30000}); // default 30 sec
  await page.getByRole('textbox', { name: 'Password:' }).fill('test',{timeout:30000}); // default 30 sec
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');
  await expect(page).toHaveTitle('Web Orders');
  await expect(page.locator('h2')).toContainText('List of All Orders');// default 5 sec
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});