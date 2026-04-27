import { test, expect } from '@playwright/test';
import * as db from './database';

interface LoginRecord {
  uname: string;
  pass: string;
}

const config = {
  url: 'http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx',
  selectors: {
    username: 'input[name="ctl00$MainContent$username"]',
    password: 'input[name="ctl00$MainContent$password"]',
    loginButton: 'input[type="submit"][value="Login"]',
    logoutLink: 'a:text("Logout")',
    ordersHeading: "div[class='content'] h2",
    errorMessage: "#ctl00_MainContent_status"
  },
  expectedResults: {
    successHeading: 'List of All Orders',
    errorMessage: 'Invalid Login or Password.'
  }
};

test.describe('Database-driven Login Tests', () => {

  let testRecords: LoginRecord[] = [];

  test.beforeAll(async () => {
    testRecords = await db.query<LoginRecord[]>('SELECT * FROM login');
    console.log(`Loaded ${testRecords.length} records`);
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(config.url);
  });

  test('Execute Login Tests from DB', async ({ page }) => {

    for (const data of testRecords) {
      console.log(`Executing for user: ${data.uname}`);

      await page.fill(config.selectors.username, data.uname);
      await page.fill(config.selectors.password, data.pass);
      await page.click(config.selectors.loginButton);

      const successHeading = page.locator(config.selectors.ordersHeading);
      const errorMsg = page.locator(config.selectors.errorMessage);

      if (await successHeading.isVisible()) {
        await expect(successHeading).toContainText(config.expectedResults.successHeading);

        await page.click(config.selectors.logoutLink);
      } else {
        await expect(errorMsg).toContainText(config.expectedResults.errorMessage);
      }
    }
  });

  test.afterAll(async () => {
    await db.close();
  });

});