const fs = require('fs');
const { test } = require('@playwright/test');

// Reads the JSON file and saves it  
let objects = fs.readFileSync('./tests/TestData/OrangeHRM.json')
const users = JSON.parse(objects);

for (const record of users) {
  test(`OrangeHRM: ${record.test_case}`, async ({ page }) => {
    console.log(record.name, record.password, record.exp_result);

    await page.goto(record.url);
    await page.getByPlaceholder('Username').click();
    await page.getByPlaceholder('Username').fill(record.name);
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill(record.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForSelector("//h6[text()='Dashboard']")
    //Verify the Expected vs Actual
    //await page.waitForTimeout(5000)
    
    const Dashboard = page.locator("//h6[text()='Dashboard']")
    await expect(Dashboard).toHaveText(record.exp_result)
    //Logout from the application
    await page.locator("//i[@class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']").click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
  });
}
