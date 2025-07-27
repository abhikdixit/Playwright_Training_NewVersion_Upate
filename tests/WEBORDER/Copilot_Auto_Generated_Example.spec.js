// create test for search store auto suggestion and select Simple Computer from given search for given https://demowebshop.tricentis.com/
import { test, expect } from '@playwright/test';

test('search store auto suggestion and select Simple Computer', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
    // Focus and type in the search box to trigger auto-suggestions
    await page.fill('input[name="q"]', 'simple comp');
    // Wait for the auto-suggestion dropdown to appear
    const suggestion = page.locator('.ui-autocomplete li:has-text("Simple Computer")');
    await expect(suggestion).toBeVisible();
    // Click the "Simple Computer" suggestion
    await suggestion.click();
    // Verify that the product page for "Simple Computer" is loaded
    await expect(page.locator('h1')).toHaveText('Simple Computer');
});