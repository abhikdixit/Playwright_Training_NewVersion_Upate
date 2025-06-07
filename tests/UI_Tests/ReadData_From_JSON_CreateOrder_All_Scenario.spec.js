const fs = require('fs');
const { test, expect } = require('@playwright/test');

// Reads the JSON file and saves it  
let objects = fs.readFileSync('./tests/TestData/create_order_All_Scenario.json')
const orders = JSON.parse(objects);

test("Create Order - All Scenario", async ({ page }) => {

    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
    await page.getByLabel('Username:').click();
    await page.getByLabel('Username:').fill('Tester');
    await page.getByLabel('Password:').click();
    await page.getByLabel('Password:').fill('test');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');


    //Login ends------------ 

    await page.getByRole('link', { name: 'Order' }).nth(1).click();
    //Verify that user has clicked on Order Link
    await page.url().includes('/Process.aspx')

    //Order Starts-------------
    for (const order of orders) {
       // for(var i = 0; i < orders.length; i++) {

        await page.locator("//input[@value='Reset']").click()
        if (order.Product !== "")
            await page.locator('#ctl00_MainContent_fmwOrder_ddlProduct').selectOption(order.Product)
        if (order.Quantity !== "")
            await page.locator('#ctl00_MainContent_fmwOrder_txtQuantity').fill(order.Quantity)
        if (order.Customer !== "")
            await page.locator('#ctl00_MainContent_fmwOrder_txtName').fill(order.Customer)
        if (order.Street !== "")
            await page.locator('#ctl00_MainContent_fmwOrder_TextBox2').fill(order.Street)
        if (order.City !== "")
            await page.locator('#ctl00_MainContent_fmwOrder_TextBox3').fill(order.City)
        if (order.Zip !== "")
            await page.locator('#ctl00_MainContent_fmwOrder_TextBox5').fill(order.Zip)
        if (order.Card !== "")
            page.locator('#ctl00_MainContent_fmwOrder_TextBox6').fill(order.Card)
            await page.locator('#ctl00_MainContent_fmwOrder_cardList_1').click()
        if (order.Expire !== "")
            await page.locator('#ctl00_MainContent_fmwOrder_TextBox1').fill(order.Expire)
        await page.locator('#ctl00_MainContent_fmwOrder_InsertButton').click()

        if (order.Result === " New order has been successfully added. ") {
            //page.locator("//strong[normalize-space()='New order has been successfully added.']").should("have.text",order.Result)
            //const Dashboard = page.locator("//h6[text()='Dashboard']")
            //await expect(Dashboard).toHaveText(record.exp_result)
            await expect(page.locator("//strong[normalize-space()='New order has been successfully added.']")).toHaveText("New order has been successfully added.")
        }
        else if (order.Result === "  Quantity must be greater than zero. ") {
            await expect(page.locator("span[id='ctl00_MainContent_fmwOrder_RequiredFieldValidator1'] em:nth-child(1)")).toHaveText(order.Result)
        }
        else if (order.Result === "Field 'Customer name' cannot be empty.") {
            await expect(page.locator("#ctl00_MainContent_fmwOrder_RequiredFieldValidator2")).toHaveText(order.Result)
        }
        else if (order.Result === "Field 'Street' cannot be empty.") {
            await expect(page.locator("#ctl00_MainContent_fmwOrder_RequiredFieldValidator3")).toHaveText(order.Result)
        }
        else if (order.Result === "Field 'Street' cannot be empty.") {
            await expect(page.locator("#ctl00_MainContent_fmwOrder_RequiredFieldValidator4")).toHaveText(order.Result)
        }
        else if (order.Result === "Field 'Zip' cannot be empty.") {
            await expect(page.locator("#ctl00_MainContent_fmwOrder_RequiredFieldValidator5")).toHaveText(order.Result)
        }
        else if (order.Result === "Field 'Card Nr' cannot be empty.") {
            await expect(page.locator("#ctl00_MainContent_fmwOrder_RequiredFieldValidator6")).toHaveText(order.Result)
        }
        else if (order.Result === "Field 'Expire date' cannot be empty") {
            await expect(page.locator("#ctl00_MainContent_fmwOrder_RequiredFieldValidator7")).toHaveText(order.Result)
        }
    }
    //logout verification
    await page.getByRole('link', { name: 'Logout' }).click();
    const login = page.locator('#ctl00_MainContent_login_button');
    await expect(login).toBeVisible();
})