import { chromium, expect, test } from "@playwright/test";
test.only("Launch the OrangeHRM Page", async () => {
    const browser = await chromium.launch({
      headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();
  
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.waitForSelector("//button[normalize-space()='Login']", {state: "visible"})
  
    const btn = await page.locator("//button[normalize-space()='Login']");
    //await expect(btn).toHaveCSS('background-color','#4CAF50'); // it will fail
    //await expect(btn).toHaveCSS('background-color','rgb(76,175,80)'); // it will also fail due to spaces
    await expect(btn).toHaveCSS('background-color','rgb(255, 123, 29)');
    await page.waitForTimeout(2000);

    //In JS, there is a method called window.getComputedStyle to fetch the 
    //computed styles for an element. So using this we can fetch the property
    // value and then compare with the expected value. So we know that the computed
    // value is rgb(76, 175, 80)
    const color = await btn.evaluate((element) =>
        window.getComputedStyle(element).getPropertyValue("background-color")
      );
    
      await console.log(`${color}`);
    
      await expect(btn).toHaveCSS('background-color',color);
    
      // validate font-size
    
      //const text = await page.locator("a[href='https://www.youtube.com/c/SelectorsHub?sub_confirmation=1'%5D >> nth=0");
      const btnprop = await btn.evaluate((element) =>
        window.getComputedStyle(element).getPropertyValue("font-size")
      );
    
      await console.log(`${btnprop}`);
    
    await expect(btn).toHaveCSS('font-size',btnprop);
       
    await page.close();
        
  });