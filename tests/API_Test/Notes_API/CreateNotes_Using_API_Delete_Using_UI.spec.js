const { test, expect } = require("@playwright/test");
const { AccessToken } = require("./BaseTest");
test.describe("Create Notes API Testing", () => {
  const baseUrl = "https://practice.expandtesting.com";
  var token;
  const random_title = "Playwright_Notes " + Math.random() * 1000;
  test.beforeAll(async ({ request }) => {
    token = await AccessToken(
      "abhi@xyz.com",
      "test1234",
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
  test("Delete test", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/notes/app");
    await page.getByRole("link", { name: "Login" }).click();
    await page.locator("#email").fill("abhi@xyz.com");
    await page.locator("#password").fill("test1234");
    await page.getByRole("button", { name: "Login" }).click();
    // Wait for notes to load
    await page.waitForSelector(".container");
    // Delete the note with the random title
    const noteDeleteButton = page.locator(
      `//div[text()='${random_title}']//following-sibling::div/div/button[normalize-space()='Delete']`
    );
    await expect(noteDeleteButton).toBeVisible({ timeout: 5000 });
    await noteDeleteButton.click();
    // Verify the note is deleted
    await expect(page.locator(`//div[text()='${random_title}']`)).toHaveCount(0);
  });
});
