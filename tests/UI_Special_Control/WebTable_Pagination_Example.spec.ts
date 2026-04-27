import { test, expect, Page } from '@playwright/test';

test.describe('WebTable Pagination - Name and Salary Check', () => {
  // const tgtFName = 'Dixit';
  // const expSalary = '$163,500';

  const tgtFName = 'Paul';
  const expSalary = '$725,000';

  // const tgtFName = 'Bruno';
  // const expSalary = '$163,500';

  async function waitForTableData(page: Page) {
    // Wait until the processing indicator disappears
    try {
      await page.waitForSelector('#example_processing', { state: 'visible', timeout: 3000 });
    } catch (e) {
      // do nothing – spinner may be too fast to show
    }
    await page.waitForSelector('#example_processing', { state: 'hidden' });
  }

  test('Search for a name and verify salary', async ({ page }) => {
    //test.setTimeout(60000); // Set timeout to 60 seconds for this test
    await page.goto('https://datatables.net/examples/data_sources/server_side');

    let found = false;

    while (true) {
      await waitForTableData(page); // wait for data to fully load

      const rows = await page.$$('#example tbody tr');

      for (const row of rows) {
        const nameCell = await row.$('td:nth-child(1)');
        const nameText = await nameCell?.textContent();
        const name = nameText?.trim();

        if (name === tgtFName) {
          const salaryCell = await row.$('td:nth-child(6)');
          const salaryText = await salaryCell?.textContent(); //safe, returns undefined //Avoids that crash.
          const actualSalary = salaryText?.trim();

          console.log(`✅ Found ${tgtFName} with salary: ${actualSalary}`);
          expect(actualSalary).toBe(expSalary);
          found = true;
          break;
        }
      }

      if (found) break;

      // Check if the "Next" button is disabled
      const nextButton = page.locator('button[aria-label="Next"]');
      const isDisabled = await nextButton.getAttribute('class');
      if (isDisabled && isDisabled.includes('disabled')) {
        break; // no more pages
      }

      await nextButton.click();
    }

    // Final assertion
    expect(found, `Could not find "${tgtFName}" with expected salary: ${expSalary}`).toBe(true);
  });
});
