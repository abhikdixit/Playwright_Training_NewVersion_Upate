import { test, expect } from '@playwright/test';

test('Add Unique User and Verify Creation @smoke', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  //await page.pause();
  await expect(page.getByRole('heading')).toContainText('Dashboard');
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('button', { name: ' Add' }).click();
  await page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first().click();
  await page.getByRole('option', { name: 'Admin' }).click();
  await page.locator('div:nth-child(3) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
  await page.getByText('Enabled').click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).fill('a');
  await page.waitForTimeout(5000);
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');

  let ExpUsername = "Dixit" + Math.random(); // e.g., 0.7381904799295932

  await page.getByRole('textbox').nth(2).fill(ExpUsername);
  //await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill('Admin123');
  //await page.getByRole('textbox').nth(4).click();
  await page.getByRole('textbox').nth(4).fill('Admin123');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('table')).toContainText(ExpUsername);
  await page.getByRole('img', { name: 'profile picture' }).click();
  //await page.getByRole('listitem').filter({ hasText: 'Richard DanULName1ULName1' }).locator('i').click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
});