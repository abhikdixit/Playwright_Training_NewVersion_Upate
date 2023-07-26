//import { test, expect } from require('@playwright/test');
const { test, expect } = require('@playwright/test');

test('Right Clieck', async ({ page }) => {
    //Visit the OrnageHRM Website
    await page.goto("http://swisnl.github.io/jQuery-contextMenu/demo.html");
    
   // Right Click on Button
    
    await page.click("//span[text()='right click me']",{ button: 'right'});
    await page.waitForTimeout(5000)
    await page.click('.context-menu-icon-edit > span')
    
});

