// webTablePagination.spec.js
const { test, expect } = require('@playwright/test');
const { searchWebTable } = require('../../helpers/webTableHelper');

test.describe('WebTable Pagination and Salary Check', () => {
  const tgtFName = 'Airi';
  const expSalary = '$162,700';

  // const tgtFName = 'Paul';
  // const expSalary = '$725,000';

  test('Search for a name and verify salary using helper function', async ({ page }) => {
    await page.goto('https://datatables.net/examples/data_sources/server_side');

    const salary = await searchWebTable(
      page,
      '#example',
      tgtFName,
      1,
      6,
      'button[aria-label="Next"]',
      '#example_processing'
    );

    if (salary) {
      console.log(`Found ${tgtFName} with salary: ${salary.trim()}`);
      expect(salary.trim()).toBe(expSalary);
    } else {
      throw new Error(`Salary for ${tgtFName} not found in the web table.`);
    }
  });
});