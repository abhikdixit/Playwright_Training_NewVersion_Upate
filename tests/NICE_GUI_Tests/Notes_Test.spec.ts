import { test, expect } from '@playwright/test';

test('Notes @sanity', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/notes/app');
  await page.locator("//a[normalize-space()='Login']").click()
  await expect(page.locator("//h1[normalize-space()='Login']")).toHaveText("Login")
//  // await page.pause()

//   await page.getByLabel('Password:').fill('test');
  
//   await page.getByRole('button', { name: 'Login' }).click();
//   //Verify user has logged in

//   await expect(page.getByRole('link', { name: 'View all orders' })).toHaveText("View all orders")
//   await page.getByRole('link', { name: 'Logout' }).click();
});