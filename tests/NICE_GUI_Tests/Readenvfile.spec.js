// Include playwright module
const {test, expect} = require('@playwright/test');

// Write a test
test('Read Env File in playwright', async({page}) =>{
    // Go to URL
    await page.goto(process.env.URL_WebOrder);

    await page.getByLabel('Username:').fill(process.env.USER_NAME);
    // await page.pause()
     await page.getByLabel('Password:').fill(process.env.PASSWORD);
     await page.getByRole('button', { name: 'Login' }).click();
     //Verify user has logged in
     await expect(page.getByRole('link', { name: 'View all orders' })).toHaveText("View all orders")
     await page.getByRole('link', { name: 'Logout' }).click();

    console.log("Username is : "+process.env.USER_NAME);
    console.log("Password is : "+process.env.PASSWORD);

    // await page.waitForTimeout(5000);

})

    