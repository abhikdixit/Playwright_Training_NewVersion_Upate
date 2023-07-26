const { test, expect } = require('@playwright/test');
const fs = require('fs');

test('Navigate All Links', async ({ page }) => {

  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.waitForTimeout(9000)
  const linksonpage = await page.$$('//a')
  console.log(linksonpage.length)
  
  var return_href
  for await (const tabledata of linksonpage)
  {
    //await page.waitForTimeout(5000)
    return_href = await tabledata.getAttribute("href");
    
    // Check if its having http:// or not in returned href
  if (return_href.substring(0, 7) == 'http://')
    console.log('Link having http attached = ' +return_href)
    //await page.goto(return_href)
  }

});