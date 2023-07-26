const { test, expect } = require('@playwright/test');

test('verify multiple tabs', async({context})=>{
  const page = await context.newPage();
  await page.goto("https://www.programsbuzz.com/")

  const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      // This action triggers the new tab
      page.locator('text=By iVagus Services Pvt. Ltd.').click() 
    ])
         
    // title of new tab page
    console.log(await newPage.title());
    // title of existing page
    console.log(await page.title());
  
})