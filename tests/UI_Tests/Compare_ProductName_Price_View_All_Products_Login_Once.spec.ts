import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';

const testParameters = ['MyMoney', 'FamilyAlbum', 'ScreenSaver'];
const productPriceMap: Record<string, string> = {};

let page: Page; // shared page across tests

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
      await page.getByRole('link', { name: 'Order', exact: true }).click();
      await expect(page).toHaveURL(/.*Process\.aspx/);

      // Select product and validate price
      await page.getByRole('combobox', { name: 'Product:*' }).selectOption(Product);
      const priceLocator = page.locator('input[name="ctl00$MainContent$fmwOrder$txtUnitPrice"]');
      const actualPrice = await priceLocator.inputValue();

      const expectedPrice = productPriceMap[Product];
      expect(actualPrice).toBe(expectedPrice);
    });
  }

  test.afterAll(async () => {
    await page.getByRole('link', { name: 'Logout' }).click();
    await page.close();
  });
});
