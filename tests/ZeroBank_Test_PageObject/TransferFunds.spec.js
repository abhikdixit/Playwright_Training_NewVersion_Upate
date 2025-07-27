const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../page-objects/LoginPage");
const { HomePage } = require("../../page-objects/HomePage");
const { Navbar } = require("../../page-objects/components/Navbar");
const { TransferFundPage } = require("../../page-objects/TransferFundPage");
const transferFunds = require("../ZeroBank_Test_PageObject/TestData/transferFund.json");

let page;
let context;
let homePage;
let loginPage;
let navbar;
let transferFundPage;

// This runs once before all the tests
test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  navbar = new Navbar(page);
  transferFundPage = new TransferFundPage(page);

  await homePage.visit();
  await homePage.clickOnSignIn();
  await loginPage.login("username", "password"); // Replace with real values or env vars
  await page.waitForLoadState("networkidle");

  // Bypass SSL issue or go directly to transfer page
  await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html");
  await page.waitForLoadState("networkidle");
});

test.afterAll(async () => {
  await context.close();
});

test.describe("Transfer Funds and Make Payment", () => {
  for (const funds of transferFunds) {
    test(`Transfer Funds - ${funds.TC} | From: ${funds.fromAccount} To: ${funds.toAccount}`, async () => {
      try {
        console.log(`🚀 Running ${funds.TC}`);
        await navbar.clickOnTab("Transfer Funds");

        await transferFundPage.makePayment(
          funds.fromAccount,
          funds.toAccount,
          funds.amount,
          funds.description
        );

        if (!funds.amount) {
          await transferFundPage.assertSamePage();
        } else {
          await transferFundPage.verifyAndSubmit();
          await transferFundPage.assertSuccessMessage();
        }

        console.log(`✅ ${funds.TC} passed`);
      } catch (error) {
        console.error(`❌ ${funds.TC} failed`, error);
        await page.screenshot({ path: `error-${funds.TC}.png`, fullPage: true });
        throw error;
      }
    });
  }
});
