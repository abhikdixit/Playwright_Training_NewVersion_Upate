const { test, expect } = require('@playwright/test');

test('AutomationExercise - Login and Delete Account', async ({ page }) => {
  // 1. Launch browser and 2. Navigate to url
  await page.goto('http://automationexercise.com');
  // 3. Verify that home page is visible successfully
  await expect(page.locator('body')).toContainText('Home');
  // 4. Click on 'Signup / Login' button
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  // 5. Verify 'Login to your account' is visible
  await expect(page.getByText('Login to your account')).toBeVisible();
  // 6. Enter correct email address and password
  await page.getByPlaceholder('Email Address').fill('your_email@example.com');
  await page.getByPlaceholder('Password').fill('your_password');
  // 7. Click 'login' button
  await page.getByRole('button', { name: 'Login' }).click();
  // 8. Verify that 'Logged in as username' is visible
  await expect(page.getByText(/Logged in as/i)).toBeVisible();
  // 9. Click 'Delete Account' button
  await page.getByRole('link', { name: 'Delete Account' }).click();
  // 10. Verify that 'ACCOUNT DELETED!' is visible
  await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
});
