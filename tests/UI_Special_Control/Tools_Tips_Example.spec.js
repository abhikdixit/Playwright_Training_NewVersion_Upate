import { test, expect } from '@playwright/test';

test('Tooltip appears on Shopping cart hover', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com');

  // Hover over the shopping cart link
  await page.hover('a[href="/cart"]');

  // Wait for the tooltip to become visible
  const tooltip = page.locator('#flyout-cart');

  // Assert visibility and text
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText(/You have no items in your shopping cart/i);
});
