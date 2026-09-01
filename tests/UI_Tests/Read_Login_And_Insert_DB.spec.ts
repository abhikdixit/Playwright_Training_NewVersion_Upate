import { test, expect } from '@playwright/test';
import * as db from './database';

test('Read Login Details from Application and Store into Database', async ({ page }) => {

    await page.goto(
        'http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx'
    );
    await page.locator('#ctl00_MainContent_username').fill('Tester');
    await page.locator('#ctl00_MainContent_password').fill('test');

    // Read Username from UI
    const username = await page.locator('#ctl00_MainContent_username').inputValue();

    // Read Password from UI
    const password = await page.locator('#ctl00_MainContent_password').inputValue();

    console.log("Username :", username);
    console.log("Password :", password);

    // Insert into Database
    await db.insert("login", {
        uname: username,
        pass: password
    });

    console.log("Record inserted successfully.");

    // Verify inserted record
    const users = await db.query<any[]>(
        "SELECT * FROM login WHERE uname=?",
        [username]
    );

    console.log(users);

    expect(users.length).toBeGreaterThan(0);

});