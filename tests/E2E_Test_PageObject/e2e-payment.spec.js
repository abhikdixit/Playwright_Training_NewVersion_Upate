const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../page-objects/LoginPage')
const { HomePage } = require('../../page-objects/HomePage')
const { PaymentPage } = require('../../page-objects/PaymentPage')
const { Navbar } = require('../../page-objects/components/Navbar')

test.describe('New Payment', () => {
  let homePage= HomePage
  let loginPage= LoginPage
  let paymentPage= PaymentPage
  let navbar= Navbar

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    paymentPage = new PaymentPage(page)
    navbar = new Navbar(page)

    await homePage.visit()
    await homePage.clickOnSignIn()
    await loginPage.login('username', 'password')
    //This is to bypass SSL error
     await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
  })

  test('Should send new payment', async ({ page }) => {
    //await homePage.clickOnOnlineBankingLink()
    await navbar.clickOnTab('Pay Bills')
    await paymentPage.createPayment()
    await paymentPage.assertSuccessMessage()
  })
})
