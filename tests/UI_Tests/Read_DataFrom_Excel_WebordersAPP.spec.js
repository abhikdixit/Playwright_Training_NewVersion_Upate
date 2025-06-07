//Run "npm install xlsx" to install the xlsx file
const { test, expect } = require('@playwright/test');
var XLSX = require('xlsx')

var workbook = XLSX.readFile('./tests/TestData/WebOrder_Login_Data.xlsx');
var sheet_name_list = workbook.SheetNames;
var records = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

for (const record of records) {
  test(`Weborder: ${record.test_case}`, async ({ page }) => {
    console.log(records)
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

  });
}
