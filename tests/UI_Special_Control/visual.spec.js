const { test, expect } = require('@playwright/test');

test.describe('Visual Regression Testing Example', () => {
  
  test('Full Page Snapshot', async ({ page }) => {
    //await page.setViewportSize({ width: 780, height: 720 });
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.waitForTimeout(5000) 
    expect(await page.screenshot()).toMatchSnapshot('OrangeHRM_Login.png')
  })

  test('Single Element Snapshot', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.waitForTimeout(5000) 
    const pageElement = page.locator("//button[@type='submit']")
    expect(await pageElement.screenshot()).toMatchSnapshot('SubmitButton.png')
  })
})
