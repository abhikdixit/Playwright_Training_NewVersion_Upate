const { test, expect } = require('@playwright/test');
//Class in Java
test.describe('Group of Tests', () => {

    test.beforeEach(async ({ page }) => {
        //Login to OrangeHRM
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();
    });
    //Method in Java
    test('Go to Admin Page', async ({ page }) => {

        //Navigate to Admin and Click on Add User
        await page.getByRole('link', { name: 'Admin' }).click();
        await page.getByRole('button', { name: ' Add' }).click();

        //Enter all details and click on save button
        await page.locator('form i').first().click();
        await page.getByRole('option', { name: 'Admin' }).click();
        await page.locator('form i').nth(1).click();
        await page.getByRole('option', { name: 'Enabled' }).click();
        await page.getByPlaceholder('Type for hints...').click();
        await page.getByPlaceholder('Type for hints...').fill('Fi');
        await page.getByText('Fiona Grace').click();
        //Add Unique name using Random concept

        const ExpUserName = 'Abhi' + Math.random() * 100;
        await page.getByRole('textbox').nth(2).fill(ExpUserName);
        await page.getByRole('textbox').nth(3).fill('Admin@1234');
        await page.getByRole('textbox').nth(4).click();
        await page.getByRole('textbox').nth(4).fill('Admin@1234');
        await page.getByRole('button', { name: 'Save' }).click();
        await page.waitForTimeout(5000)
        //Verify that user got added to WebTable
        const ActName = page.locator("//div[text()='" + ExpUserName + "']")
        await expect(ActName).toHaveText(ExpUserName)

        // Update the User details and Verify user details got updated

        await page.locator("//div[text()='" + ExpUserName + "']/parent::div/following-sibling::div//button[2]/i").click();
        await page.locator('text=User Role-- Select -- >> i').click();
        await page.locator('div[role="option"]:has-text("ESS")').click();
        await page.waitForTimeout(1000)
        // Click text=Save
        await page.locator('text=Save').click();
        //Verify that Value got updated to ESS
        await page.waitForSelector("//button[@class='oxd-button oxd-button--medium oxd-button--secondary']");
        await expect(page.locator("//div[text()='" + ExpUserName + "']/parent::div/following-sibling::div/div").first()).toHaveText('ESS');

        // Delete the user and verify that user got deleted..

        
    });

    test.afterEach(async ({ page }) => {
        //Logout from Application
        await page.locator("//i[@class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']").click();
        await page.getByRole('menuitem', { name: 'Logout' }).click();
        await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        await expect(page).toHaveTitle("OrangeHRM")
        const Login = page.locator("//h5")
        await expect(Login).toHaveText("Login")
    });
});