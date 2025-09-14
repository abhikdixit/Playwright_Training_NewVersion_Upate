//import { expect, Locator, Page } from '@playwright/test'
import { expect, Locator, Page } from "@playwright/test";

export class AddNewPayeePage {
  page: Page;
  payeeNameInput: Locator;
  payeeAddressInput: Locator;
  accountInput: Locator;
  payeeDetailsInput: Locator;
  addButton: Locator;
  addNewPayeeTitle: Locator;
  message: Locator;

  constructor(page: Page) {
    this.page = page;
    this.payeeNameInput = page.locator("#np_new_payee_name");
    this.payeeAddressInput = page.locator("#np_new_payee_address");
    this.accountInput = page.locator("#np_new_payee_account");
    this.payeeDetailsInput = page.locator("#np_new_payee_details");
    this.addButton = page.locator("#add_new_payee");
    this.addNewPayeeTitle = page.locator(
      "//h2[normalize-space()='Who are you paying?']"
    );
    this.message = page.locator("#alert_content");
  }
  async createNewPayee(
    payeeName: string,
    payeeAddress: string,
    account: string,
    payeeDetails: string
  ): Promise<void> {
    await this.payeeNameInput.type(payeeName);
    await this.payeeAddressInput.type(payeeAddress);
    await this.accountInput.type(account);
    await this.payeeDetailsInput.type(payeeDetails);
  }
  async addPayee(): Promise<void> {
    await this.addButton.click();
  }

  async assertAddNewPayeeTitle(): Promise<void> {
    await expect(this.addNewPayeeTitle).toBeVisible();
  }
  async assertSuccessMessage(): Promise<void> {
    await expect(this.message).toBeVisible();
    await expect(this.message).toContainText("successfully created");
  }
}
