const { test, expect } = require('@playwright/test');

test.describe.parallel('Login / Logout Flow', () => {
  // Before Hook
  test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  })

  // Negative Scenario
  test('Negative Scenario for login', async ({ page }) => {
    await page.type("input[placeholder='Username']", 'Admin');
    // Fill input[name="txtPassword"]
    await page.fill("input[placeholder='Password']", 'admin1234');
    // Click input:has-text("LOGIN")
    await page.click("button[type='submit']");
    const errorMessage = await page.locator("//p[@class='oxd-text oxd-text--p oxd-alert-content-text']")
    await expect(errorMessage).toContainText('Invalid credentials')
  })

  // Positive Scenario + Logout
  test('Positive Scenario for login + logout', async ({ page }) => {
    await page.type("input[placeholder='Username']", 'Admin');
    // Fill input[name="txtPassword"]
    await page.fill("input[placeholder='Password']", 'admin123');
    // Click input:has-text("LOGIN")
    await page.click("button[type='submit']");
    const DashboardTab = await page.locator("//span[text()='PIM']")
    await expect(DashboardTab).toContainText('PIM')
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
    await page.waitForTimeout(5000);
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/logout')
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })
})
