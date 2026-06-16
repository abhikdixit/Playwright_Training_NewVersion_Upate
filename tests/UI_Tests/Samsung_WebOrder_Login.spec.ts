import { test, expect } from '@playwright/test';

test('WebOrder Login with Valid Credentials', async ({ page }) => {

    await page.goto("http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx")
    await page.getByLabel('Username:').fill('Tester')
    await page.getByLabel('Password:').fill('test')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.getByRole('heading', { name: 'List of All Orders' })).toHaveText('List of All Orders')
    // Create Order

    await page.getByRole('link', { name: 'Order', exact: true }).click();
  await page.getByLabel('Product:*').selectOption('FamilyAlbum');
  await page.getByRole('textbox', { name: 'Quantity:*' }).click();
  await page.getByRole('textbox', { name: 'Quantity:*' }).fill('5');
  await page.getByRole('textbox', { name: 'Customer name:*' }).click();
  await page.getByRole('textbox', { name: 'Customer name:*' }).fill('Abhi1');
  await page.getByRole('textbox', { name: 'Street:*' }).click();
  await page.getByRole('textbox', { name: 'Street:*' }).fill('BTM');
  await page.getByRole('textbox', { name: 'City:*' }).click();
  await page.getByRole('textbox', { name: 'City:*' }).fill('Bangalore');
  await page.getByRole('textbox', { name: 'Zip:*' }).click();
  await page.getByRole('textbox', { name: 'Zip:*' }).fill('560076');
  await page.getByRole('radio', { name: 'Visa' }).check();
  await page.getByRole('textbox', { name: 'Card Nr:*' }).click();
  await page.getByRole('textbox', { name: 'Card Nr:*' }).fill('123456789');
  await page.getByRole('textbox', { name: 'Expire date (mm/yy):*' }).click();
  await page.getByRole('textbox', { name: 'Expire date (mm/yy):*' }).fill('12/26');
  await page.getByRole('link', { name: 'Process' }).click();
  await expect(page.getByRole('strong')).toContainText('New order has been successfully added.');
  await page.getByRole('link', { name: 'View all orders' }).click();
  await expect(page.locator('#ctl00_MainContent_orderGrid')).toContainText('Abhi1');

});