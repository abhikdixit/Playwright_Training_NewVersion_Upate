//Run "npm install exceljs" to install the exceljs library
import { test, expect } from '@playwright/test';
import ExcelJS from 'exceljs';

// Read Excel file using ExcelJS
async function readExcelFile(filename: string): Promise<Record<string, any>[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filename);
  const worksheet = workbook.worksheets[0]; // Get first worksheet
  const records: Record<string, any>[] = [];

  // Get headers from first row
  const firstRow = worksheet.getRow(1);
  const headers: string[] = [];
  firstRow.eachCell((cell: any, colNumber: number) => {
    headers.push(String(cell.value));
  });

  // Convert rows to JSON objects
  worksheet.eachRow((row: any, rowNumber: number) => {
    if (rowNumber > 1) { // Skip header row
      const record: Record<string, any> = {};
      row.eachCell((cell: any, colNumber: number) => {
        if (headers[colNumber - 1]) {
          record[headers[colNumber - 1]] = cell.value;
        }
      });
      records.push(record);
    }
  });

  return records;
}

// Test function that reads Excel data
test.describe('WebOrder Excel Data Tests', () => {
  test('WebOrder Login Tests', async ({ page }) => {
    const records = await readExcelFile('./tests/TestData/WebOrder_Login_Data.xlsx');
    
    for (const record of records) {
      console.log(records);
      console.log(record.uname, record.pass);
       
      await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

      // Fill input[name="ctl00\$MainContent\$username"]
      await page.fill('input[name="ctl00\\$MainContent\\$username"]', record.uname);

      // Fill input[name="ctl00\$MainContent\$password"]
      await page.fill('input[name="ctl00\\$MainContent\\$password"]', record.pass);

      // Click text=Login
      await page.click('text=Login');
      
      await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');

       // Click text=Logout
      await page.click('text=Logout');
      await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx');
    }
  });
});
