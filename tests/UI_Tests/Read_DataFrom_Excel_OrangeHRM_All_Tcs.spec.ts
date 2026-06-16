import { test, expect } from '@playwright/test';
import path from 'path';
import { readFile, utils } from 'xlsx';

// Define Type for Excel Data
type WebOrderData = {
  test_case: string;
  uname: string;
  pass: string;
  Exp_Result: string;
};

// Read Excel File
const filePath = path.join(__dirname, '../TestData/OrangeHRM_Login_All_Test.xlsx');
const workbook = readFile(filePath);
const sheetName = workbook.SheetNames[0];
const records: WebOrderData[] = utils.sheet_to_json(workbook.Sheets[sheetName]);
//const records = utils.sheet_to_json(workbook.Sheets[sheetName]);

test.describe('WebOrder All Test Scenario', () => {

  for (const record of records) {

    test(`WebOrder App - ${record.test_case}`, async ({ page }) => {

    
        await page.goto(
          "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
        );
        await page.getByPlaceholder("Username").fill(record.uname);
        await page.getByPlaceholder("Password").fill(record.pass);
        await page.getByRole("button", { name: "Login" }).click();
        let msg;
        if ("Dashboard" == record.Exp_Result) {
          
          msg = page.locator("//h6[text()='Dashboard']");
          await expect(msg).toHaveText(record.Exp_Result);
          //logout
          await page.locator("//i[@class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']").click();
          await page.getByRole("menuitem", { name: "Logout" }).click();
          await page.waitForLoadState();
    
        }
        else if('Required' == record.Exp_Result)
          {
            msg = page.locator("//span[text()='Required']");
            await expect(msg).toHaveText(record.Exp_Result);
    
          }
         else
          {
          
          msg = await page.getByText('Invalid credentials')
          await expect(msg).toHaveText(record.Exp_Result);
        }
    });

  }

});