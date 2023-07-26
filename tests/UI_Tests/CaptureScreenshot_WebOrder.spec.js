const { test, expect } = require('@playwright/test');
const assert = require('assert')
//To capture screenshot of particular element
test('Login to Weborders @smoke', async ({ page }) => {

  // Go to http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

    // Capture specific element screenshots
    const element = await page.$('#ctl00_MainContent_login_button')
    await element.screenshot({ path: './tests/Screenshots/LoginButton.png'})

});
//To capture the full page screenshot
test.skip('Capture Full page screenshot', async ({ page }) => {

  // Go to http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

  // Capture full page screenshots
  await page.screenshot({ path: './tests/Screenshots/Fullpage.png', fullPage: true})
 
});