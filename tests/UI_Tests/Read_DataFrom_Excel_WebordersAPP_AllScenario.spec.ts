//Run "npm install exceljs" to install the exceljs library
import { test, expect, Page } from '@playwright/test';
import ExcelJS from 'exceljs';

// Read Excel file using ExcelJS
async function readExcelFile(filename) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filename);
  const worksheet = workbook.worksheets[0]; // Get first worksheet
  const records = [];
  
  // Get headers from first row
  const firstRow = worksheet.getRow(1);
  const headers = [];
  firstRow.eachCell((cell, colNumber) => {
    headers.push(cell.value);
  });
  
  // Convert rows to JSON objects
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) { // Skip header row
      const record = {};
      row.eachCell((cell, colNumber) => {
        if (headers[colNumber - 1]) {
          record[headers[colNumber - 1]] = cell.value;
        }
      });
      records.push(record);
    }
  });
  
  return records;
}

test.describe('WebOrder All Test Scenario', () => {
  let page = Page;
  //Page can be directly used in test not in hooks, in hooks we can use browser and assign new page to page
  test.beforeAll(async ({ browser }) => {
    //const browser = await chromium.launch();
    page = await browser.newPage();

    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  })

  test('WebOrder App', async () => {
    const records = await readExcelFile('./tests/TestData/WebOrder_TS_All_Scenario.xlsx');
    
    for (const record of records) {
      await page.locator('input[name="ctl00\\$MainContent\\$username"]').clear();
      await page.fill('input[name="ctl00\\$MainContent\\$username"]', record.uname);
      await page.locator('input[name="ctl00\\$MainContent\\$password"]').clear();
      await page.fill('input[name="ctl00\\$MainContent\\$password"]', record.pass);

      await page.click('text=Login');
      if ('List of All Orders' == record.Exp_Result) {

        await expect(page.locator("div[class='content'] h2")).toContainText(record.Exp_Result)
        await page.click('text=Logout');
        await page.waitForLoadState(); // The promise resolves after 'load' event.

      } else if ('Invalid Login or Password.' == record.Exp_Result)
      {
        const name = await page.$eval("#ctl00_MainContent_status", el => el.textContent.trim())
        //expect(name).toBe('Invalid Login or Password.')
        expect(name).toBe(record.Exp_Result)

      }

    }
  })

})