const { test, expect } = require("@playwright/test");
const { Login_LogoutPage } = require("./BaseTest");

test("Create Order-Update Order- Verify Order@smoke", async ({ page }) => {
  await page.goto("https://datatables.net/examples/data_sources/server_side", {
    timeout: 1000000,
  });
  let scrap;
  scrap = new Login_LogoutPage(page);

  while (true) {
    try {
      // execute the scraper function
    await scrap.scraper2(`#example tbody tr`, `td.sorting_1`, `td.dt-type-numeric`);
      // await scrap.scraper2(`//table[@id='example']`);
      // find and click the next page link
      const nextPageLink = await page.$("button[aria-label='Next']");

      if (await nextPageLink.getAttribute("aria-disabled")) {
        console.log("No more pages available");
        // await page.pause()
        break;
      } else {
        await nextPageLink.click({ timeout: 100000 });
        //await page.waitForTimeout(30000);
      }
    } catch (e) {
      console.log("An error occurred:", e);
      break;
    }
  }

});
