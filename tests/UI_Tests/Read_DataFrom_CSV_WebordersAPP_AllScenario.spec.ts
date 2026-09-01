import { readFileSync } from 'fs';
import { test, expect } from '@playwright/test';
import { parse } from 'csv-parse/sync';

// Read CSV file and convert to JSON
const records = parse(
  readFileSync('./tests/TestData/WebOrder_Login_All_Scenario.csv'),
  {
    columns: true,
    skip_empty_lines: true,
  }
);
//We use an interface in TypeScript to enforce type safety and autocomplete for data
//  coming from external sources like CSV files.

interface LoginTestData {
  test_case: string;
  uname: string;
  pass: string;
  Exp_Result: string;
}

//You can use a type instead of an interface. It works almost identically for this scenario.
/*
type LoginTestData = {
  test_case: string;
  uname: string;
  pass: string;
  Exp_Result: string;
} */

// Convert records into typed array
const testData: LoginTestData[] = records;

test.describe('WebOrder All Test Scenarios', () => {

  // Using for loop OUTSIDE test
  for (const data of testData) {

    test(`Test Case ID: ${data.test_case} | Verify Login with user: ${data.uname}`, async ({ page }) => {

      // Navigate to application
      await page.goto(
        'http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx'
      );

      // Enter Username
      await page
        .locator('input[name="ctl00\\$MainContent\\$username"]')
        .fill(data.uname);

      // Enter Password
      await page
        .locator('input[name="ctl00\\$MainContent\\$password"]')
        .fill(data.pass);

      // Click Login button
      await page.locator('text=Login').click();

      // Validation
      if (data.Exp_Result === 'List of All Orders') {

        await expect(
          page.locator("div[class='content'] h2")
        ).toContainText(data.Exp_Result);

        console.log(`✅ ${data.test_case} Passed`);

        // Logout
        await page.locator('text=Logout').click();

      } else {

        await expect(
          page.locator('#ctl00_MainContent_status')
        ).toHaveText(data.Exp_Result);

        console.log(`✅ ${data.test_case} Passed`);

      }
    });
  }
});