import { test, expect } from '@playwright/test';

// test('test - Frame', async ({ page }) => {
//   await page.goto('https://netbanking.hdfcbank.com/netbanking/');
//   const loginFrame = await page.frame({ name: 'login_page' });
//   if (loginFrame) {
//     await loginFrame.click('input[name="fldLoginUserId"]');
//     await loginFrame.fill('input[name="fldLoginUserId"]', '1000');
//     await loginFrame.click('text=CONTINUE');
//   } else {
//     throw new Error('login_page frame not found');
//   }
//   await expect(page).toHaveURL('https://netportal.hdfcbank.com/nb-login/login.jsp');
//   await page.waitForTimeout(5000) // Thread.sleep(5000)

// });

test('test- Without Frame/iFrame', async ({ page }) => {
  await page.goto('https://jqueryui.com/datepicker/');
  await page.waitForLoadState('load');
    await page.locator('iframe').contentFrame().locator('#datepicker').fill('05/05/2026');
  //await page.locator("#datepicker").fill("05/05/2026");
  await page.waitForTimeout(5000) // Thread.sleep(5000)

});