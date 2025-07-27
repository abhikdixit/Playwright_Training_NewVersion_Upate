// @ts-check
const { test, expect } = require('@playwright/test');

test.only('Verify that User is able to login with Valid Credentials', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
   await page.locator('#ctl00_MainContent_username').type('Tester');
   await page.locator('#ctl00_MainContent_password').type('test');
   await page.locator('#ctl00_MainContent_login_button').click();
  await expect(page.locator("h2")).toContainText("List of All Orders");
  await expect(page).toHaveURL("http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx")
  });

test('Verify that User is unable to login with InValid Credentials', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
   await page.locator('#ctl00_MainContent_username').type('Tester');
   await page.locator('#ctl00_MainContent_password').type('test1');
   await page.locator('#ctl00_MainContent_login_button').click();
    await expect(page.getByText('Invalid Login or Password.')).toHaveText("Invalid Login or Password.")
  });

  test('Verify that User is unable to login with blank username', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
   await page.locator('#ctl00_MainContent_username').type('');
   await page.locator('#ctl00_MainContent_password').type('test1');
   await page.locator('#ctl00_MainContent_login_button').click();
    await expect(page.getByText('Invalid Login or Password.')).toHaveText("Invalid Login or Password.")
  });
