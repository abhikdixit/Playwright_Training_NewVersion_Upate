const { test } = require('@playwright/test');
const { Login_LogoutPage } = require('./BaseTest');

test.describe('OrangeHRM tests', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new Login_LogoutPage(page);
        await loginPage.gotoURL();
        await loginPage.LoginToApp("Admin", "admin123");
    });

    test('Go to Admin Page', async ({ page }) => {

        //Navigate to Admin and Click on Add User
        await page.getByRole('link', { name: 'Admin' }).click();
        await page.getByRole('button', { name: ' Add' }).click();
     
    });

    
    test.afterEach(async ({ page }) => {
        //Logout from Application
        await loginPage.LogoutFromApp();
    });
});