//import { test, expect } from '@playwright/test'
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';

test.describe('Login / Logout Flow @smoke', () => {
  let loginPage= LoginPage
  let homePage= HomePage

  // Before Hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)

    await homePage.visit()
  })

  // Negative Scenario
  test('Negative Scenario for login', async () => {
    await homePage.clickOnSignIn()
    await loginPage.login('invalid username', 'invalid password')
    await loginPage.wait(3000)
    await loginPage.assertErrorMessage()
  
  })

  // Positive Scenario + Logout
  test('Positive Scenario for login + logout', async ({ page }) => {
    await homePage.clickOnSignIn()
    await loginPage.login(process.env.zeroBankUserName, process.env.zeroBankPassword)
    //This is to bypass SSL error
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    //Below practice is not advisable
    // const accountSummaryTab = await page.locator('#account_summary_tab')
    // await expect(accountSummaryTab).toBeVisible()
    await homePage.logout()
    // await page.goto('http://zero.webappsecurity.com/logout.html')
    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  })
})
