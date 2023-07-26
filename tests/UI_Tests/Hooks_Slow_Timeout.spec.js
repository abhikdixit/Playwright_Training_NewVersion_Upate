const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
  // This will help to mesure the performance of test within given timeline
  test.setTimeout(10000);
  //Unconditionally marks a test as "slow". Slow test will be given triple the default timeout.
  //test.slow();
  // Go to https://opensource-demo.orangehrmlive.com/index.php/auth/login
  await page.goto('https://opensource-demo.orangehrmlive.com/index.php/auth/login');

  // Click #divUsername >> text=Username
  await page.click('#divUsername >> text=Username');

  // Fill input[name="txtUsername"]
  await page.type('input[name="txtUsername"]', 'Admin');

  // Click input[name="txtPassword"]
  await page.click('input[name="txtPassword"]');

  // Fill input[name="txtPassword"]
  await page.fill('input[name="txtPassword"]', 'admin123');

  // Click input:has-text("LOGIN")
  await page.click('input:has-text("LOGIN")');
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/dashboard');

  // Click text=Welcome paul
  await page.click('#welcome');

  // Click text=Logout
  await page.click('text=Logout');
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/auth/login');
  const loginpanel = await page.locator("#logInPanelHeading")
  await expect(loginpanel).toBeVisible()

});