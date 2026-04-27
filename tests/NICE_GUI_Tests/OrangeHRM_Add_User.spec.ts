import { test, expect } from '@playwright/test';

test('OrangeHRM Add User @smoke', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
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
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  
  //await page.getByText('Abhi Dixit').click();
  //await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill('dixit11');
  //await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill('Admin123');
  //await page.getByRole('textbox').nth(4).click();
  await page.getByRole('textbox').nth(4).fill('Admin123');
  await page.getByRole('button', { name: 'Save' }).click();
  //await page.waitForTimeout(8000);
  await expect(page.getByRole('table')).toContainText('dixit11');
  await page.getByRole('banner').getByRole('img', { name: 'profile picture' }).click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
});