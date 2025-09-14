import { test, expect, type Page } from '@playwright/test';
import { searchWebTable } from '../../helpers/webTableHelper';
/*Every TestCase must have a name (string) and an expectedSalary (string).
If you forget one or mistype it (expectedSalry instead of expectedSalary), the compiler 
catches it before runtime.

The interface makes your test code safer, clearer, and more maintainable.
Without it, you’re just relying on runtime checks and manual discipline

*/


interface TestCase {
  name: string;
  expectedSalary: string;
}

test.describe('WebTable Pagination and Salary Check', () => {
  // Test data
  const testCases: TestCase[] = [
    // {
    //   // name: 'Airi',
    //   // expectedSalary: '$162,700'
    // }
    // Add more test cases as needed:
    { name: 'Paul', expectedSalary: '$725,000' }
  ];

  // Test configuration
  const config = {
    url: 'https://datatables.net/examples/data_sources/server_side',
    selectors: {
      table: '#example',
      nextButton: 'button[aria-label="Next"]',
      loadingIndicator: '#example_processing'
    },
    columns: {
      nameColumn: 1,
      salaryColumn: 6
    }
  };

  for (const testCase of testCases) {
    test(`Search for ${testCase.name} and verify salary`, async ({ page }) => {
      try {
        // Navigate to the page
        await page.goto(config.url, { 
          waitUntil: 'networkidle',
          timeout: 30000 
        });

        // Wait for table to be visible
        await page.locator(config.selectors.table).waitFor({ 
          state: 'visible',
          timeout: 10000
        });

        // Search for the salary
        const salary = await searchWebTable(
          page,
          config.selectors.table,
          testCase.name,
          config.columns.nameColumn,
          config.columns.salaryColumn,
          config.selectors.nextButton,
          config.selectors.loadingIndicator
        );

        // Verify the result
        if (!salary) {
          throw new Error(`Salary for ${testCase.name} not found in the web table.`);
        }

        const trimmedSalary = salary.trim();
        
        // Log the result (can be removed in production)
        console.log(`Found ${testCase.name} with salary: ${trimmedSalary}`);
        
        // Assert the salary matches expected value
        expect(trimmedSalary, `Salary for ${testCase.name} does not match expected value`)
          .toBe(testCase.expectedSalary);

      } catch (error) {
        console.error(`Test failed for ${testCase.name}:`, error);
        throw error;
      }
    });
  }

  test.afterEach(async ({ page }) => {
    // Cleanup or additional verifications can be added here
    await page.close();
  });
});