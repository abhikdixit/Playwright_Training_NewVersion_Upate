import { expect, Locator, Page } from '@playwright/test';

export class ForgetPasswordPage {
  page: Page;
  emailInput: Locator;
  sendPasswordButton: Locator;
  confirmMessage: Locator;
  forgottenPasswordHeader: Locator;

  // Init selectors using constructor
  constructor(page: Page) {
    this.page = page;
    this.forgottenPasswordHeader = page.locator("//h3[text()='Forgotten Password']");
    this.emailInput = page.locator('#user_email');
    this.sendPasswordButton = page.locator("//input[@value='Send Password']");
    this.confirmMessage = page.locator("//div[@class='page-header']/parent::div");
  }

  async forgotPasswordTitle(): Promise<void> {
    await expect(this.forgottenPasswordHeader).toContainText("Forgotten Password");
  }
  
  async enterEmailAndSendRequest(email: string): Promise<string> {
    await this.emailInput.fill(email);
    await this.sendPasswordButton.click();
    const text = await this.confirmMessage.textContent();
    const emailID = text ? text.split(":")[1]?.trim() ?? '' : '';
    return emailID;
  }

  async assertConfirmationMessage(email: string): Promise<void> {
    await expect(this.confirmMessage).toBeVisible();
    await expect(this.confirmMessage).toContainText(`Your password will be sent to the following email: ${email}`);
  }
}
