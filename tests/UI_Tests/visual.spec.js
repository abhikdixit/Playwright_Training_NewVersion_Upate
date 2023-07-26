const { test, expect } = require('@playwright/test');

test.describe.only('Visual Regression Testing Example', () => {
  
  test('Full Page Snapshot', async ({ page }) => {
    //await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?')
    await page.goto('https://demo.spreecommerce.org/')    
    expect(await page.screenshot()).toMatchSnapshot('homepage.png')
  })

  test('Single Element Snapshot', async ({ page }) => {
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?')
    const pageElement = await page.$('.button')
    expect(await pageElement.screenshot()).toMatchSnapshot('Button.png')
  })
})
