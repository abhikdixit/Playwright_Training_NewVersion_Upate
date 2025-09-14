// playwright WebOrder_DeleteOrder_VerifyOrder.spec.js
// This script automates login, create, update, and delete order scenarios for Web Orders using Playwright

const { test, expect } = require('@playwright/test');

// Utility to generate a random username
function generateRandomUserName() {
  return 'Dixit' + Math.floor(Math.random() * 1000);
}

let UserName;

// Test suite
// Each test depends on the previous one (serial)
test.describe.serial('WebOrder DeleteOrder VerifyOrder', () => {
  test('Login to app', async ({ page }) => {
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
    await page.fill('input[name="ctl00$MainContent$username"]', 'Tester');
    await page.fill('input[name="ctl00$MainContent$password"]', 'test');
    await page.click('input[name="ctl00$MainContent$login_button"]');
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
    // Verify text present
    await expect(page.locator('h2')).toHaveText('List of All Orders');
    // Verify title
    await expect(page).toHaveTitle('Web Orders');
    // Verify URL
    await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');
  });

  test('Create Order', async ({ page }) => {
    // Assumes already logged in
    await page.click('text=Order');
    await page.selectOption('select[name="ctl00$MainContent$fmwOrder$ddlProduct"]', { label: 'FamilyAlbum' });
    await page.fill('input[name="ctl00$MainContent$fmwOrder$txtQuantity"]', '5');
    UserName = generateRandomUserName();
    await page.fill('input[name="ctl00$MainContent$fmwOrder$txtName"]', UserName);
    await page.fill('input[name="ctl00$MainContent$fmwOrder$TextBox2"]', 'ABC');
    await page.fill('input[name="ctl00$MainContent$fmwOrder$TextBox3"]', 'Redwood');
    await page.fill('input[name="ctl00$MainContent$fmwOrder$TextBox5"]', '5');
    await page.check('#ctl00_MainContent_fmwOrder_cardList_1');
    await page.fill('input[name="ctl00$MainContent$fmwOrder$TextBox6"]', '123456789');
    await page.fill('input[name="ctl00$MainContent$fmwOrder$TextBox1"]', '12/23');
    await page.click('#ctl00_MainContent_fmwOrder_InsertButton');
    await expect(page.locator('strong')).toHaveText('New order has been successfully added.');
    // Go back to View All Orders and verify user
    await page.click('text=View all orders');
    const userCell = page.locator(`//td[text()='${UserName}']`);
    await expect(userCell).toHaveText(UserName);
  });

  test('Update Order', async ({ page }) => {
    // Assumes already logged in and order created
    await page.click('text=View all orders');
    await page.click(`xpath=//td[text()='${UserName}']/following-sibling::td/input`);
    await expect(page.locator('h2')).toHaveText('Edit Order');
    await page.fill('input[name="ctl00$MainContent$fmwOrder$TextBox4"]', 'CA');
    await page.click('#ctl00_MainContent_fmwOrder_UpdateButton');
    const stateCell = page.locator(`//td[text()='${UserName}']/following-sibling::td[text()='CA']`);
    await expect(stateCell).toHaveText('CA');
  });

  test('Delete Order', async ({ page }) => {
    // Assumes already logged in and order created
    await page.click('text=View all orders');
    await page.click(`xpath=//td[text()='${UserName}']/preceding-sibling::td/input`);
    await page.click('input[name="ctl00$MainContent$btnDelete"]');
    // Verify user is deleted
    const pageSource = await page.content();
    expect(pageSource.includes(UserName)).toBeFalsy();
  });
});
