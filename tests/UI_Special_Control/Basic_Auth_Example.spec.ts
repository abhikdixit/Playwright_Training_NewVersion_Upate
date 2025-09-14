import { test, expect } from '@playwright/test';

test('Basic Auth Page Handling', async ({ page }) => {

  // Set HTTP credentials for basic authentication
  await page.context().setHTTPCredentials({
    username: 'admin',
    password: 'admin'
  });

  // Navigate to the page that requires basic authentication
  await page.goto('http://the-internet.herokuapp.com/basic_auth');
  
  // Verify that the URL is correct
  await expect(page).toHaveURL('http://the-internet.herokuapp.com/basic_auth');
  
  // Verify the success message is displayed on the page
  await expect(page.locator('text=Congratulations! You must have the proper credentials.')).toBeVisible();
});
