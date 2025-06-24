//import { expect, Locator, Page } from '@playwright/test'
const { expect, Locator, Page } = require("@playwright/test");

exports.TransferFundPage = class TransferFundPage {
  page = Page;
  fromAccount = Locator;
  toAccount = Locator;
  amount = Locator;
  descriptionInput = Locator;
  accountSelectbox = Locator;
  continueButton = Locator;
  message = Locator;
  fundTransferPage= Locator;
  cancelButton = Locator;
  submitPaymentButton = Locator;
  verifyDetail = Locator;

  constructor(page) {
    this.page = page;
    this.fromAccount = page.locator("#tf_fromAccountId");
    this.toAccount = page.locator("#tf_toAccountId");
    this.amount = page.locator("#tf_amount");
    this.descriptionInput = page.locator("#tf_description");
    this.continueButton = page.locator("#btn_submit");
    this.verifyDetail = page.locator(
      "//h2[text()='Transfer Money & Make Payments - Verify']"
    );
    this.submitPaymentButton = page.locator("//button[@type='submit']");
    this.message = page.locator("//div[@class='alert alert-success']");
    this.fundTransferPage = page.locator("//h2[@class='board-header']")
    this.cancelButton = page.locator("#btn_cancel");
  }

  async makePayment(selectFromAccount, toAccount, amount, description) {
    await this.fromAccount.selectOption(selectFromAccount);
    await this.toAccount.selectOption(toAccount);
    await this.amount.type(amount);
    await this.descriptionInput.type(description);
    await this.continueButton.click();
  }

  async verifyAndSubmit(){
    await expect(this.verifyDetail).toBeVisible();
    await this.submitPaymentButton.click();
  }

   async verifyAndCancel(){
    await expect(this.verifyDetail).toBeVisible();
    await this.cancelButton.click();
  }

  async assertSuccessMessage() {
    await expect(this.message).toBeVisible();
    await expect(this.message).toContainText(
      "You successfully submitted your transaction."
    );
  }
  async assertSamePage() {
    await expect(this.fundTransferPage).toBeVisible();
    await expect(this.fundTransferPage).toContainText(
      "Transfer Money & Make Payments"
    );
  }
};