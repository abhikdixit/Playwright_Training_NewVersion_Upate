//const { chromium } = require("@playwright/test");
const { browser, expect , chromium, page }= require('@playwright/test')
async function globalSetup()
{
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
    //await page.getByLabel('Username:').click();
    await page.getByLabel('Username:').fill('Tester');
    //await page.getByLabel('Password:').click();
    await page.getByLabel('Password:').fill('test');
    await page.getByRole('button', { name: 'Login' }).click();
    //save the state of the webpage
    await page.context().storageState({path:"./LoginAuth.json"});

    await page.close();
}

export default globalSetup;