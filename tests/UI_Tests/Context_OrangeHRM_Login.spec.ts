import { test, expect } from '@playwright/test';

test('To test with valid credentials for OrangeHRM', async ({ browser }) => {
  // Create a new incognito browser context
  const context = await browser.newContext();
  // Create a new page inside context.
  const page = await context.newPage();
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder("Username").fill('Admin');
  await page.getByPlaceholder("Password").fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
});