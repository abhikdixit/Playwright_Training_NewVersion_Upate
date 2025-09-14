import { test, expect, Dialog } from '@playwright/test';

test('HDFC NetBanking Login with Alert handling', async ({ page }) => {
  // Set up dialog handler before navigation
  const dialogPromise = new Promise<Dialog>(resolve => {
    page.once('dialog', resolve);
  });

  // Navigate to the banking page
  await page.goto('https://netbanking.hdfcbank.com/netbanking/');
  
  // Wait for frame to be attached and get frame handle
  await page.waitForSelector('frame[name="login_page"]');
  const loginFrame = page.frame({ name: 'login_page' });
  if (!loginFrame) {
    throw new Error('Login frame not found');
  }

  // Wait for input field and interact with login form
  await loginFrame.waitForSelector('input[name="fldLoginUserId"]');
  await loginFrame.fill('input[name="fldLoginUserId"]', '1000');
  await loginFrame.click('text=CONTINUE');

  // Handle the alert dialog
  const dialog = await dialogPromise;
  console.log(`Dialog message: ${dialog.message()}`);
  await dialog.dismiss().catch(error => {
    console.warn('Dialog dismiss failed:', error);
  });

  // Verify we're still on the login page after dialog dismiss
  await expect(page).toHaveURL('https://netbanking.hdfcbank.com/netbanking/');
});