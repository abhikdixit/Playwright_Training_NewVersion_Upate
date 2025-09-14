import { test, expect } from '@playwright/test';
const assert = require('assert')

test.describe('Hooks', () =>{

  test.beforeEach(async ({ page }) => {
      // Go to http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  })
//To capture screenshot of particular element
test('Login to Weborders @smoke', async ({ page }) => {

  // Go to http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx
  //await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

    // Capture specific element screenshots
    const element = await page.$('#ctl00_MainContent_login_button')
    if (element) {
      await element.screenshot({ path: './tests/Screenshots/LoginButton.png'})
    } else {
      throw new Error("Login button element not found");
    }

});
//To capture the full page screenshot
test('Capture Full page screenshot', async ({ page }) => {

  // Go to http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx
  //await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

  // Capture full page screenshots
  await page.screenshot({ path: './tests/Screenshots/Fullpage.png', fullPage: true})
 
})
});