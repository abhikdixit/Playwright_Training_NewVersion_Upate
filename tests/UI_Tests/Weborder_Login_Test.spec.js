// @ts-check
const { test, expect } = require('@playwright/test');

test('Verify that User is able to login with Valid Credentials', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

   await page.locator('#ctl00_MainContent_username').type('Tester');

   await page.locator('#ctl00_MainContent_password').type('test');

   await page.locator('#ctl00_MainContent_login_button').click();
  
  // Expects the URL to contain intro.
  await expect(page).toHaveURL('/samples/TestComplete11/WebOrders/default.aspx');
  //Verify the Text
  await expect(page.locator('#ctl00_menu > li:nth-child(1) > a')).toContainText('View all orders');
  await expect(page.locator('#ctl00_menu > li:nth-child(1) > a')).toHaveText('View all orders');
});
