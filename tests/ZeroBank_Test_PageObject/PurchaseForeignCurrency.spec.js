import { readFileSync } from 'fs';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';
import { Navbar } from '../../page-objects/components/Navbar';
import { PurchaseForeignCurrencyCash } from '../../page-objects/PurchaseForeignCurrency';
import { PayBillsPage } from '../../page-objects/PayBillsPage';
let objects = readFileSync(`./tests/ZeroBank_Test_PageObject/TestData/PurchaseForeignCurrencyCash_Scenarios.json`)

const users = JSON.parse(objects);
test.describe('Transfer Funds and Make Payment', () => {
  let page;
  let context;
  let homePage= HomePage
  let loginPage= LoginPage
  let navbar= Navbar
  let purchaseCurrency = PurchaseForeignCurrencyCash
  let PayBills = PayBillsPage 


  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    navbar = new Navbar(page)
    purchaseCurrency = new PurchaseForeignCurrencyCash(page)
    PayBills = new PayBillsPage(page)

    await homePage.visit()
    await homePage.clickOnSignIn()
    await loginPage.login('username', 'password')
    //await loginPage.wait()
    //This is to bypass SSL error
    //await page.setBypassCSP(true);
    await page.waitForLoadState('networkidle');
     await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
     await loginPage.wait(3000)
  })
  for (const record of users) {

  test(`Purchase Foreign Currency Cash - ${record.selectCurrency}: ${record.TestCaseID}`, async ({ page }) => {
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
    await purchaseCurrency.assertSuccessMessage();
    
  })

}
})