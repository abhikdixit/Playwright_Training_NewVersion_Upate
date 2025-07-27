//Run "npm install xlsx" to install the xlsx file

const { test, expect, Page } = require('@playwright/test');
var XLSX = require('xlsx')

var workbook = XLSX.readFile('./tests/TestData/Nopcomm_TS_All_Scenario.xlsx');
var sheet_name_list = workbook.SheetNames;
var records = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

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