const fs = require('fs');
const { test, expect } = require('@playwright/test');

// Reads the JSON file and saves it  
let objects = fs.readFileSync('./tests/TestData/WebOrder_Login_All_TCs.json')
const users = JSON.parse(objects);

test('Web Login: @sanity', async ({ page }) => {

  for (const record of users) 
  {
    //console.log(record.name, record.password, record.exp_result);
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
    await page.getByLabel('Username:').click();
    await page.getByLabel('Username:').fill(record.uname);
    await page.getByLabel('Password:').click();
    await page.getByLabel('Password:').fill(record.password);
    await page.getByRole('button', { name: 'Login' }).click();

    if ('Logout' == record.exp_res) {

      await expect(page.locator("a[id='ctl00_logout']")).toContainText(record.exp_res)
      await page.click('text=Logout');
      await page.waitForLoadState(); // The promise resolves after 'load' event.

    } else if ('Invalid Login or Password.' == record.exp_res)
    {
      //const name = await page.$eval("#ctl00_MainContent_status", el => el.textContent.trim())
      //expect(name).toBe('Invalid Login or Password.')
      //expect(name).toBe(record.exp_res)
      await expect(page.locator("span[id='ctl00_MainContent_status']")).toContainText(record.exp_res)

    }

  }
});

