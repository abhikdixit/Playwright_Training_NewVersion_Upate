const { test, expect } = require('@playwright/test');

test.describe('Table Sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/tables');
  });

  test('should verify table data is sorted ascending by name', async ({ page }) => {
    // Click on the column header to sort by name
    await page.click("span[class='last-name']");
    
    // Extract the table data after sorting
    const tableData = await page.$$eval('#table-id tbody tr', (rows) => {
      return rows.map(row => {
        const cells = row.querySelectorAll('td');
        return Array.from(cells).map(cell => cell.textContent);
      });
    });

    // Verify that the data is sorted correctly
    const sortedData = [...tableData].sort((a, b) =>
a[0].localeCompare(b[0]));
    expect(tableData).toEqual(sortedData);
  });
});