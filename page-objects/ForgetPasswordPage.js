//import { expect, Locator, Page } from '@playwright/test'
import { expect, Locator, Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';

export class ForgotPasswordPage extends AbstractPage {
  // Define selectors
  // readonly page: Page
  emailInput = Locator
  sendPasswordButton = Locator
  errorMessage = Locator
  successMessage = Locator

  // Init selectors using constructor
  constructor(page = Page) {
    // this.page = page
    super(page)
    this.emailInput = page.locator('#user_email')
    this.sendPasswordButton = page.locator('text=Send Password')
    //this.errorMessage = page.locator('.alert-error')
    this.successMessage = page.locator('.page-header')
       
  }

  // Define login page methods
  async forgotpassword(email = string) {
    await this.emailInput.type(email)
    await this.sendPasswordButton.click()
    
  }

  async forgotPasswordSuccessMsg() {
    await expect(this.successMessage).toBeVisible()
  }

}