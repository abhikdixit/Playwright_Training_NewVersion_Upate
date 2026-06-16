import { test, expect } from '@playwright/test';

test('Invalid Login Mock', async ({ page }) => {

  await page.route('**/notes/api/users/login',async route => {

      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          message: 'Invalid email or password'
        })
      });

    }
  );

 await page.goto("https://practice.expandtesting.com/notes/app/login");
    //await page.getByRole("link", { name: "Login" }).click();
    await page.locator("#email").fill("testing@abc.com");
    await page.locator("#password").fill("test1234");
    await page.getByRole("button", { name: "Login" }).click();

  // Validate error message
  await expect(page.getByText('Invalid email or password')).toBeVisible();

});