const { test, expect } = require('@playwright/test');

test('Yatra Login Page', async ({ page }) => {

  // Go to https://opensource-demo.orangehrmlive.com/index.php/auth/login
  await page.goto('http://admin:admin@the-internet.herokuapp.com/basic_auth');
  await expect(page).toHaveURL('http://the-internet.herokuapp.com/basic_auth');
  await expect(page.locator("//p[contains(text(),'Congratulations! You must have the proper credenti')]")).toHaveText("Congratulations! You must have the proper credentials.")
 
});