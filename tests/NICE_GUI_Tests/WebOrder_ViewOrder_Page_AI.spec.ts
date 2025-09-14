const { test, expect } = require('@playwright/test');

test.describe('Web Orders View All Orders Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the login page
        await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
        
        // Login with credentials
        await page.fill('#ctl00_MainContent_username', 'Tester');
        await page.fill('#ctl00_MainContent_password', 'test');
        await page.click('#ctl00_MainContent_login_button');
    });

    test('Verify Check All and Uncheck All functionality', async ({ page }) => {
        // Verify we're on the View All Orders page
        await expect(page).toHaveTitle('Web Orders');

        // Click Check All button
        await page.click('#ctl00_MainContent_btnCheckAll');
        
        // Verify all checkboxes are checked
        const checkboxes = await page.locator('input[type="checkbox"]').all();
        for (const checkbox of checkboxes) {
            await expect(checkbox).toBeChecked();
        }

        // Click Uncheck All button
        await page.click('#ctl00_MainContent_btnUncheckAll');
        
        // Verify all checkboxes are unchecked
        for (const checkbox of checkboxes) {
            await expect(checkbox).not.toBeChecked();
        }
    });
});
