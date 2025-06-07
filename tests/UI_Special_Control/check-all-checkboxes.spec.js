// @ts-check
const { test, expect } = require('@playwright/test');

test('Check all checkboxes across paginated web table', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Wait for the table to be visible
  await page.waitForSelector('#productTable');

  // Helper function to check all checkboxes on the current page
  const checkAllCheckboxes = async () => {
    const checkboxes = await page.$$('#productTable input[type="checkbox"]');
    for (const checkbox of checkboxes) {
      if (!(await checkbox.isChecked())) {
        await checkbox.check();
      }
    }
  };

  // Loop through pagination and check checkboxes
  while (true) {
    await checkAllCheckboxes();

    const nextButton = await page.$('a:has-text("Next")');

    if (nextButton) {
      const classAttr = await nextButton.getAttribute('class');
      if (classAttr && classAttr.includes('paginate_button_disabled')) {
        break; // Reached the last page
      }

      await nextButton.click();
      // Wait for pagination to update
      await page.waitForTimeout(1000);
    } else {
      break; // No next button found
    }
  }

  // Final verification on the last page
  const allCheckboxes = await page.$$('#productTable input[type="checkbox"]');
  for (const checkbox of allCheckboxes) {
    expect(await checkbox.isChecked()).toBe(true);
  }

  console.log('✅ All checkboxes across all pages checked successfully.');
});
