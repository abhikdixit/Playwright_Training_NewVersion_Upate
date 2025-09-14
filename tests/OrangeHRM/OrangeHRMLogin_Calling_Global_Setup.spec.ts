import { test, expect } from '@playwright/test';

test('Should Logout from application', async ({ page }) => {
  // Because of storageState.json, you can land directly on dashboard
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('button', { name: ' Add' }).click();
  await page.locator('form i').first().click();
  await page.getByRole('option', { name: 'Admin' }).getByText('Admin').click();
  await page.locator('form i').nth(1).click();
  await page.getByText('Enabled').click();
});
