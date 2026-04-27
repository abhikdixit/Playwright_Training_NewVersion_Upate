// import fs from 'fs';
// import { test, expect } from '@playwright/test';

// // Reads the JSON file and saves it  
// let objects = fs.readFileSync('./tests/TestData/OrangeHRM.json')
// const users = JSON.parse(objects.toString());

// for (const record of users) {
//   test(`OrangeHRM Login: ${record.test_case}`, async ({ page }) => {
//     console.log(record.name, record.password, record.exp_result);

//     await page.goto(record.url);
//     await page.getByPlaceholder('Username').fill(record.name);
//     await page.getByPlaceholder('Password').fill(record.password);
//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.waitForSelector("//h6[text()='Dashboard']")
//     //Verify the Expected vs Actual
//     //await page.waitForTimeout(5000)
    
//     const Dashboard = page.locator("//h6[text()='Dashboard']")
//     await expect(Dashboard).toHaveText(record.exp_result)
//     //Logout from the application
//     await page.locator("//i[@class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']").click();
//     await page.getByRole('menuitem', { name: 'Logout' }).click();
//   });
// }

import fs from 'fs';
import path from 'path';
import { test, expect, Page } from '@playwright/test';

// Define Type for JSON Data
type LoginData = {
  test_case: string;
  url: string;
  name: string;
  password: string;
  exp_result: string;
};

// Read JSON File
const filePath = path.join(__dirname, '../TestData/OrangeHRM.json');
const fileContent = fs.readFileSync(filePath, 'utf-8');
const users: LoginData[] = JSON.parse(fileContent);

// Loop through test data
for (const record of users) {

  test(`OrangeHRM Login: ${record.test_case}`, async ({ page }: { page: Page }) => {

    console.log(record.name, record.password, record.exp_result);

    await page.goto(record.url);

    await page.getByPlaceholder('Username').fill(record.name);
    await page.getByPlaceholder('Password').fill(record.password);
    await page.getByRole('button', { name: 'Login' }).click();

    // Validation (Handle both success & failure cases)
    if (record.exp_result === 'Dashboard') {
      const dashboard = page.locator("//h6[text()='Dashboard']");
      await expect(dashboard).toBeVisible();

      // Logout only if login successful
      await page.locator("//i[contains(@class,'oxd-userdropdown-icon')]").click();
      await page.getByRole('menuitem', { name: 'Logout' }).click();

    } else {
      const errorMsg = page.locator('.oxd-alert-content-text');
      await expect(errorMsg).toBeVisible();
    }

  });

}