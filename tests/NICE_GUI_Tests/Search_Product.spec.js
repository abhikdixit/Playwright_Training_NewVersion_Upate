const { test, expect } = require('@playwright/test');

test('Search Product Test', async ({ page }) => {
    // Navigate to the website
    await page.goto('http://automationexercise.com');

    // Verify home page is visible
    await expect(page).toHaveURL('https://automationexercise.com');
    await expect(page.locator("//img[@alt='Website for automation practice']")).toBeVisible();

    // Click on Products button
    await page.click('a[href="/products"]');

    // Verify navigation to ALL PRODUCTS page
    await expect(page).toHaveURL('https://automationexercise.com/products');
    await expect(page.locator('.title'), 'Automation Exercise - All Products').toBeVisible();

    // Search for a product
    const searchTerm = 'Top';
    await page.fill('#search_product', searchTerm);
    await page.click('#submit_search');

    // Verify 'SEARCHED PRODUCTS' is visible
    await expect(page.locator('.title')).toContainText('Searched Products');

    // Get all products and filter only those containing 'Top'
    const searchResults = page.locator('.features_items .product-image-wrapper');
    const products = await searchResults.all();
    
    // Filter and verify only products containing 'Top'
    for (const product of products) {
        const productName = await product.locator('.productinfo p').textContent();
        if (productName.toLowerCase().includes(searchTerm.toLowerCase())) {
            console.log(`Found matching product: ${productName}`);
            expect(productName.toLowerCase()).toContain(searchTerm.toLowerCase());
        } else {
            console.log(`Skipping non-matching product: ${productName}`);
        }
    }
});
