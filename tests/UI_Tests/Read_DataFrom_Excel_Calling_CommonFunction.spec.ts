// Run "npm install xlsx" to install the xlsx library
import { test, expect, type Page } from "@playwright/test";
import { CommonFunction } from "./CommonFunction";

test.describe("WebOrder All Test Scenario calling BaseClass", () => {
  let commonfun: CommonFunction;
  let records: any[];
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    try {
      // Initialize common functions and read test data
      commonfun = new CommonFunction();

      // ✅ Use sheet index (first sheet) → number, not string
      records = commonfun.ReadExcelFile(
        "./tests/TestData/TestAllScenario.xlsx",
        0
      );

      // Set up the page
      page = await browser.newPage();
      await page.goto(
        "http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx",
        { waitUntil: "networkidle" }
      );
    } catch (error) {
      console.error("Setup failed:", error);
      throw error;
    }
  });

  test("WebOrder App", async () => {
    try {
      for (const record of records) {
        // Login attempt
        await page.fill(
          'input[name="ctl00\\$MainContent\\$username"]',
          record.uname
        );
        await page.fill(
          'input[name="ctl00\\$MainContent\\$password"]',
          record.pass
        );
        await page.click("text=Login");
        await page.waitForLoadState("networkidle");

        // Check login result
        const deleteButton = await page.$("#ctl00_MainContent_btnDelete");

        if (deleteButton) {
          // ✅ Successful login case
          const headingText = await page.$eval("h2", (el) =>
            el.textContent?.trim()
          );
          expect(headingText).toBe(record.Exp_Result);

          // Logout for next iteration
          await page.click("text=Logout");
          await page.waitForLoadState("networkidle");
        } else {
          // ❌ Failed login case
          const errorMessage = await page.$eval(
            "#ctl00_MainContent_status",
            (el) => el.textContent?.trim()
          );
          expect(errorMessage).toBe(record.Exp_Result);
        }
      }
    } catch (error) {
      console.error("Test execution failed:", error);
      throw error;
    }
  });

  test.afterAll(async () => {
    try {
      await page.close();
    } catch (error) {
      console.error("Cleanup failed:", error);
      throw error;
    }
  });
});
