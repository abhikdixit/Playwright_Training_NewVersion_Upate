const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
  await page.goto('https://netbanking.hdfcbank.com/netbanking/');
  await page.frame({name: 'login_page'}).click('input[name="fldLoginUserId"]');
  await page.frame({name: 'login_page'}).fill('input[name="fldLoginUserId"]', '1000');
  await page.frame({name: 'login_page'}).click('text=CONTINUE');
//   await page.click('input[name="fldLoginUserId"]');
//   await page.fill('input[name="fldLoginUserId"]', '1000');
//   await page.click('text=CONTINUE');
  await expect(page).toHaveURL('https://netportal.hdfcbank.com/nb-login/login.jsp');
  await page.waitForTimeout(5000)
});