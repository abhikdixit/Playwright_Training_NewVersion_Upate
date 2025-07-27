import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';

const loginData = JSON.parse(readFileSync('./tests/TestData/WebOrder_Login_All_TCs.json', 'utf-8'));
const orders = JSON.parse(readFileSync('./tests/TestData/create_order_All_Scenario.json', 'utf-8'));

let validUsers = []; // Store successful login credentials

test.describe('Step 1: Execute All Login Scenarios and Collect Valid Logins', () => {
  loginData.forEach((record, idx) => {
    const username = record.uname || `user_${idx}`;
    const expectedResult = record.exp_res || `result_${idx}`;

    test(`Login Test [${idx}] - User: ${username}- Expected Result: ${expectedResult}`, async ({ page }) => {
      await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
      await page.getByLabel('Username:').fill(record.uname);
      await page.getByLabel('Password:').fill(record.password);
      await page.getByRole('button', { name: 'Login' }).click();

      

      if (record.exp_res === 'Logout') {
        const logoutLink = page.locator("a[id='ctl00_logout']");
        await expect(logoutLink).toHaveText('Logout');
        validUsers.push({ ...record }); // Store valid login for later use
        await page.getByRole('link', { name: 'Logout' }).click();
        await expect(page).toHaveURL(/.*Login\.aspx/);
      } else {
        const errorMsg = page.locator("span[id='ctl00_MainContent_status']");
        await expect(errorMsg).toHaveText(record.exp_res);
      }
    });
  });
});

test.describe('Step 2: Create Orders for Each Valid Login', () => {
  // Re-run all order scenarios for every valid login
  test(`Run Orders for All Valid Users`, async ({ browser }) => {
    if (validUsers.length === 0) {
      test.skip(true, 'No valid login found to perform order scenarios.');
    }

    for (let i = 0; i < validUsers.length; i++) {
      const user = validUsers[i];
      const page = await browser.newPage();

      // Login with current valid user
      await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
      await page.getByLabel('Username:').fill(user.uname);
      await page.getByLabel('Password:').fill(user.password);
      await page.getByRole('button', { name: 'Login' }).click();

      await expect(page.locator("a[id='ctl00_logout']")).toHaveText('Logout');
      await page.waitForLoadState();

      for (let j = 0; j < orders.length; j++) {
        const data = orders[j];

        await page.getByRole('link', { name: 'Order' }).nth(1).click();
        await expect(page).toHaveURL(/.*Process\.aspx/);

        await page.getByRole('combobox', { name: 'Product:*' }).selectOption(data.Product);
        await page.getByLabel('Quantity:*').fill(data.Quantity);
        await page.getByLabel('Customer name:*').fill(data.Customer);
        await page.getByLabel('Street:*').fill(data.Street);
        await page.getByLabel('City:*').fill(data.City);
        await page.getByLabel('Zip:*').fill(data.Zip);
        await page.getByLabel('Visa').check();
        await page.getByLabel('Card Nr:*').fill(data.Card);
        await page.getByLabel('Expire date (mm/yy):*').fill(data.Expire);
        await page.getByRole('link', { name: 'Process' }).click();

        const expectedMsg = data.Result.trim();
        const msgLocator = expectedMsg === 'New order has been successfully added.'
          ? page.locator("//strong[normalize-space()='New order has been successfully added.']")
          : page.locator("//span[@style='color: red; display: inline;']");

        await expect(msgLocator).toContainText(expectedMsg);
      }

      await page.getByRole('link', { name: 'Logout' }).click();
      await expect(page).toHaveURL(/.*Login\.aspx/);
      await page.close();
    }
  });
});
