import { test, expect } from '@playwright/test';

test.describe('E2E Test - Hooks Example in Playwright', () => {

  test.beforeEach(async ({ page }) => {
     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').click();
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

  })
  test('Go to Admin Page', async ({ page }) => {
    //Click on Admin Tab
  await page.click("//span[text()='Admin']")
  await page.waitForLoadState(); // The promise resolves after 'load' event.
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
  

  });

  test('Go to Leave Page', async ({ page }) => {
    await page.locator("//span[text()='Leave']").click();

  });

  test('Go to PIM Page', async ({ page }) => {
    await page.locator("//span[text()='PIM']").click();

  });

  test.afterEach('Logout from app', async ({ page }) => {
     await page.locator('.oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon').click();

    // Click text=Logout
    await page.locator('text=Logout').click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
});
});