//import { test, expect } from require('@playwright/test');
const { test, expect } = require('@playwright/test');

test('Right Clieck', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/upload')
        await page.waitForLoadState()
        //Loading Image file
        const filepath = 'tests/TestData/Images/Abhi.jpg'
        console.log(filepath)
        await page.locator('#file-upload').setInputFiles(filepath)
        await page.locator('#file-submit').click()
        await page.waitForTimeout(5000)
        await expect(page.locator('#uploaded-files')).toContainText('Abhi.jpg')
    })
