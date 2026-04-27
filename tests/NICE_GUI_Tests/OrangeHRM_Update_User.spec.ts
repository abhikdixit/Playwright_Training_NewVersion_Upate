import { test, expect } from '@playwright/test';

test('OrangeHRM Update User and Verify Changes @smoke', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').click();
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    //Create Order
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('button', { name: ' Add' }).click();
    await page.locator('form i').first().click();
    await page.getByRole('option', { name: 'Admin' }).getByText('Admin').click();
    await page.locator('form i').nth(1).click();
    await page.getByText('Enabled').click();
    await page.getByRole('textbox', { name: 'Type for hints...' }).click();
    await page.getByRole('textbox', { name: 'Type for hints...' }).fill('a');
    await page.waitForTimeout(5000);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
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
    // Update the user and Verify that user got updated in application
    await page.locator("//div[text()='" + ExpUserName + "']/parent::div/following-sibling::div//i[@class='oxd-icon bi-pencil-fill']").click();
    await page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first().click();
    await page.getByText('ESS').click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator("//div[text()='" + ExpUserName + "']/parent::div/following-sibling::div/div[text()='ESS']")).toContainText('ESS');
    //Logout from the application
    await page.getByRole('img', { name: 'profile picture' }).click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
});