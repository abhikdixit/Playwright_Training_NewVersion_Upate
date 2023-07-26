const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').click();
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
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
    //Edit User and Verfiy user details got updated
    //Click on Edit of Added user and Update the Role to ESS from Admin and Verify that it got updated
    await page.locator("//div[text()='" + ExpUserName + "']/parent::div/following-sibling::div//button[2]/i").click();
    // Click text=User Role-- Select -- >> i
    await page.locator('text=User Role-- Select -- >> i').click();
    await page.locator('div[role="option"]:has-text("ESS")').click();
    await page.waitForTimeout(1000)
    await page.locator('text=Save').click();
    await page.waitForSelector("//i[@class='oxd-icon bi-plus oxd-button-icon']");
    await expect(page.locator("//div[text()='"+ExpUserName+"']/parent::div/following-sibling::div/div").first()).toHaveText('ESS');
    // Delete the user and Verify that user got deleted from application
    await page.locator("//div[text()='" + ExpUserName + "']/parent::div/following-sibling::div//button[1]/i").click();
    await page.locator("//i[@class='oxd-icon bi-trash oxd-button-icon']").click()
    await page.waitForSelector("//i[@class='oxd-icon bi-plus oxd-button-icon']");
    //Identify the WebTable section using container option
    const locator = page.locator("//div[@class='orangehrm-container']");
    await expect(locator).not.toContainText(ExpUserName);
    //Logout from the application
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
    await page.locator("//i[@class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']").click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
});