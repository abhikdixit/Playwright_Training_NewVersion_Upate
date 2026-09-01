import { test, expect } from '@playwright/test';

test('OrangeHRM Loing Functionality testing ', async ({ page }) => {
    test.setTimeout(80000);
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    //await page.pause()
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin1234");
    await page.getByRole('button', {name : 'Login'}).click();
    //await page.waitForLoadState('networkidle');
    //await page.getByRole('link',{name : 'Admin'}).click();
    await expect(page.getByRole('heading', {name : 'Dashboard'})).toHaveText('Dashboard');

});