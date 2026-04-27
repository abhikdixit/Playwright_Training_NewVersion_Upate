import { test, expect } from '@playwright/test';
import * as db from './database';

// Define proper type
interface LoginRecord {
  uname: string;
  pass: string;
}

const sql = "SELECT * FROM login";

test('Database testing in Playwright', async ({ page }) => {

  // Correct typing
  const rows = await db.query<LoginRecord[]>(sql);

  for (const row of rows) {

    await test.step(`Login with ${row.uname}`, async () => {

      await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

      await page.fill('input[name="ctl00\\$MainContent\\$username"]', row.uname);
      await page.fill('input[name="ctl00\\$MainContent\\$password"]', row.pass);
      await page.click('input[type="submit"][value="Login"]');

      const successUrl = 'default.aspx';
      const currentUrl = page.url();

      // Handle both valid & invalid cases
      if (currentUrl.includes(successUrl)) {

        await expect(page).toHaveURL(/default\.aspx/);

        await page.click('text=Logout');

        await expect(page).toHaveURL(/Login\.aspx/);

      } else {

        const errorMsg = page.locator('#ctl00_MainContent_status');
        await expect(errorMsg).toContainText('Invalid Login or Password.');
      }

    });

  }

});

// Close DB once after all tests
test.afterAll(async () => {
  await db.close();
});