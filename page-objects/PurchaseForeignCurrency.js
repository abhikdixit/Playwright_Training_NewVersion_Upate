
import { expect, Locator, Page } from "@playwright/test";
export class PurchaseForeignCurrencyCash {
  page = Page;
  currency = Locator;
  todaysSellRate = Locator;
  amount = Locator;
  currencyRadioButtonUSD = Locator;
  currencyRadioButtonSelectedCurrency = Locator;
  calculateCostsButton = Locator;
  conversionAmount = Locator;
  PurchaseButton = Locator;
  message = Locator;

  constructor(page = Page) {
    this.page = page;
    this.currency = page.getByText("Currency", { exact: true });
    this.todaysSellRate = page.locator('#sp_sell_rate');
    this.amount = page.getByLabel("Conversion Amount");
    this.currencyRadioButtonUSD = page.getByLabel("U.S. dollar (USD)");
    this.currencyRadioButtonSelectedCurrency =      page.getByText("Selected currency");
    this.calculateCostsButton = page.getByRole("button", {      name: "Calculate Costs",    });
    this.conversionAmount = page.locator("#pc_conversion_amount");
    this.PurchaseButton =  page.locator('#purchase_cash');
    this.message = page.getByText("Foreign currency cash was");
  }

  async selectCurrency(selectCurrencyValue) {
    //add variable
    await this.currency.selectOption(selectCurrencyValue);
  }

  async enterAmount(enterAmountValue) {
    await this.amount.fill(enterAmountValue);
  }

  async selectRadioButton(radioButtonValue) {
    //add variable
    if(radioButtonValue == 'Selected currency'){
        await this.currencyRadioButtonSelectedCurrency.check();
    }else{
        await this.currencyRadioButtonUSD.check();
    }   
  }

  async clickCalculateCostsButton() {
    await this.calculateCostsButton.click();
  }

  async assertConversionAmount() {
    await expect(this.conversionAmount).toBeVisible();
  }

  async clickPurchaseButton() {
    await this.PurchaseButton.click();
  }

  async assertTodaysSellRate() {
    await expect(this.todaysSellRate).toBeVisible();
  }

  async assertSuccessMessage() {
    await expect(this.message).toBeVisible();
    await expect(this.message).toContainText("Foreign currency cash was successfully purchased."
    );
  }
}