const { test, expect,Page }=require('@playwright/test');

//Describe is like group of test or in java language its like class
test.describe('Login->Create Order->Logout', async () => {

  let page = Page;
  //test.beforeAll('Log in to WebOrder Application', async ({browser}) => {
    test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
    await page.getByLabel('Username:').fill('Tester');
    await page.getByLabel('Password:').fill('test');
    await page.getByRole('button', { name: 'Login' }).click();
  });
 test('Create Order', async () => {

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
    await page.getByRole('link', { name: 'Process1' }).click();
    await expect(page.locator('#ctl00_MainContent_fmwOrder > tbody > tr > td > div > strong')).toContainText('New order has been successfully added')

});

test('Verify Order', async () => {
  await page.locator("//a[normalize-space()='View all products']").click();
  await expect(page.locator("//h2[normalize-space()='List of Products']")).toContainText('List of Products')

});
test.afterAll(async () => {

  await page.getByRole('link', { name: 'Logout' }).click();
  

});
});
