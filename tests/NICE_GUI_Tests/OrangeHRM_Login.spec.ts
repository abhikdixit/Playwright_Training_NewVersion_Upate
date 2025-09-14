import { test, expect } from '@playwright/test';

test('OrangeHRM Login', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder("Username").fill('Admin');
 // await page.pause()
  await page.getByPlaceholder("Password").fill('admin123');
  await page.getByRole('button', { name: ' Login ' }).click();
  //Verify user has logged in
  await expect(page.locator("//h6[text()='Dashboard']")).toBeVisible()
  await expect(page.locator("//h6[text()='Dashboard']")).toHaveText("Dashboard");
  await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
});