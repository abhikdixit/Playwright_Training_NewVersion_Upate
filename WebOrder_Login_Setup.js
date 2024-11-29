// global-setup.js

const { chromium } = require('@playwright/test');

module.exports = async config => {

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
    await page.getByLabel('Username:').fill('Tester');
 // await page.pause()
    await page.getByLabel('Password:').fill('test');
    await page.getByRole('button', { name: 'Login' }).click();

    // Save signed-in state to 'storageState.json'.

    await page.context().storageState({ path: './tests/OrangeHRM/WebOrderState.json' });

    //await browser.close();

};