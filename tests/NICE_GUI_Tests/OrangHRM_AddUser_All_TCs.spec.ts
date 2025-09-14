import { test, expect, Page } from "@playwright/test";
import { readFileSync } from 'fs';

interface TestRecord {
  test_case: string;
  expResult: 'valid' | 'empty_role' | 'empty_name' | 'empty_status' | 'empty_username' | 
             'invalid_username' | 'exist_username' | 'empty_pass' | 'empty_confirm_pass';
  role?: string;
  name?: string;
  status?: string;
  username?: string;
  pass?: string;
  confirm?: string;
}

let objects = readFileSync('./tests/TestData/OrangeHRM_AddUsers_All_TCs.json')
const users = JSON.parse(objects.toString()) as TestRecord[];

test.describe("Admin -OrangeHRM", () => {
  let page: Page;
  const newAdminUsername: string = "minhadmin";
  const newAdminPassword: string = "a123456";

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();
    
  });

  for (const record of users) {
    test(`@regression OrangeHRM: ${record.test_case}`, async () => {
      const expResult = record.expResult;
      const role = record.role;
      const name = record.name || 'Default';  // Provide default value
      const status = record.status;
      const username = record.username;
      const pass = record.pass;
      const confirm = record.confirm;

        const d = new Date();
        const ms = d.getMilliseconds();

        const ExpUserName = name + ms;

      await page.getByRole("link", { name: "Admin" }).click();
      await page.locator("//button[normalize-space()='Add']").click();


      //filling role
      if (role) {
        await page.locator("xpath=(//i[@class='oxd-icon bi-caret-down-fill oxd-select-text--arrow'])[1]").click();
        // await page.getByText("-- Select --").first().click();
        await page.getByRole("option", { name: role }).click();

      }
      //filling name
      if (name) {
        await page.getByPlaceholder("Type for hints...").click();
        await page.getByPlaceholder("Type for hints...").fill(ExpUserName);
        await page.getByRole("option", { name: ExpUserName }).click();
      }
      //filling status
      if (status) {
        await page.locator("xpath=(//i[@class='oxd-icon bi-caret-down-fill oxd-select-text--arrow'])[2]").click();
        // await page.getByText("-- Select --").click();
        await page.getByText(status).click();
      }
      //filling username
      if (username) {
        await page.getByRole("textbox").nth(2).click();
        await page.getByRole("textbox").nth(2).fill(username);
      }

      //filling password
      if (pass) {
        await page.getByRole("textbox").nth(3).click();
        await page.getByRole("textbox").nth(3).fill(pass);
      }

      //filling confirm password
      if (confirm) {
        await page.getByRole("textbox").nth(4).click();
        await page.getByRole("textbox").nth(4).fill(confirm);
      }

      await page.getByRole("button", { name: "Save" }).click();
      await page.waitForTimeout(3000);

      switch (expResult) {
        case "valid":
          await expect(page.locator(`xpath=//div[text()='${username}']`)).toBeVisible();
          await expect(page.locator(`xpath=//div[text()='${username}']/parent::div/following-sibling::div/div[text()='${role}']`)).toBeVisible();
          break;
        case "empty_role":
          await expect(page.locator("xpath=//label[text()='User Role']/parent::div/following-sibling::span[text()='Required']")).toBeVisible();
          break;
        case "empty_name":
          await expect(page.locator("xpath=//label[text()='Employee Name']/parent::div/following-sibling::span[text()='Required']")).toBeVisible();
          break;
        case "empty_status":
          await expect(page.locator("xpath=//label[text()='Status']/parent::div/following-sibling::span[text()='Required']")).toBeVisible();
          break;
        case "empty_username":
          await expect(page.locator("xpath=//label[text()='Username']/parent::div/following-sibling::span[text()='Required']")).toBeVisible();
          break;
        case "invalid_username":
          await expect(page.locator("xpath=//label[text()='Username']/parent::div/following-sibling::span[text()='Should be at least 5 characters']")).toBeVisible();
          break;
        case "exist_username":
          await expect(page.locator("xpath=//label[text()='Username']/parent::div/following-sibling::span[text()='Already exists']")).toBeVisible();
          break;
        case "empty_pass":
          await expect(page.locator("xpath=//label[text()='Password']/parent::div/following-sibling::span[text()='Required']")).toBeVisible();
          await expect(page.locator("xpath=//label[text()='Confirm Password']/parent::div/following-sibling::span[text()='Passwords do not match']")).toBeVisible();
          break;
        case "empty_confirm_pass":
          await expect(page.locator("xpath=//label[text()='Confirm Password']/parent::div/following-sibling::span[text()='Passwords do not match']")).toBeVisible();
          break;

      }

    });

  }
  test.afterAll(async () => {
    await page.locator("xpath=//span[@class='oxd-userdropdown-tab']").click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
  });
});