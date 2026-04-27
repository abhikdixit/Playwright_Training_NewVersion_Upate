import fs from 'fs';
import path from 'path';
import { test, expect, Page } from '@playwright/test';
import { parse } from 'csv-parse/sync';

// Define Type for CSV Data
type LoginData = {
  test_case: string;
  uname: string;
  upass: string;
  exp_result: string;
};

// Read CSV File
const filePath = path.join(__dirname, '../TestData/OrangeHRM_Login.csv');

const records: LoginData[] = parse(fs.readFileSync(filePath), {
  columns: true,
  skip_empty_lines: true
});

for (const record of records) {

  test(`OrangeHRM Login: ${record.test_case}`, async ({ page }: { page: Page }) => {

    console.log(record.uname, record.upass, record.exp_result);

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await page.getByPlaceholder('Username').fill(record.uname);
    await page.getByPlaceholder('Password').fill(record.upass);
    await page.getByRole('button', { name: 'Login' }).click();

    // Validation
    const dashboard = page.locator("//h6[text()='Dashboard']");
    await expect(dashboard).toHaveText(record.exp_result);

    // Logout
    await page.locator("//i[contains(@class,'oxd-userdropdown-icon')]").click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
  });

}