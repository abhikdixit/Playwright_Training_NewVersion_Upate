//import { Locator, Page } from '@playwright/test'
const { expect, Locator, Page } = require('@playwright/test');
exports.HomePage= class HomePage {
   page= Page
   signInButton= Locator
   searchBox= Locator
   linkFeedback= Locator
   linkOnlineBanking= Locator

  constructor(page= Page) {
    this.page = page
    this.signInButton = page.locator('#signin_button')
    this.searchBox = page.locator('#searchTerm')
    this.linkFeedback = page.locator('#feedback')
    this.linkOnlineBanking = page.locator("//strong[normalize-space()='Online Banking']")
  }

  async visit() {
    await this.page.goto('http://zero.webappsecurity.com/')
  }

  async clickOnSignIn() {
    await this.signInButton.click()
        //This is to bypass SSL error
        //await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
  }

  async clickOnFeedbackLink() {
    await this.linkFeedback.click()
  }

  async clickOnOnlineBankingLink() {
    await this.linkOnlineBanking.click()
  }

  async searchFor(phrase= string) {
    await this.searchBox.type(phrase)
    await this.page.keyboard.press('Enter')
  }
}
