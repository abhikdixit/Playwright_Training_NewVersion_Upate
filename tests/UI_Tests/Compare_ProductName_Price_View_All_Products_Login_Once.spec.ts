import { test, expect } from '@playwright/test';

const testParameters = ['MyMoney', 'FamilyAlbum', 'ScreenSaver'];
const productPriceMap = {};

let page; // shared page across tests

test.describe.serial('Validate Products with Single Login', () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();

    // Login
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
    await page.getByLabel('Username:').fill('Tester');
    await page.getByLabel('Password:').fill('test');
    await page.getByRole('button', { name: 'Login' }).click();

    // Go to 'View all products' and store prices
    await page.getByRole('link', { name: 'View all products' }).click();
    const rows = await page.locator('table.ProductsTable > tbody > tr').all();
    for (let i = 1; i < rows.length; i++) {
      const productName = await rows[i].locator('td').nth(0).textContent();
      const price = await rows[i].locator('td').nth(1).textContent();
      if (productName && price) {
        productPriceMap[productName.trim()] = price.trim().replace('$', '');
      }
    }
  });

  for (const Product of testParameters) {
    test(`Validate and order product: ${Product}`, async () => {
      // Navigate to Order Page
      await page.getByRole('link', { name: 'Order' }).nth(1).click();
      await expect(page).toHaveURL(/.*Process\.aspx/);

      // Select product and validate price
      await page.getByRole('combobox', { name: 'Product:*' }).selectOption(Product);
      const priceLocator = page.locator('input[name="ctl00$MainContent$fmwOrder$txtUnitPrice"]');
      const actualPrice = await priceLocator.inputValue();

      const expectedPrice = productPriceMap[Product];
      expect(actualPrice).toBe(expectedPrice);

      // Fill and submit order
      await page.getByLabel('Quantity:*').fill('5');
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const customerName = `Dixit${randomNum}`;
      await page.getByLabel('Customer name:*').fill(customerName);
      await page.getByLabel('Street:*').fill('BTM');
      await page.getByLabel('City:*').fill('Bangalore');
      await page.getByLabel('Zip:*').fill('560076');
      await page.getByLabel('Visa').check();
      await page.getByLabel('Card Nr:*').fill('1234567891');
      await page.getByLabel('Expire date (mm/yy):*').fill('12/23');
      await page.getByRole('link', { name: 'Process' }).click();

      const newOrder = page.locator("//strong[normalize-space()='New order has been successfully added.']");
      await expect(newOrder).toContainText('New order has been successfully added.');

      // Verify new order
      await page.getByRole('link', { name: 'View all orders' }).click();
      await expect(page.locator("//td[text()='" + customerName + "']")).toHaveText(customerName);
    });
  }

  test.afterAll(async () => {
    await page.getByRole('link', { name: 'Logout' }).click();
    await page.close();
  });
});
