import { test, expect, Page, BrowserContext } from '@playwright/test';
import { AbstractPage } from '../../page-objects/AbstractPage';
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';
import { Navbar } from '../../page-objects/components/Navbar';
import { PurchaseForeignCurrencyCash } from '../../page-objects/PurchaseForeignCurrency';
import { PayBillsPage } from '../../page-objects/PayBillsPage';

let users: any[];

test.describe('Transfer Funds and Make Payment', () => {
  let page: Page;
  let context: BrowserContext;
  let homePage: HomePage;
  let loginPage: LoginPage;
  let navbar: Navbar;
  let purchaseCurrency: PurchaseForeignCurrencyCash;
  let PayBills: PayBillsPage;
  let abstractPage: AbstractPage;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    // Initialize page objects
    abstractPage = new AbstractPage(page);
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    navbar = new Navbar(page);
    purchaseCurrency = new PurchaseForeignCurrencyCash(page);
    PayBills = new PayBillsPage(page);

    // Load test data
    users = await abstractPage.readDataFromJSONFile('./tests/ZeroBank_Test_PageObject/TestData/PurchaseForeignCurrencyCash_Scenarios.json');

    // Login flow
    await homePage.visit();
    await homePage.clickOnSignIn();
    await loginPage.login('username', 'password');
    await page.waitForLoadState('networkidle');
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');
    await loginPage.wait();
  });

  test('Purchase Foreign Currency Cash - Data Driven', async () => {
    for (const record of users) {
      await navbar.clickOnTab('Pay Bills');
      await PayBills.clickOnPayBillsTab("Purchase Foreign Currency");
      await PayBills.purchaseForeignCurrencyTitle();
  
      await purchaseCurrency.selectCurrency(record.selectCurrency);
      await purchaseCurrency.assertTodaysSellRate();
      await purchaseCurrency.enterAmount(record.enterAmount);
      await purchaseCurrency.selectRadioButton(record.selectRadioButton);
      await purchaseCurrency.clickCalculateCostsButton();
      await purchaseCurrency.assertConversionAmount();
      await purchaseCurrency.clickPurchaseButton();
      await purchaseCurrency.assertSuccessMessage(record.Result);
    }
  });
});
