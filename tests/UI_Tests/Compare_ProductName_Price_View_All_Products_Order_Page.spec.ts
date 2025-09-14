import { test, expect } from '@playwright/test';

const testParameters = ['MyMoney', 'FamilyAlbum', 'ScreenSaver'];

// Store product price mapping
const productPriceMap = {};

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate and login
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  await page.getByLabel('Username:').fill('Tester');
  await page.getByLabel('Password:').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();

  // Navigate to 'View all products'
  await page.getByRole('link', { name: 'View all products' }).click();

  // Extract product name and price and store in map
  const rows = await page.locator('table.ProductsTable > tbody > tr').all();
  for (let i = 1; i < rows.length; i++) {
    const productName = await rows[i].locator('td').nth(0).textContent();
    const price = await rows[i].locator('td').nth(1).textContent();
    if (productName && price) {
      productPriceMap[productName.trim()] = price.trim().replace('$', '');
    }
  }

  await context.close();
});

for (const Product of testParameters) {
  test(`Validate price for product: ${Product}`, async ({ page }) => {
    // Login
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
    await page.getByLabel('Username:').fill('Tester');
    await page.getByLabel('Password:').fill('test');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');

    // Navigate to Order Page
    await page.getByRole('link', { name: 'Order' }).nth(1).click();
    await expect(page).toHaveURL(/.*Process\.aspx/);

    // Select product and validate price
    await page.getByRole('combobox', { name: 'Product:*' }).selectOption(Product);

    const priceLocator = page.locator('input[name="ctl00$MainContent$fmwOrder$txtUnitPrice"]');
    const actualPrice = await priceLocator.inputValue();

    const expectedPrice = productPriceMap[Product];
    expect(actualPrice).toBe(expectedPrice);

    // Fill form and submit order
    await page.getByLabel('Quantity:*').fill('5');
    await page.getByLabel('Customer name:*').fill('Dixit');
    await page.getByLabel('Street:*').fill('BTM');
    await page.getByLabel('City:*').fill('Bangalore');
    await page.getByLabel('Zip:*').fill('560076');
    await page.getByLabel('Visa').check();
    await page.getByLabel('Card Nr:*').fill('1234567891');
    await page.getByLabel('Expire date (mm/yy):*').fill('12/23');
    await page.getByRole('link', { name: 'Process' }).click();

    const neworder = page.locator("//strong[normalize-space()='New order has been successfully added.']");
    await expect(neworder).toContainText('New order has been successfully added.');

    // Verify new order
    await page.getByRole('link', { name: 'View all orders' }).click();
    await expect(page.locator("//td[text()='Dixit']")).toHaveText('Dixit');

    // Logout
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page).toHaveURL(/Login\.aspx/);
  });
}
