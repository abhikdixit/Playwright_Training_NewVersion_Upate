const { test, expect } = require('@playwright/test');

test('Navigate through pages and select checkboxes', async ({ page }) => {
  // Navigate to the page with the table
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Find the table
  const table = page.locator('#productTable');

  // Get the pagination links
  const pagination = page.locator('#pagination li a');
  const pagesCount = await pagination.count();

  // Loop through each page
  for (let i = 0; i < pagesCount; i++) {
    // Get all checkboxes on the current page
    const checkboxes = table.locator('tbody tr td input[type="checkbox"]');
    const checkboxesCount = await checkboxes.count();

    // Click each checkbox
    for (let j = 0; j < checkboxesCount; j++) {
      await checkboxes.nth(j).check();
    }

    // Go to the next page if it's not the last one
    if (i < pagesCount - 1) {
      await pagination.nth(i + 1).click();
    }
  }
});