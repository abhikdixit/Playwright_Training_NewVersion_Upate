// webTablePagination.spec.js
const { test, expect } = require('@playwright/test');
const { searchWebTable } = require('../../helpers/webTableHelper');

test.describe('WebTable Pagination and Price Check', () => {
  const tgtProduct = 'Router';
  const expPrice = '$24.99';

  test('Search for a product and verify price using helper function', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const price = await searchWebTable(
      page,
      '#productTable',
      tgtProduct,
      1, // Product name is in the first column
      4, // Price is in the fourth column
      '#pagination li a[aria-label="Next"]' // Correct selector for the Next button
    );

    expect(price).not.toBeNull();
    console.log(`Found ${tgtProduct} with price: ${price.trim()}`);
    expect(price.trim()).toBe(expPrice);
  });
});