// global-setup.js

const { chromium } = require('@playwright/test');

module.exports = async config => {

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').click();
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Save signed-in state to 'storageState.json'.

    await page.context().storageState({ path: './tests/OrangeHRM/storageState.json' });

    //await browser.close();

};