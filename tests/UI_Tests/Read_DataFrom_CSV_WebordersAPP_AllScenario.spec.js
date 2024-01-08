//Run "npm install csv" to install the full csv module or run npm install csv-parse 
//if you are only interested by the CSV parser.

const fs = require('fs');
const path = require('path');
const { test, expect,Page } = require('@playwright/test');
const assert = require('assert')
const { parse } = require('csv-parse/sync');

const records = parse(fs.readFileSync(path.join('./tests/TestData', 'WebOrder_Login_All_Scenario.csv')), {
  columns: true,
  skip_empty_lines: true
});
test.describe('WebOrder All Test Scenario', () => {
  let page = Page;
  //Page can be directly used in test not in hooks, in hooks we can use browser and assign new page to page
  test.beforeAll(async ({ browser }) => {
    //const browser = await chromium.launch();
    page = await browser.newPage();

    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  })

  test('WebOrder App', async () => {
    for (const record of records) {
      //console.log(records)
      //console.log(record.uname, record.pass);
      await page.locator('input[name="ctl00\\$MainContent\\$username"]').clear();
      await page.fill('input[name="ctl00\\$MainContent\\$username"]', record.uname);
      await page.locator('input[name="ctl00\\$MainContent\\$password"]').clear();
      // Fill input[name="ctl00\$MainContent\$password"]
      await page.fill('input[name="ctl00\\$MainContent\\$password"]', record.pass);

      // Click text=Login
      await page.click('text=Login');
      //await page.waitForTimeout(2000);
      //await page.waitFor
      //Check condition whether Valid or Invalid
      //const del = await page.$("#ctl00_MainContent_btnDelete");
      //const del = await page.$eval("#ctl00_MainContent_status", el => el.textContent.trim())
      //const del = await page.$eval("h2[normalize-space()='List of All Orders']", el => el.textContent.trim())
      //console.log(del)
      if ('List of All Orders' == record.Exp_Result) {

        await expect(page.locator("div[class='content'] h2")).toContainText(record.Exp_Result)
        //const name = await page.$eval("h2[normalize-space()='List of All Orders']", el => el.textContent.trim())
        //expect(name).toBe('List of All Orders')
        //expect(name).toBe(record.Exp_Result)
        // Click text=Logout
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