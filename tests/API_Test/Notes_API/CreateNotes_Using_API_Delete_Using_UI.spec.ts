import { test, expect } from "@playwright/test";
import { AccessToken, deleteAllNotes } from "./BaseTest";
test.describe("Create Notes API Testing", () => {
  const baseUrl = "https://practice.expandtesting.com";
  let token: string;
  const random_title = `Playwright_Notes_${Math.floor(Math.random() * 100000)}`;
  test.beforeAll(async ({ request }) => {
    token = await AccessToken(
      "testing@abc.com",
      "test1234",
      request
    );
    expect(token).toBeTruthy();
    //call deleteall notes API to clean up any existing notes from BaseTest.js
    await deleteAllNotes(token, request);
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
    await page.locator("#email").fill("testing@abc.com");
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
    // Click the confirm delete button in the modal
    await page.locator('[data-testid="note-delete-confirm"]').click();
    // Verify the note is deleted
    await expect(page.locator(`//div[text()='${random_title}']`)).toHaveCount(0);
  });
});
