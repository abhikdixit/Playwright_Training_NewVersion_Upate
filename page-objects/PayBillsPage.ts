//import { Locator, Page } from '@playwright/test'
import { expect, Locator, Page } from "@playwright/test";
export class PayBillsPage {
    page: Page;
    paySavedPayeeTab: Locator;
    addNewPayeeTab: Locator;
    purchaseForeignCurrencyTab: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.paySavedPayeeTab = page.locator("//a[text()='Pay Saved Payee']");
        this.addNewPayeeTab = page.locator("//a[text()='Add New Payee']");
        this.purchaseForeignCurrencyTab = page.locator(
            "//a[text()='Purchase Foreign Currency']"
        );
    }
    async clickOnPayBillsTab(tabName: string): Promise<void> {
        switch (tabName) {
            case "Pay Saved Payee":
                await this.paySavedPayeeTab.click();
                break;
            case "Add New Payee":
                await this.addNewPayeeTab.click();
                break;
            case "Purchase Foreign Currency":
                await this.purchaseForeignCurrencyTab.click();
                break;
            default:
                throw new Error("This tab does not exist..");
        }
    }
    async paySavedPayeeTitle(): Promise<void> {
        await expect(this.paySavedPayeeTab).toContainText("Pay Saved Payee");
    }
    async addNewPayeeTitle(): Promise<void> {
        await expect(this.addNewPayeeTab).toContainText("Add New Payee");
    }
    async purchaseForeignCurrencyTitle(): Promise<void> {
        await expect(this.purchaseForeignCurrencyTab).toContainText(
            "Purchase Foreign Currency"
        );
    }
}
