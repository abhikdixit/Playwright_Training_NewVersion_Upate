const { test, expect }=require('@playwright/test');

test('Login->Create Order->Logout', async ({ page }) => {
  
  await test.step('Log in to WebOrder Application', async () => {
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
    await page.getByLabel('Username:').fill('Tester');
    await page.getByLabel('Password:').fill('test');
    await page.getByRole('button', { name: 'Login' }).click();

 await test.step('Create Order', async () => {

    await page.getByRole('link', { name: 'Order', exact: true }).click();
    await page.getByRole('combobox', { name: 'Product:*' }).selectOption('ScreenSaver');
    await page.getByText('Quantity:*').click();
    await page.getByLabel('Quantity:*').fill('5');
    await page.getByLabel('Customer name:*').click();
    await page.getByLabel('Customer name:*').fill('Abhi');
    await page.getByLabel('Street:*').click();
    await page.getByLabel('Street:*').fill('ABC');
    await page.getByLabel('City:*').click();
    await page.getByLabel('City:*').fill('Bangalore');
    await page.getByLabel('Zip:*').click();
    await page.getByLabel('Zip:*').fill('560076');
    await page.getByLabel('Visa').check();
    await page.getByLabel('Card Nr:*').click();
    await page.getByLabel('Card Nr:*').fill('123456789');
    await page.getByLabel('Expire date (mm/yy):*').click();
    await page.getByLabel('Expire date (mm/yy):*').fill('12/23');
    await page.getByRole('link', { name: 'Process' }).click();
    await expect(page.locator('#ctl00_MainContent_fmwOrder > tbody > tr > td > div > strong')).toContainText('New order has been successfully added')
  //await page.getByRole('link', { name: 'Logout' }).click();
  //await expect(page).toHaveURL('/samples/TestComplete11/WebOrders/Login.aspx')


await test.step('Logout', async () => {

  await page.getByRole('link', { name: 'Logout' }).click();
  //await expect(page).toHaveURL('/samples/TestComplete11/WebOrders/Login.aspx')
});
});
});
});