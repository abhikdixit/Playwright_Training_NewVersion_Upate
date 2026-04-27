import { test, expect, Page } from '@playwright/test';

// Define test parameters as a strongly typed array
const testParameters: string[] = ['MyMoney', 'FamilyAlbum', 'ScreenSaver'];

for (const product of testParameters) {
  test(`Parameterize tests in Playwright - ${product}`, async ({ page }) => {
    await login(page);
    await verifyProductPrice(page, product);
  });
}

/**
 * Logs in to the SmartBear WebOrders application.
 * @param page Playwright Page instance
 */
async function login(page: Page): Promise<void> {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  await page.getByLabel('Username:').fill('Tester');
  await page.getByLabel('Password:').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');
}

/**
 * Verifies that the product price in "View all products" matches the default price in "Order" page.
 * @param page Playwright Page instance
 * @param product Product name to validate
 */
async function verifyProductPrice(page: Page, product: string): Promise<void> {
  // Navigate to "View all products"
  await page.getByRole('link', { name: 'View all products' }).click();

  // Extract price for the given product
  const productText = await page
    .locator(`//td[normalize-space()='${product}']/following-sibling::td[1]`)
    .textContent();

  if (!productText) {
    throw new Error(`Product '${product}' not found on 'View all products' page.`);
  }

  const productValue = productText.replace('$', '').trim();
  console.log(`Expected product value for ${product}: ${productValue}`);

  // Go to "Order"
  await page.getByRole('link', { name: 'Order', exact: true }).click();
  await page.getByLabel('Product:*').selectOption(product);

  // Extract default price from the "Order" page
  const newProductValue = await page.locator('#ctl00_MainContent_fmwOrder_txtUnitPrice').inputValue();
  console.log(`Actual product value for ${product}: ${newProductValue}`);

  // Assertion
  expect(newProductValue, `Price mismatch for ${product}`).toBe(productValue);

  console.log(`✅ Execution completed - ${product}: Values matched (${newProductValue})`);
}
