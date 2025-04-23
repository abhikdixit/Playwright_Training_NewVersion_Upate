const { test, expect } = require("@playwright/test");
const { AccessToken } = require("./BaseTest");
test.describe("Create Notes API Testing", () => {
  const baseUrl = "https://practice.expandtesting.com";
  var token;
  const random_title = "Playwright_Notes " + Math.random() * 1000;
  test.beforeAll(async ({ request }) => {
    token = await AccessToken(
      "Deekshitha@practice.com",
      "Deekshitha10",
      request
    );
    expect(token).toBeTruthy();
  });

  test("POST Request - Create Notes", async ({ request }) => {
    const response = await request.post(`${baseUrl}/notes/api/notes`, {
      headers: {
        "x-auth-token": `${token}`,
      },
      data: {
        title: random_title,
        description: "Done via API",
        category: "Personal",
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    console.log(responseBody);
    expect(responseBody.message).toBe("Note successfully created");
    expect(responseBody.data.title).toBe(random_title);
    console.log(random_title);
  });
  // test("Delete test", async ({ page }) => {
  //   await page.goto("https://practice.expandtesting.com/notes/app");
  //   await page.getByRole("link", { name: "Login" }).click();
  //   await page.locator("#email").fill("Deekshitha@practice.com");
  //   await page.locator("#password").fill("Deekshitha10");
  //   await page.getByRole("button", { name: "Login" }).click();
  //   await page
  //     .locator(
  //       "//div[text()='" +
  //         random_title +
  //         "']//following-sibling::div/div/button[normalize-space()='Delete']"
  //     )
  //     .click();

  //     await page.click("//button[@type='button'][normalize-space()='Delete']");
  //     await expect(page.locator(".container")).not.toBe(random_title)
  // });
});
