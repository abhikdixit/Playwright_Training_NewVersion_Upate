import { test, expect, Page } from "@playwright/test";
import { readFileSync } from 'fs';
import path from 'path';

// Read test data with proper error handling
const testDataPath = path.join(process.cwd(), 'tests', 'TestData', 'OrangeHRM_AddUsers_All_TCs.json');
let users: Array<{
  test_case: string;
  expResult: string;
  role?: string;
  name?: string;
  status?: string;
  username?: string;
  pass?: string;
  confirm?: string;
}>;

try {
  const objects = readFileSync(testDataPath, 'utf-8');
  users = JSON.parse(objects);
} catch (error) {
  console.error('Failed to read or parse test data:', error);
  throw error;
}

test.describe("Admin -OrangeHRM", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    try {
      page = await browser.newPage();
      
      // Navigate to login page with explicit wait
      await page.goto(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
        { waitUntil: 'networkidle' }
      );

      // Login with proper waits and verification
      const usernameInput = page.getByPlaceholder("Username");
      const passwordInput = page.getByPlaceholder("Password");
      const loginButton = page.getByRole("button", { name: "Login" });

      await usernameInput.waitFor({ state: 'visible' });
      await usernameInput.fill("Admin");
      await passwordInput.fill("admin123");
      await loginButton.click();

      // Verify successful login
      await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    } catch (error) {
      console.error('Setup failed:', error);
      throw error;
    }
  });

  for (const record of users) {
    test(`@regression OrangeHRM Add User- All TCs: ${record.test_case}`, async () => {
      try {
        // Destructure test data for better readability
        const {
          expResult,
          role,
          name,
          status,
          username,
          pass,
          confirm
        } = record;

        // Navigate to Admin section and click Add
        const adminLink = page.getByRole("link", { name: "Admin" });
        const addButton = page.getByRole("button", { name: "Add" });

        await adminLink.waitFor({ state: 'visible' });
        await adminLink.click();
        await addButton.waitFor({ state: 'visible' });
        await addButton.click();


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
    } catch (error) {
      console.error(`Test case "${record.test_case}" failed:`, error);
      throw error;
    }
    });
  }

  test.afterAll(async () => {
    await page.locator("xpath=//span[@class='oxd-userdropdown-tab']").click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
  });
});