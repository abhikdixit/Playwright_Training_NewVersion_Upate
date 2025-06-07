// webTablePagination.spec.js
const { test, expect } = require('@playwright/test');

test.describe('WebTable Pagination and Salary Check', () => {
  const tgtFName = 'Cara';
  const expSalary = '$145,600';

  test('Search for a name and verify salary', async ({ page }) => {
    await page.goto('https://datatables.net/examples/data_sources/server_side');
    await page.waitForSelector('#example');

    let found = false;

    // Define a function to check rows on the current page
    async function checkCurrentPage() {
      const rows = await page.$$('#example tbody tr');

      for (const row of rows) {
        const nameCell = await row.$('td:nth-child(1)');
        const nameText = await nameCell.textContent();

        if (nameText?.trim() === tgtFName) {
          const salaryCell = await row.$('td:nth-child(6)');
          const salaryText = await salaryCell.textContent();

          console.log(`✅ Found ${tgtFName} with salary: ${salaryText.trim()}`);
          expect(salaryText.trim()).toBe(expSalary);
          return true;
        }
      }

      return false;
    }

    // Check first page before entering loop
    found = await checkCurrentPage();

    // Only paginate if not found on first page
    while (!found) {
      const nextButton = page.locator('button[aria-label="Next"]');
      const isDisabled = await nextButton.getAttribute('class');

      if (isDisabled && isDisabled.includes('disabled')) break; // Reached last page

      await nextButton.click();
      await page.waitForTimeout(1000);

      found = await checkCurrentPage();
    }

    expect(found).toBe(true); // Final assertion
  });
});
