import { test, expect } from '@playwright/test';

test('Demo Web Shop login with valid credentials', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/login');

  await page.getByLabel('Email:').fill('abhinay.dixit@hotmail.com');
  await page.getByLabel('Password:').fill('test@1234');
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'abhinay.dixit@hotmail.com' })).toBeVisible();
});
