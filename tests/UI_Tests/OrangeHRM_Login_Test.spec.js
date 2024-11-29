import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  //await page.getByRole('button', { name: 'Login' }).click();
  await page.locator("//button[normalize-space()='Login']").click();
  await page.waitForSelector("h6")
  await expect(page.getByRole('heading')).toContainText('Dashboard');
  await page.locator("//i[@class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']").click();
  await page.getByRole('menuitem', { name: 'Logout' }).click()
  await expect(page.getByRole('heading')).toContainText('Login');
  await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
});