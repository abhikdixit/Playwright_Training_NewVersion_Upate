import { test, expect } from "@playwright/test";

test.only("OrangeHRM Window Handling - Contact Sales", async ({ page }) => {

    // Open OrangeHRM Login Page
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    console.log("Parent Page URL:", page.url());

    // Handle new window/tab
    const [newPage] = await Promise.all([
        page.waitForEvent("popup"),
        page.click("a[href='http://www.orangehrm.com']")
    ]);

    // Wait for child page to load
    await newPage.waitForLoadState("domcontentloaded");

    console.log("Child Page URL:", newPage.url());

    // Verify OrangeHRM site opened
    await expect(newPage).toHaveURL(/orangehrm\.com/);

    // Click Contact Sales link from navbar
    await newPage.locator('#navbarNav')
        .getByRole('link', { name: 'Contact Sales' })
        .click();

    // Wait for Contact Sales page
    await newPage.waitForLoadState("networkidle");

    // Verify navigation happened
    await expect(newPage).toHaveURL(/contact-sales/);

    // Verify correct heading displayed
    const heading = newPage.locator("h1");

    await expect(heading)
        .toContainText(/talk to our experts/i);

    console.log("Successfully navigated to Contact Sales page");
    console.log("Final URL:", newPage.url());

    // Close child window
    await newPage.close();

    // Verify parent page still exists
    await expect(page).toHaveURL(/orangehrmlive/);
    

});