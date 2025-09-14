import { test, expect } from '@playwright/test';

test('Login to OrangeHRM and verify Dashboard', async ({ page }) => {
  try {
    // Navigate to the login page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Wait for the login form to be visible and stable
    await page.waitForLoadState('networkidle');
    
    // Enter credentials
    await page.locator('input[name="username"]').waitFor();
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');

    // Click login and wait for navigation
    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]')
    ]);

    // Verify dashboard
    await expect(page.locator('.oxd-text.oxd-text--h6')).toHaveText('Dashboard');
    
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
});
