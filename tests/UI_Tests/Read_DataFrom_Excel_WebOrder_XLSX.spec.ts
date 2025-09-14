// tests/weborder-login.spec.js
import { test, expect } from '@playwright/test';
import XLSX from 'xlsx';

function readExcelAsJson(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(sheet);
}

test.describe('WebOrder Excel Data Tests', () => {
  let testData;

  test.beforeAll(async () => {
    // ✅ Read Excel → JSON in one line
    testData = readExcelAsJson('./tests/TestData/WebOrder_Login_Data.xlsx');
  });

  test('WebOrder Login Tests', async ({ page }) => {
    for (const record of testData) {
      console.log(`Testing login with: ${record.uname} / ${record.pass}`);

      await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

      // ✅ Updated locators
      await page.getByLabel('Username:').fill(record.uname);
      await page.getByLabel('Password:').fill(record.pass);
      await page.getByRole('button', { name: 'Login' }).click();

      if (record.Exp_Result === 'List of All Orders') {
        await expect(page.getByRole('heading', { name: 'List of All Orders' })).toBeVisible();
        await page.getByRole('link', { name: 'Logout' }).click();
        await expect(page).toHaveURL(/Login\.aspx/);
      } else if (record.Exp_Result === 'Invalid Login or Password.') {
        await expect(page.getByText('Invalid Login or Password.')).toBeVisible();
      }
    }
  });
});
