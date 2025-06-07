
const fs = require("fs"); //to read any file and to read data from external file its like import..
const { test, expect } = require("@playwright/test");

// Reads the JSON file and saves it
let objects = fs.readFileSync("./tests/TestData/OrangeHRM_Login_All_TCs.json");
const users = JSON.parse(objects);

for (const record of users) {
  test(`OrangeHRM: ${record.test_case}`, async ({ page }) => {
    //console.log(record.name, record.password, record.exp_result);

    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    await page.getByPlaceholder("Username").click();
    await page.getByPlaceholder("Username").fill(record.name);
    await page.getByPlaceholder("Password").click();
    await page.getByPlaceholder("Password").fill(record.password);
    await page.getByRole("button", { name: "Login" }).click();
    let msg;
    if ("Dashboard" == record.exp_result) {
      
      msg = page.locator("//h6[text()='Dashboard']");
      await expect(msg).toHaveText(record.exp_result);
      //logout
      await page.locator("//i[@class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']").click();
      await page.getByRole("menuitem", { name: "Logout" }).click();
      await page.waitForLoadState();

    }
    else if('Required' == record.exp_result)
      {
        msg = page.locator("//span[text()='Required']");
        await expect(msg).toHaveText(record.exp_result);

      }
     else
      {
      
      msg = await page.getByText('Invalid credentials')
      await expect(msg).toHaveText(record.exp_result);
    }
     //console.log(msg)
  });
}
