const { test, expect } = require('@playwright/test');

test('Multiple Browser Tabs insider single Browser', async ({ browser }) => {
    const context = await browser.newContext()
    const  page1 = await context.newPage()
    //await page1.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  // Go to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  await page1.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Click [placeholder="Username"]
  await page1.locator('[placeholder="Username"]').click();

  // Fill [placeholder="Username"]
  await page1.locator('[placeholder="Username"]').fill('Admin');

  // Click [placeholder="Password"]
  await page1.locator('[placeholder="Password"]').click();

  // Fill [placeholder="Password"]
  await page1.locator('[placeholder="Password"]').fill('admin123');

  // Click button:has-text("Login")
  await page1.locator('button:has-text("Login")').click();
  await expect(page1).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    await page1.waitForTimeout(3000)
//New Tab
    const  page2 = await context.newPage()
    await page2.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
      // Click input[name="ctl00\$MainContent\$username"]
    await page2.click('input[name="ctl00\\$MainContent\\$username"]');
  // Fill input[name="ctl00\$MainContent\$username"]
    await page2.fill('input[name="ctl00\\$MainContent\\$username"]', 'Tester');
  // Click input[name="ctl00\$MainContent\$password"]
    await page2.click('input[name="ctl00\\$MainContent\\$password"]');
  // Fill input[name="ctl00\$MainContent\$password"]
    await page2.fill('input[name="ctl00\\$MainContent\\$password"]', 'test');
  // Click text=Login
    await page2.click('text=Login');
    await expect(page2).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');
    await page1.waitForTimeout(3000)
});