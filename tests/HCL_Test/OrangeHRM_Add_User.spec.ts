import { test, expect, Page } from '@playwright/test';

test('OrangeHRM Add User @smoke', async ({ page }: { page: Page }) => {

  // Navigate to login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Login
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Validate Dashboard
  await expect(page.getByRole('heading')).toContainText('Dashboard');

  // Navigate to Admin
  await page.getByRole('link', { name: 'Admin' }).click();

  // Click Add User
  await page.getByRole('button', { name: /Add/i }).click();

  // Select User Role
  await page.locator('.oxd-select-text').first().click();
  await page.getByRole('option', { name: 'Admin' }).click();

  // Select Status
  await page.locator('.oxd-select-text').nth(1).click();
  await page.getByRole('option', { name: 'Enabled' }).click();

  // Employee Name (Auto-suggest)
  const employeeInput = page.getByRole('textbox', { name: 'Type for hints...' });
  await employeeInput.fill('a');

  // Wait for dropdown suggestion instead of timeout
  await page.waitForSelector('.oxd-autocomplete-option');

  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');

  // Username
  await page.getByRole('textbox').nth(2).fill('dixit3');

  // Password
  await page.getByRole('textbox').nth(3).fill('Admin123');
  await page.getByRole('textbox').nth(4).fill('Admin123');

  // Save User
  await page.getByRole('button', { name: 'Save' }).click();

  // Validate User Creation
  await expect(page.getByRole('table')).toContainText('dixit3');

  // Logout
  await page.getByRole('banner').getByRole('img', { name: 'profile picture' }).click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
});