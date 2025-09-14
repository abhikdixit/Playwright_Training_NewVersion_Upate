import { test, expect } from '@playwright/test';

test('To test with valid credentials for OrangeHRM', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder("Username").fill('Admin');
  await page.getByPlaceholder("Password").fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator("//h6[text()='Dashboard']")).toContainText('Dashboard');
});