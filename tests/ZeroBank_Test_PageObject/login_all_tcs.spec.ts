import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';
import { readFileSync } from 'fs';

// Define interface for JSON data
interface User {
  TestCaseID: string;
  login: string;
  password: string;
}

// Read test data from JSON
const objects = readFileSync(`./tests/ZeroBank_Test_PageObject/TestData/login_tcs.json`, 'utf-8');
const users: User[] = JSON.parse(objects);

test.describe('Login / Logout Flow @smoke', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }: { page: Page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    await homePage.visit();
  });

  users.forEach((user, index) => {
    test(`Login scenario #${index + 1} - ${user.TestCaseID}`, async ({ page }: { page: Page }) => {
      await homePage.clickOnSignIn();
      await loginPage.login(user.login, user.password);
      await page.waitForLoadState("networkidle");

      if (user.login === 'username' && user.password === 'password') {
        // ✅ Valid login
        await page.goto("http://zero.webappsecurity.com");
        await page.waitForLoadState("networkidle");

        await homePage.logout();
        await page.waitForLoadState("networkidle");
        await homePage.VerifyURL('http://zero.webappsecurity.com/index.html');
      } else {
        // ❌ Invalid login → assert error message
        await loginPage.assertErrorMessage();
      }
    });
  });
});
