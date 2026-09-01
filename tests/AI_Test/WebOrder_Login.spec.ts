import { test, expect } from '@playwright/test';

const loginUrl = 'http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx';

test('WebOrders login page should allow valid user login', async ({ page }) => {
  await page.goto(loginUrl);

  await expect(page).toHaveURL(/Login.aspx/);
  await expect(page.getByRole('heading', { name: 'Web Orders Login' })).toBeVisible();

  await page.getByLabel('Username:').fill('Tester');
  await page.getByLabel('Password:').fill('test');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/Default\.aspx/);
  await expect(page.getByRole('heading', { name: 'Web Orders' })).toBeVisible();
});
