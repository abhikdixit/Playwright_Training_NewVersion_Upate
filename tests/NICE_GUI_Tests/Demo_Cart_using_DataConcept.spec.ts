import { test, expect } from '@playwright/test';
import * as data from '../TestData/cartData.json';

test('Shopping Cart - Add and Remove Product', async ({ page }) => {
    await page.goto(data.url);
    await page.click('a:has-text("Computers")');
    await page.getByRole('link', { name: data.category }).click();
    await page.click(`a:has-text("${data.productName}")`);
    await page.waitForSelector('button:has-text("Add to cart")');
    await page.click('button:has-text("Add to cart")');
    await page.goto(data.cartUrl);
    const productName = await page.locator('.product-name a').textContent();
    expect(productName).toContain(data.productName);
    const quantity = await page.locator('.qty-input').inputValue();
    expect(quantity).toBe(data.quantity);
    await page.check('input[name="removefromcart"]');
    await page.click('button[name="updatecart"]');
    const emptyCartMessage = await page.locator('.order-summary-content').textContent();
    expect(emptyCartMessage).toContain(data.emptyCartMessage);
    console.log('✅ Test Passed: Product added and removed successfully!');
});
