import { test } from '@playwright/test';
import { Login_LogoutPage } from './BaseTest.js';
//import { expect } from 'chai';

test.describe('WebOrder E2E Test tests @sanity', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new Login_LogoutPage(page);
        await loginPage.gotoURL();
        await loginPage.LoginToApp("Tester", "test");
        await loginPage.verifyURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');
        });

    test('Go to Order Page', async ({ page }) => {
        await page.getByRole('link', { name: 'Order' }).nth(1).click();
    
    });

    test('Go to View All Order Page', async ({ page }) => {
        await page.getByRole('link', { name: 'View all orders' }).click();
     
    });
    
    test.afterEach(async ({ page }) => {
        //Logout from Application
        await loginPage.LogoutFromApp();
    });
});