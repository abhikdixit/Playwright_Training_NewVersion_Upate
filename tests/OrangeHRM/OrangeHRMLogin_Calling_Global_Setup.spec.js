const { test, expect } = require('@playwright/test');

test('Should Logout from application', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('button', { name: ' Add' }).click();
    await page.locator('form i').first().click();
    await page.getByRole('option', { name: 'Admin' }).getByText('Admin').click();
    await page.locator('form i').nth(1).click();
    await page.getByText('Enabled').click();
    await page.getByPlaceholder('Type for hints...').click();
    await page.getByPlaceholder('Type for hints...').fill('Fio');
    await page.getByText('Fiona Grace').click();
    await page.getByRole('textbox').nth(2).click();
    //Add Random number to user name
    const ExpUserName = 'Abhi' + Math.random() * 1000;
    await page.getByRole('textbox').nth(2).fill(ExpUserName);
    await page.getByRole('textbox').nth(3).click();
    await page.getByRole('textbox').nth(3).fill('Admin@123');
    await page.getByRole('textbox').nth(4).click();
    await page.getByRole('textbox').nth(4).fill('Admin@123');
    await page.getByRole('button', { name: 'Save' }).click();
    //await page.waitForTimeout(2000)
    await page.waitForSelector("//i[@class='oxd-icon bi-plus oxd-button-icon']");
    //Verify that user got created
    await expect(page.locator("//div[text()='" + ExpUserName + "']")).toContainText(ExpUserName)

});