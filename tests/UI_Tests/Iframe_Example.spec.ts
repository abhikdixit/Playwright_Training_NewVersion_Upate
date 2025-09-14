import { test, expect } from '@playwright/test';

test('HDFC Bank Login with IFrame handling', async ({ page }) => {
  await page.goto('https://netbanking.hdfcbank.com/netbanking/');
  
  // Wait for frame to be attached
  await page.waitForSelector('frame[name="login_page"]');
  
  const loginFrame = page.frame({ name: 'login_page' });
  if (!loginFrame) {
    throw new Error('Login frame not found');
  }

  // Interact with elements inside the frame
  await loginFrame.waitForSelector('input[name="fldLoginUserId"]');
  await loginFrame.click('input[name="fldLoginUserId"]');
  await loginFrame.fill('input[name="fldLoginUserId"]', '1000');
  await loginFrame.click('text=CONTINUE');

  // Wait for navigation and verify URL
  await page.waitForURL('https://netportal.hdfcbank.com/nb-login/login.jsp', { waitUntil: 'networkidle' });
  await expect(page).toHaveURL('https://netportal.hdfcbank.com/nb-login/login.jsp');
});