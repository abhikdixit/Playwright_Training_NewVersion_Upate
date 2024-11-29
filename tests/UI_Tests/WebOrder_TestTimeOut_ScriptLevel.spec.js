const { test, expect } = require('@playwright/test');
const assert = require('assert')

test('test', async ({ page }) => {
  test.setTimeout(50000);
  // Go to http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

  // Click input[name="ctl00\$MainContent\$username"]
  await page.click('input[name="ctl00\\$MainContent\\$username"]');

  // Fill input[name="ctl00\$MainContent\$username"]
  await page.fill('input[name="ctl00\\$MainContent\\$username"]', 'Tester');

  // Click input[name="ctl00\$MainContent\$password"]
  await page.click('input[name="ctl00\\$MainContent\\$password"]');

  // Fill input[name="ctl00\$MainContent\$password"]
  await page.fill('input[name="ctl00\\$MainContent\\$password"]', 'test');

  // Click text=Login
  await page.click('text=Login1');
  await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');

});