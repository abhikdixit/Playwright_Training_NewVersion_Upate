const { test, expect } = require('@playwright/test');

test.describe('Table Sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/tables');
  });

  test('should verify table data is sorted ascending by last name', async ({ page }) => {
    // Scope to specific table (Table 1)
    await page.pause(); // Pause to observe the result
    const table = page.locator('#table1');
    
    // Click on Last Name header in specific table
    await table.locator('th:has-text("Last Name")').click();
    
    // Extract last names from first column
    const lastNameColumn = await table.locator('tbody tr td:first-child')
      .allTextContents();

    // Create sorted version for comparison
    const sortedLastNames = [...lastNameColumn]
      .sort((a, b) => a.localeCompare(b));

    // Verify sorting
    expect(lastNameColumn).toEqual(sortedLastNames);
    
  });
  
});

/*Test Implementation:

Locates a specific table using ID 'table1'
Includes a debug pause() statement for observation during test execution
Clicks the "Last Name" column header to trigger sorting
Extracts all last names from the first column of the table
Verification Logic:

Creates a sorted copy of the extracted last names using JavaScript's sort method with localeCompare
Uses expect() to verify that the table's current order matches the expected sorted order*/

/*Meaning of [...lastNameColumn]

It creates a new array by spreading (unpacking) the values of lastNameColumn into it.
🔹 Example:

const lastNameColumn = ['Smith', 'Johnson', 'Lee'];
const newArray = [...lastNameColumn];

console.log(newArray); // ['Smith', 'Johnson', 'Lee']*/