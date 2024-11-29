// @ts-check
const { test, expect } = require('@playwright/test');

//import { test, expect } from '@playwright/test';

test('Weborder Login Functionality @sanity', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  //Verify Response time
  const navigationTimingJson = await page.evaluate(() =>
    JSON.stringify(performance.getEntriesByType('navigation'))
  )
  const navigationTiming = JSON.parse(navigationTimingJson)

  console.log(navigationTiming)

});