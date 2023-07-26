const { test,expect, chromium, devices } = require('@playwright/test');
//const iPhone11Pro = devices['iPhone 11 Pro'];
const Galaxy8 = devices['Galaxy S8'];
test('test', async() => {
    const browser = await chromium.launch({
      headless: false, 
    });
    const context = await browser.newContext({
        viewport: Galaxy8.viewport,
        userAgent: Galaxy8.userAgent,
    });
    const page = await context.newPage();
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    
    console.log(devices); // Logs all devices
    await page.waitForLoadState(); // The promise resolves after 'load' event.
    await page.type("input[placeholder='Username']", 'Admin');

    // Fill input[name="txtPassword"]
    await page.fill("input[placeholder='Password']", 'admin123');
  
    // Click input:has-text("LOGIN")
    await page.click("button[type='submit']");

    const DashboardTab = await page.locator("a[class='oxd-main-menu-item active'] span[class='oxd-text oxd-text--span oxd-main-menu-item--name']")
    await expect(DashboardTab).toContainText('Dashboard')
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
    await context.close();
    await browser.close();
})