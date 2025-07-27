//import { test, expect } from '@playwright/test'
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';
import { ForgetPasswordPage } from '../../page-objects/ForgetPasswordPage';

test.describe('Login / Logout Flow @smoke', () => {
  let loginPage= LoginPage
  let homePage= HomePage
  let forgotPasswordPage = ForgetPasswordPage

  // Before Hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    forgotPasswordPage = new ForgetPasswordPage(page)

    await homePage.visit()
    await homePage.clickOnSignIn()
  })

  let emailId="abc@gmail.com"
  
  test('Send Request for Forgotten password', async () => {
    
    await loginPage.clickonForgetPasswordLink()
    await forgotPasswordPage.forgotPasswordTitle()
    const enterEmail= await forgotPasswordPage.enterEmailAndSendRequest(emailId)
    await forgotPasswordPage.assertConfirmationMessage(enterEmail)
  })
})
