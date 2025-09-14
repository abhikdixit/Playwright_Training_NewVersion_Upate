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

test.describe('Nopcom All Test Scenario', () => {
  let page = Page;
  // Page can be directly used in test, not in hooks. In hooks we can use browser and assign new page to page
  test.beforeAll(async ({ browser }) => {
    // const browser = await chromium.launch();
    page = await browser.newPage();
    await page.route('**/*', (route, request) => {
      // Block known bot-detection scripts
      if (request.url().includes('cloudflare') || request.url().includes('challenge')) {
        route.abort();
      } else {
        route.continue();
      }
    });
    await page.goto('https://admin-demo.nopcommerce.com/login');
  });

  test('Nopcomm App', async () => {
    const records = await readExcelFile('./tests/TestData/Nopcomm_TS_All_Scenario.xlsx');
    
    for (const record of records) {
      // console.log(records)
      // console.log(record.uname, record.pass);
      // await page.goto('https://admin-demo.nopcommerce.com/login');
      await page.getByLabel('Email:').clear();
      await page.getByLabel('Email:').fill(record.uname);
      await page.getByLabel('Password:').clear();
      await page.getByLabel('Password:').fill(record.pass);
      await page.getByRole('button', { name: 'Log in' }).click();

      if ('Logout' == record.Exp_Result) {
        await expect(page.getByRole('link', { name: 'Logout' })).toContainText(record.Exp_Result);
        await page.getByRole('link', { name: 'Logout' }).click();
        await page.waitForLoadState(); // The promise resolves after 'load' event.
      } else if ('Login was unsuccessful. Please correct the errors and try again.' == record.Exp_Result) {
        // const errormsg = await page.locator("//div[text()='Login was unsuccessful. Please correct the errors and try again.']")
        // expect(name).toBe('Invalid Login or Password.')
        const name = await page.$eval("//div[@class='message-error validation-summary-errors']", el => el.textContent.trim());
        expect(name).toBe(record.Exp_Result);
      }
    }
  });
});