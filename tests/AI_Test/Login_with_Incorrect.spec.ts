import { test, expect } from '@playwright/test';

test('Login User with incorrect email and password', async ({ page }) => {
  await page.goto('https://automationexercise.com');

  // Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/i);
  await expect(page.getByRole('link', { name: 'Signup / Login' })).toBeVisible();

  // Click on 'Signup / Login' button
  await page.getByRole('link', { name: 'Signup / Login' }).click();

  // Verify 'Login to your account' is visible
  const loginHeading = page.getByRole('heading', { name: 'Login to your account' });
  await expect(loginHeading).toBeVisible();

  const loginSection = loginHeading.locator('..');

  // Enter incorrect email address and password
  await loginSection.getByPlaceholder('Email Address').fill('incorrect@example.com');
  await loginSection.getByPlaceholder('Password').fill('wrongpassword');

  // Click 'login' button
  await loginSection.getByRole('button', { name: 'Login' }).click();

  // Verify error message is visible
  await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
});
