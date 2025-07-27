const fs = require('fs');
import { test, expect } from '@playwright/test';
export class Login_LogoutPage {

  constructor(page) {
    this.page = page;
    this.InputUserName = this.page.getByLabel("Username:");
    this.InputPassword = this.page.getByLabel("Password:");
    this.LoginButton = this.page.locator("//input[@id='ctl00_MainContent_login_button']");
    this.Logout_O = this.page.getByRole('menuitem', { name: 'Logout' });
    this.Logout = this.page.locator("//a[text()='Logout']");
    this.icon = this.page.locator("//i[@class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']");
  }

   async verifyURL(url) {
    await expect(this.page).toHaveURL(url);
  }

  async gotoURL() {
    await this.page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  }

  async LoginToApp(uname, pass) {
    await this.InputUserName.fill(uname);
    await this.InputPassword.fill(pass);
    await this.LoginButton.click(); 
  }

  async LogoutFromApp() {
    //await this.icon.click()
    await this.Logout.click()
  }

  // define the scraper function
  async scraper(tableparent,ptitle,pprice) {
    // find all product containers on the page
    const productContainers = await this.page.$$(tableparent);

    for (const container of productContainers) {
        // extract product name and price from each container
        const productName = await container.$eval(ptitle, element => element.innerText);
        const price = await container.$eval(pprice, element => element.innerText);

        console.log("Name:", productName);
        console.log("Price:", price);
    }
}
async scraper2(table,firstName, salary) {
  let string = '';
  fs.writeFileSync('tests/TestData/DataTable_Name_Salary.csv', string);
//   // find all product containers on the page
  const productContainers = await this.page.$$(table);
  // console.log(await this.page.$$(table));
  for (const container of productContainers) {
    // extract product name and price from each container
    const Name = await container.$eval(firstName,(element) => element.innerText);
    const Salary1 = await container.$eval(salary,(element) => element.innerText);
    string += '[' + Name + ']\t\t\t(' + Salary1 + ')\n\n';
    console.log("First Name:", Name);
    console.log("salary:", Salary1);
  }
  // fs.writeFileSync('tests/TestData/books_24_Scrapping_Data_CallingBaseClass_exercise_2.csv', string);
  fs.appendFileSync('tests/TestData/DataTable_Name_Salary.csv', string);
}

}
