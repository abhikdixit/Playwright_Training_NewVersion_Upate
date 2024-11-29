const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
  test.setTimeout(70000)
  // This will help to mesure the performance of test within given timeline
  //test.setTimeout(10000);
  //Unconditionally marks a test as "slow". Slow test will be given triple the default timeout.
  //test.slow();
  // Go to https://opensource-demo.orangehrmlive.com/index.php/auth/login
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  // Fill input[name="txtUsername"]
  await page.type("input[placeholder='Username']", 'Admin');
  // Fill input[name="txtPassword"]
  await page.fill("input[placeholder='Password']", 'admin123');
  // Click input:has-text("LOGIN")
  await page.click("button[type='submit']");
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

  // Click text=Welcome paul
  await page.click(".oxd-userdropdown-name");

  // Click text=Logout
  await page.click('text=Logout');
  //await expect.soft(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login1');
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  const loginpanel = await page.locator("//h5[normalize-space()='Login']")
  await expect(loginpanel).toBeVisible()

});