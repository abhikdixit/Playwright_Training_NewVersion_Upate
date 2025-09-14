import { test, expect } from '@playwright/test';

test('Shopping Cart - Add and Remove Product @sanity', async ({ page }) => {
    // Step 1: Navigate to Demo Web Shop
    await page.goto('https://demowebshop.tricentis.com/');

    // Step 2: Click on "Computers"
    await page.click('a:has-text("Computers")');
    //await page.pause();
    await page.getByRole('link', { name: 'Picture for category Notebooks' }).click();

    // Step 3: Click on "Notebooks"
    //await page.click('a:has-text("Notebooks")');

    // Step 4: Add "14.1-inch Laptop" to the cart
    await page.click('a:has-text("14.1-inch Laptop")'); // Click on product link
    await page.click("//input[@value='Add to cart']"); // Click "Add to cart"
    await page.waitForTimeout(5000); // Wait for cart to update
    // Step 5: Navigate to the cart
    await page.goto('https://demowebshop.tricentis.com/cart');

    // Step 6: Verify product is in cart with correct quantity and price
    const productName = await page.locator('.product-name').textContent();
    expect(productName).toContain('14.1-inch Laptop');

    const quantity = await page.locator('.qty-input').inputValue();
    expect(quantity).toBe('1');

    // Step 7: Remove the product
    await page.check('input[name="removefromcart"]'); // Select remove checkbox
    await page.click('button[name="updatecart"]'); // Click "Update cart"

    // Step 8: Verify cart is empty
    const emptyCartMessage = await page.locator('.order-summary-content').textContent();
    expect(emptyCartMessage).toContain('Your Shopping Cart is empty!');

    console.log('✅ Test Passed: Product added and removed successfully!');
});
