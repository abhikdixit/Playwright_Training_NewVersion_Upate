//import { expect, Locator, Page } from '@playwright/test'
import { expect, Locator, Page } from '@playwright/test';

//export class ForgetPasswordPage extends AbstractPage {
exports.ForgetPasswordPage = class ForgetPasswordPage {
  emailInput = Locator
  sendPasswordButton = Locator
  confirmMessage = Locator

  // Init selectors using constructor
  constructor(page = Page) {
    this.page = page
    this.forgottenPasswordHeader = page.locator("//h3[text()='Forgotten Password']")
    this.emailInput = page.locator('#user_email')
    this.sendPasswordButton = page.locator("//input[@value='Send Password']")
    this.confirmMessage = page.locator("//div[@class='page-header']/parent::div")
  }

  async forgotPasswordTitle() {
    await expect(this.forgottenPasswordHeader).toContainText("Forgotten Password");
  }
  
  async enterEmailAndSendRequest(email = string) {
    await this.emailInput.type(email)
    //const emailID= await this.emailInput.inputText()
    await this.sendPasswordButton.click()
    let emailID= await this.confirmMessage.textContent()
     emailID= emailID.split(":")[1]
    return emailID
  }

  async assertConfirmationMessage(email = string) {
    await expect(this.confirmMessage).toBeVisible()
    await expect(this.confirmMessage).toContainText(`Your password will be sent to the following email: ${email}`)
  }
}
