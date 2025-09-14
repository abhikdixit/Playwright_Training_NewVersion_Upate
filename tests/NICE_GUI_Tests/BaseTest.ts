import fs from 'fs';
import { test, expect, Page, Locator } from '@playwright/test';

export class Login_LogoutPage {
  private readonly page: Page;
  private readonly InputUserName: Locator;
  private readonly InputPassword: Locator;
  private readonly LoginButton: Locator;
  private readonly Logout_O: Locator;
  private readonly Logout: Locator;
  private readonly icon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.InputUserName = this.page.getByLabel("Username:");
    this.InputPassword = this.page.getByLabel("Password:");
    this.LoginButton = this.page.locator("//input[@id='ctl00_MainContent_login_button']");
    this.Logout_O = this.page.getByRole('menuitem', { name: 'Logout' });
    this.Logout = this.page.locator("//a[text()='Logout']");
    this.icon = this.page.locator("//i[@class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']");
  }

  /**
   * Verify the current URL matches the expected URL
   * @param url - The expected URL
   * Removing Promise<void> won’t break your code, and TypeScript will still
   * infer the correct return type. It’s just a matter of style and strictness:

Keep Promise<void> if you want clarity and strict typing (useful in teams / code reviews).

Drop it if you prefer shorter and cleaner code.
   */
  // async verifyURL(url: string): Promise<void> {
  //   await expect(this.page).toHaveURL(url);
  // }

  // Implicit (cleaner)
  async verifyURL(url: string) {
    await expect(this.page).toHaveURL(url);
  }
  /**
   * Navigate to the application's login page
   */
  async gotoURL(): Promise<void> {
    try {
      await this.page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx', {
        waitUntil: 'networkidle'
      });
    } catch (error) {
      console.error('Failed to navigate to URL:', error);
      throw error;
    }
  }

  /**
   * Login to the application with provided credentials
   * @param username - The username to login with
   * @param password - The password to login with
   */
  async loginToApp(username: string, password: string): Promise<void> {
    try {
      await this.InputUserName.fill(username);
      await this.InputPassword.fill(password);
      await this.LoginButton.click();
      await this.page.waitForLoadState('networkidle');
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    }
  }

  /**
   * Logout from the application
   */
  async logoutFromApp(): Promise<void> {
    try {
      await this.Logout.click();
      await this.page.waitForLoadState('networkidle');
    } catch (error) {
      console.error('Failed to logout:', error);
      throw error;
    }
  }

  /**
   * Scrape product information from a table
   * @param tableSelector - The selector for the table container
   * @param titleSelector - The selector for the product title
   * @param priceSelector - The selector for the product price
   */
  async scrapeProducts(tableSelector: string, titleSelector: string, priceSelector: string): Promise<Array<{ name: string; price: string }>> {
    try {
      const products = [];
      const containers = await this.page.$$(tableSelector);

      for (const container of containers) {
        const name = await container.$eval(titleSelector, (element: HTMLElement) => element.innerText);
        const price = await container.$eval(priceSelector, (element: HTMLElement) => element.innerText);
        products.push({ name, price });
      }

      return products;
    } catch (error) {
      console.error('Failed to scrape products:', error);
      throw error;
    }
  }

  /**
   * Scrape employee data and save to CSV
   * @param tableSelector - The selector for the table container
   * @param nameSelector - The selector for the employee name
   * @param salarySelector - The selector for the salary
   */
  async scrapeEmployeeData(tableSelector: string, nameSelector: string, salarySelector: string): Promise<void> {
    try {
      let csvContent = '';
      const containers = await this.page.$$(tableSelector);

      for (const container of containers) {
        const name = await container.$eval(nameSelector, (element: HTMLElement) => element.innerText);
        const salary = await container.$eval(salarySelector, (element: HTMLElement) => element.innerText);
        csvContent += `[${name}]\t\t\t(${salary})\n\n`;
      }

      const filePath = 'tests/TestData/DataTable_Name_Salary.csv';
      fs.writeFileSync(filePath, csvContent);
    } catch (error) {
      console.error('Failed to scrape and save employee data:', error);
      throw error;
    }
  }

}
