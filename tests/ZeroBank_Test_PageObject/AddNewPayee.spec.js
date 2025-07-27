import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";
import { PayBillsPage } from "../../page-objects/PayBillsPage";
import { AddNewPayeePage } from "../../page-objects/AddNewPayeePage";
const { Navbar } = require("../../page-objects/components/Navbar");

test.describe("Add New Payee", () => {
  let homePage = HomePage;
  let loginPage = LoginPage;
  let payBillsPage = PayBillsPage;
  let navbar = Navbar;
  let addNewPayeePage = AddNewPayeePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    payBillsPage = new PayBillsPage(page);
    navbar = new Navbar(page);
    addNewPayeePage = new addNewPayeePage(page);

    await homePage.visit();
    await homePage.clickOnSignIn();
    await loginPage.login("username", "password");
    //This is to bypass SSL error
    await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html",{waitUntil: "load"});
  });
  test("add new payee", async ({ page }) => {
    //await navbar.clickOnTab("Account Summary");
    await navbar.clickOnTab("Pay Bills");
    //await page.pause(3000);
    //    await payBillsPage.clickOnPayBillsTab("Add New Payee");
    await payBillsPage.clickOnPayBillsTab("Add New Payee");
    //await page.pause(3000);
    await addNewPayeePage.createNewPayee(
      "Livevox",
      "RichmondCircle",
      "SavingsAccount",
      "SalaryAccount123"
    );
    await addNewPayeePage.addPayee();
  });
});
