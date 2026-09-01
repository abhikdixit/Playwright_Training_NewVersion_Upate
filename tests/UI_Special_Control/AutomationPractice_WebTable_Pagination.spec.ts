import { test, expect } from "@playwright/test";

test("Select Product checkbox", async ({ page }) => {

  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.locator("#productTable").scrollIntoViewIfNeeded();

  const targetProduct = "Router";
  let found = false;

  const pageLinks = page.locator("#pagination li a");
  const totalPages = await pageLinks.count();

  for (let pageNo = 0; pageNo < totalPages && !found; pageNo++) {

    await pageLinks.nth(pageNo).click();

    const rows = page.locator("#productTable tbody tr");
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {

      const row = rows.nth(i);

      const product = (await row.locator("td").nth(1).textContent())?.trim();

      if (product === targetProduct) {

        const checkbox = row.locator("input[type='checkbox']");

        await checkbox.check();
        await expect(checkbox).toBeChecked();

        console.log(`Product "${targetProduct}" found on Page ${pageNo + 1} and checkbox selected.`);

        found = true;
        break;
      }
    }
  }

  if (!found) {
    console.log(`Product "${targetProduct}" was NOT found in ${totalPages} page(s).`);
  }

  expect(found, `Product "${targetProduct}" was not found.`).toBeTruthy();
});