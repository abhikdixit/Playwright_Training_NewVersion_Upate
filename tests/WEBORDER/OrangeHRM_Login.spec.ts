// create test for search store auto suggestion and select Simple Computer from given search for given https://demowebshop.tricentis.com/
import { test, expect } from '@playwright/test';

test('OrangeHRM Login', async ({ page }) => {
    
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Fill in the username and password fields
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    // Click the login button
    await page.getByRole('button', { name: 'Login' }).click();
    // Verify that the dashboard page is loaded by checking for a specific element
    await expect(page.locator('h6:has-text("Dashboard")')).toBeVisible();
    // Go to Admin page and click on Add button
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('button', { name: 'Add' }).click();
    //Verify that the Add User form is displayed
    await expect(page.locator('h6:has-text("Add User")')).toBeVisible();
})