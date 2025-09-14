// tests/weborder-login.spec.js
import { test, expect } from '@playwright/test';
const { excelToJson } = require('../helpers/excelToJson');

test.describe('WebOrder Excel Data Tests', () => {
  let testData: any[];

  test.beforeAll(async () => {
    // Load Excel as JSON once before all tests
    testData = await excelToJson('./tests/TestData/WebOrder_Login_Data.xlsx');
  });

  test('WebOrder Login Tests', async ({ page }) => {
  for (const record of testData) {
      console.log(`Testing login with: ${record.uname} / ${record.pass}`);

      await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

      await page.fill('input[name="ctl00\\$MainContent\\$username"]', record.uname);
      await page.fill('input[name="ctl00\\$MainContent\\$password"]', record.pass);
      await page.click('text=Login');

      if (record.Exp_Result === 'List of All Orders') {
        // Successful login
        await expect(page).toHaveURL(/.*WebOrders\/Default\.aspx/);
        await page.click('text=Logout');
        await expect(page).toHaveURL(/.*WebOrders\/Login\.aspx.*/);
      } else if (record.Exp_Result === 'Invalid Login or Password.') {
        // Invalid login message
  const msg = await page.locator('#ctl00_MainContent_status').textContent();
  expect(msg?.trim()).toBe('Invalid Login or Password.');
      }
    }
  });
});
