//import { test, expect } from require('@playwright/test');
const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {

  // Go to https://the-internet.herokuapp.com/javascript_alerts
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  // Click text=Click for JS Alert
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.click('text=Click for JS Alert');
  await page.waitForTimeout(2000)
  // Click text=Click for JS Prompt
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.click('text=Click for JS Prompt');
  await page.waitForTimeout(2000)
  // Click text=You entered: Abhi
  //await page.click('text=You entered: Abhi');

});