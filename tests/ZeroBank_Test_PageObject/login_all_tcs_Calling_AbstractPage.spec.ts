import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';

// Define interface for JSON test data
interface User {
  TestCaseID: string;
  login: string;
  password: string;
}

// Users array
let users: User[] = [];

test.beforeAll(async ({ browser }) => {
  // Create temporary context to read JSON via LoginPage
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new LoginPage(page);

  users = await loginPage.readDataFromJSONFile(
    './tests/ZeroBank_Test_PageObject/TestData/login_tcs.json'
  );

  await context.close();
});

test.describe('Login / Logout Flow @smoke', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }: { page: Page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await homePage.visit();
  });

  test('Execute all login scenarios from JSON', async ({ page }: { page: Page }) => {
    for (const user of users) {
      // Annotate test info with TestCaseID
      test.info().annotations.push({ type: 'case', description: user.TestCaseID });

      await homePage.clickOnSignIn();
      await loginPage.login(user.login, user.password);
      await page.waitForLoadState("networkidle");

      if (user.login === 'username' && user.password === 'password') {
        // ✅ Expect redirect after successful login
        await page.goto("http://zero.webappsecurity.com");
        await page.waitForLoadState("networkidle");

        await homePage.logout();
        await page.waitForLoadState("networkidle");
        await homePage.VerifyURL('http://zero.webappsecurity.com/index.html');
      } else {
        // ❌ Invalid login → assert error
        await loginPage.assertErrorMessage();

        // Navigate back to homepage for next iteration
        await page.goto("http://zero.webappsecurity.com");
        await page.waitForLoadState("networkidle");
      }
    }
  });
});
