//import { expect, Locator, Page } from '@playwright/test'
const { expect, Locator, Page } = require('@playwright/test');
const { AbstractPage } = require('./AbstractPage')

exports.LoginPage = class LoginPage extends AbstractPage {
  // Define selectors
  // readonly page: Page
   usernameInput= Locator
  passwordInput= Locator
  submitButton= Locator
  errorMessage= Locator

  // Init selectors using constructor
  constructor(page= Page) {
    // this.page = page
    super(page)
    this.usernameInput = page.locator('#user_login')
    this.passwordInput = page.locator('#user_password')
    this.submitButton = page.locator('text=Sign in')
    this.errorMessage = page.locator('.alert-error')
  }

  // Define login page methods
  async login(username= string, password= string) {
    await this.usernameInput.type(username)
    await this.passwordInput.type(password)
    await this.submitButton.click()
    
  }

  async assertErrorMessage() {
    await expect(this.errorMessage).toContainText('Login and/or password are wrong')
  }
  async snapshotLoginForm() {
    await expect(this.loginForm.screenshot()).toMatchSnapshot('login-form.png')
  }

  async snapshotErrorMessage() {
    await expect(this.errorMessage.screenshot()).toMatchSnapshot('login-error.png')
  }
}
