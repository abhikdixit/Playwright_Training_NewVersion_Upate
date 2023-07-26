//Run "npm install csv" to install the full csv module or run npm install csv-parse 
//if you are only interested by the CSV parser.

const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const assert = require('assert')
const { parse } = require('csv-parse/sync');

const records = parse(fs.readFileSync(path.join('./tests/TestData', 'Weborders.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const record of records) {
  test(`Weborder: ${record.test_case}`, async ({ page }) => {
    console.log(record.uname, record.upass, record.exp_result);
     
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

  // Fill input[name="ctl00\$MainContent\$username"]
  await page.fill('input[name="ctl00\\$MainContent\\$username"]', record.uname);

  // Fill input[name="ctl00\$MainContent\$password"]
  await page.fill('input[name="ctl00\\$MainContent\\$password"]', record.upass);

  // Click text=Login
  await page.click('text=Login');
  await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');

   // Click text=Logout
  await page.click('text=Logout');
  await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx');

  });
}
