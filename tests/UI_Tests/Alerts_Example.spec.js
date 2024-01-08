//import { test, expect } from require('@playwright/test');
const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {

  // Go to https://the-internet.herokuapp.com/javascript_alerts
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');


  await page.click('text=Click for JS Alert');
  await page.waitForTimeout(2000)
  // Click text=Click for JS Alert
  page.on('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => { });
  });
  // Click text=Click for JS Prompt
  page.on('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => { });
  });
  await page.click('text=Click for JS Confirm');
  await page.waitForTimeout(2000)
  //page.on('dialog', dialog => dialog.accept());
  //await page.click('text=Click for JS Prompt');
  //await page.waitForTimeout(2000)
  //await page.fill("Abhi")
  //Click text=You entered: Abhi
  //await page.click('text=You entered: Abhi');

});