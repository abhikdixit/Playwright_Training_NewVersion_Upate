//import { expect, Locator, Page } from '@playwright/test'
const { expect, Locator, Page } = require('@playwright/test');
exports.TransferFundPage= class TransferFundPage {
   page= Page
   fromAccount= Locator
   toAccount= Locator
   amount= Locator
   descriptionInput= Locator
   accountSelectbox= Locator
   continueButton= Locator
   message= Locator

  constructor(page= Page) {
    this.page = page
    this.fromAccount = page.locator('#tf_fromAccountId')
    this.toAccount = page.locator('#tf_toAccountId')
    this.amount= page.locator('#tf_amount')
    this.descriptionInput = page.locator('#tf_description')
    this.continueButton = page.locator('#btn_submit')
    this.verifyDetail = page.locator("//h2[text()='Transfer Money & Make Payments - Verify']")
    this.submitPaymentButton = page.locator("//button[@type='submit']")
    this.message = page.locator("//div[@class='alert alert-success']")
  }

  async makePayment() {
    await this.fromAccount.selectOption('Savings(Avail. balance = $ 1000)')
    await this.toAccount.selectOption('Savings(Avail. balance = $ 1000)')
    await this.amount.type('500')
    await this.descriptionInput.type('Some message')
    await this.continueButton.click()
    await expect(this.verifyDetail).toBeVisible()
    await this.submitPaymentButton.click()
  }

  async assertSuccessMessage() {
    await expect(this.message).toBeVisible()
    await expect(this.message).toContainText('You successfully submitted your transaction.')
  }
}
