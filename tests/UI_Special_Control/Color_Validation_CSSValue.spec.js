import { chromium, expect, test } from "@playwright/test";
// Here you need to convert HEX(hexadecimal format for identifying colors) to RGB color
//https://www.rgbtohex.net/hex-to-rgb/
test.use({ viewport: { width: 1400, height: 1000 } });
test("Launch the Selectors hub test page", async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://selectorshub.com/xpath-practice-page/");
  await page.waitForSelector(".dropbtn", {state: "visible"})

  // we want to mask this locator
  const btn = await page.locator(".dropbtn");
  //await expect(btn).toHaveCSS('background-color','#4CAF50'); // it will fail
  //await expect(btn).toHaveCSS('background-color','rgb(76,175,80)'); // it will also fail due to spaces
  await expect(btn).toHaveCSS('background-color','rgb(76, 175, 80)');
  await page.waitForTimeout(2000);
  await page.close();
  
  
});

test.only("Launch the OrangeHRM Page", async () => {
    const browser = await chromium.launch({
      headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();
  
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.waitForLoadState("//button[normalize-space()='Login']", {state: "visible"})
  
    // we want to mask this locator
    const btn = await page.locator("//button[normalize-space()='Login']");
    //await expect(btn).toHaveCSS('background-color','#4CAF50'); // it will fail
    //await expect(btn).toHaveCSS('background-color','rgb(76,175,80)'); // it will also fail due to spaces
    await expect(btn).toHaveCSS('background-color','rgb(255, 123, 29)');
    await page.waitForTimeout(2000);
    await page.close();
    
    
  });