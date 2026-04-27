//import { expect, Locator, Page } from '@playwright/test'
import { expect, Locator, Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';

export class LoginPage extends AbstractPage {
//exports.LoginPage = class LoginPage {
  // Define selectors
  // readonly page: Page
  usernameInput: Locator
  passwordInput: Locator
  submitButton: Locator
  errorMessage: Locator
  keepmesignedin: Locator
  Forgetpassword: Locator
  LogInToZeroBanktext: Locator
  // Init selectors using constructor
  constructor(page: Page) {
    // this.page = page
    super(page)
    this.usernameInput = page.locator('#user_login')
    this.passwordInput = page.locator('#user_password')
    this.submitButton = page.locator('text=Sign in')
    this.errorMessage = page.locator('.alert-error')
    this.keepmesignedin = page.locator('#user_remember_me')
    this.Forgetpassword = page.locator("a[href='/forgot-password.html']") 
    this.LogInToZeroBanktext = page.locator('h3:has-text("Log in to ZeroBank")')
  }

  // async enterTextToLoginTextBox(username: string): Promise<void> {
  //   await this.usernameInput.fill(username)
  // }

  // async enterTextToPasswordTextBox(password: string): Promise<void> {
  //   await this.passwordInput.fill(password)
  // }

  // async clickOnSubmitButton(): Promise<void> {
  //   await this.submitButton.click()
  // }

  // async clickOnKeepMeSignedIn(): Promise<void> {
  //   await this.keepmesignedin.check()
  // }
  // Define login page methods
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.submitButton.click()    
  }

   async loginwithSignedIn(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.keepmesignedin.check()
    await this.submitButton.click()
    
  }

  async assertLoginTitleText(): Promise<void> {
    await expect(this.LogInToZeroBanktext).toHaveText('Log in to ZeroBank')
  }
  async assertErrorMessage(): Promise<void> {
    await expect(this.errorMessage).toContainText('Login and/or password are wrong.')
  }
  async snapshotLoginForm(): Promise<void> {
    await expect(this.page.screenshot()).toMatchSnapshot('login-form.png')
  }

  async snapshotErrorMessage(): Promise<void> {
    await expect(this.errorMessage.screenshot()).toMatchSnapshot('login-error.png')
  }

  async clickonForgetPasswordLink(): Promise<void> {
    await this.Forgetpassword.click()
  }
}
