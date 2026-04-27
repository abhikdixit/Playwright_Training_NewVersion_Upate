import { test, Page, expect } from '@playwright/test';
import { Login_LogoutPage } from './BaseTest';

test.describe('WebOrder E2E Test tests @sanity', () => {
  let loginPage: Login_LogoutPage;
  let page: Page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    loginPage = new Login_LogoutPage(page);

    // ✅ Login once before all tests
    await loginPage.gotoURLAPP('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await loginPage.loginToAppOrangeHRM('Admin', 'admin123');
    await loginPage.verifyURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

  });

  test('Add Unique User and Verify Creation', async () => {
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('button', { name: ' Add' }).click();
  await page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first().click();
  await page.getByRole('option', { name: 'Admin' }).click();
  await page.locator('div:nth-child(3) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
  await page.getByText('Enabled').click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).fill('a');
  await page.waitForTimeout(5000);
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');

  let ExpUsername = "Dixit" + Math.random(); // e.g., 0.7381904799295932

  await page.getByRole('textbox').nth(2).fill(ExpUsername);
  //await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill('Admin123');
  //await page.getByRole('textbox').nth(4).click();
  await page.getByRole('textbox').nth(4).fill('Admin123');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('table')).toContainText(ExpUsername);
  await page.getByRole('img', { name: 'profile picture' }).click();
  //await page.getByRole('listitem').filter({ hasText: 'Richard DanULName1ULName1' }).locator('i').click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
});
})