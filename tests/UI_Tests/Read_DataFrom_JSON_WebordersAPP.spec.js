const fs = require('fs');
const { test, expect } = require('@playwright/test');
  
		// Reads the JSON file and saves it  
		let objects = fs.readFileSync('./tests/TestData/Weborders.json')
		const users = JSON.parse(objects);

for (const record of users) {
  test(`Weborder: ${record.test_case}`, async ({ page }) => {
    console.log(record.name, record.password);
     
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  //await page.goto('/');

  // Fill input[name="ctl00\$MainContent\$username"]
  await page.fill('input[name="ctl00\\$MainContent\\$username"]', record.name);

  // Fill input[name="ctl00\$MainContent\$password"]
  await page.fill('input[name="ctl00\\$MainContent\\$password"]', record.password);
    
  // Click text=Login
  await page.click('text=Login');
  await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');

   // Click text=Logout
  await page.click('text=Logout');
  await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx');

  });
}
