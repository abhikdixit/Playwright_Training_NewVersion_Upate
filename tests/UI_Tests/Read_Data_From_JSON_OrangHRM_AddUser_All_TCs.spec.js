import { test, expect } from "@playwright/test";
import { readFileSync } from 'fs';
let objects = readFileSync('./tests/TestData/OrangeHRM_AddUsers_All_TCs.json')
const users = JSON.parse(objects);

test.describe("Admin -OrangeHRM", () => {
  let page;
  // let newAdminUsername = "minhadmin";
  // let newAdminPassword = "a123456";

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
    test(`@regression OrangeHRM Add User- All TCs: ${record.test_case}`, async () => {
      let expResult = record.expResult;
      let role = record.role;
      let name = record.name;
      let status = record.status;
      let username = record.username;
      let pass = record.pass;
      let confirm = record.confirm;

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
        await page.getByPlaceholder("Type for hints...").fill(name);
        await page.getByRole("option", { name: name }).click();
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