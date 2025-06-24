const { test, expect } = require('@playwright/test');
const loginData = require('../../TestData/WebOrder_Login_AI.json');

let userName;
let context, browser, page;

test.describe('WebOrder Delete Order Tests', () => {
    test.beforeAll(async ({ browser: browserInstance }) => {
        browser = browserInstance;
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
        await page.fill('input[name="ctl00$MainContent$username"]', loginData.username);
        await page.fill('input[name="ctl00$MainContent$password"]', loginData.password);
        await page.click('input[name="ctl00$MainContent$login_button"]');
    });

    test('Create, Update and Delete Order', async () => {
        // Create Order
        // Fix: Use a more specific locator to avoid strict mode violation
        await page.locator('a[href="Process.aspx"]').click();
        await page.waitForLoadState('networkidle');
        const productDropdown = page.locator('select[name="ctl00$MainContent$fmwOrder$ddlProduct"]');
        await expect(productDropdown).toBeVisible();
        await expect(productDropdown).toBeEnabled();
        await productDropdown.selectOption({ label: 'FamilyAlbum' });
        await page.fill('input[name="ctl00$MainContent$fmwOrder$txtQuantity"]', '5');
        userName = `Dixit${Math.floor(Math.random() * 1000)}`;
        await page.fill('input[name="ctl00$MainContent$fmwOrder$txtName"]', userName);
        await page.fill('input[name="ctl00$MainContent$fmwOrder$TextBox2"]', 'ABC');
        await page.fill('input[name="ctl00$MainContent$fmwOrder$TextBox3"]', 'Redwood');
        await page.fill('input[name="ctl00$MainContent$fmwOrder$TextBox5"]', '5');
        await page.click('#ctl00_MainContent_fmwOrder_cardList_1');
        await page.fill('input[name="ctl00$MainContent$fmwOrder$TextBox6"]', '123456789');
        await page.fill('input[name="ctl00$MainContent$fmwOrder$TextBox1"]', '12/23');
        await page.click('#ctl00_MainContent_fmwOrder_InsertButton');
        await expect(page.locator('strong')).toHaveText('New order has been successfully added.');
        await page.getByRole('link', { name: 'View all orders' }).click();
        await expect(page.locator(`td:text("${userName}")`)).toBeVisible();

        // Update Order
        await page.locator(`//td[text()='${userName}']//following-sibling::td/input`).click();
        await expect(page.locator('h2')).toHaveText('Edit Order');
        await page.fill('input[name="ctl00$MainContent$fmwOrder$TextBox4"]', 'CA');
        await page.click('#ctl00_MainContent_fmwOrder_UpdateButton');
        await expect(page.locator(`//td[text()='${userName}']//following-sibling::td[text()='CA']`)).toBeVisible();

        // Delete Order
        await page.getByRole('link', { name: 'View all orders' }).click();
        await page.locator(`//td[text()='${userName}']//preceding-sibling::td/input`).click();
        await page.click('input[name="ctl00$MainContent$btnDelete"]');
        const pageContent = await page.content();
        expect(pageContent.includes(userName)).toBeFalsy();

        // Always return to orders page at the end
        await page.getByRole('link', { name: 'View all orders' }).click();
    });

    test.afterAll(async () => {
        await page.getByRole('link', { name: 'Logout' }).click();
        await context.close();
        await browser.close();
    });
});
