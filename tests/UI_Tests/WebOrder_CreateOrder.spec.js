//import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  await page.getByLabel('Username:').click();
  await page.getByLabel('Username:').fill('Tester');
  await page.getByLabel('Password:').click();
  await page.getByLabel('Password:').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Order', exact: true }).click();
  await page.getByLabel('Product:*').selectOption('FamilyAlbum');
  await page.getByText('Quantity:*').click();
  await page.getByLabel('Quantity:*').fill('05');
  await page.getByText('Quantity:*').click();
  await page.getByLabel('Customer name:*').click();
  await page.getByLabel('Customer name:*').fill('Dixit1');
  await page.getByLabel('Street:*').click();
  await page.getByLabel('Street:*').fill('ABC');
  await page.getByLabel('City:*').click();
  await page.getByLabel('City:*').fill('Bangalore');
  await page.getByLabel('Zip:*').click();
  await page.getByLabel('Zip:*').fill('560076');
  await page.getByLabel('Visa').check();
  await page.getByLabel('Card Nr:*').click();
  await page.getByLabel('Card Nr:*').fill('1234567891');
  await page.getByLabel('Expire date (mm/yy):*').click();
  await page.getByLabel('Expire date (mm/yy):*').fill('12/23');
  await page.getByRole('link', { name: 'Process' }).click();
  await expect(page.locator("//strong[normalize-space()='New order has been successfully added.']")).toHaveText("New order has been successfully added.")
  //await page.getByText('New order has been successfully added.').click();
  await page.getByRole('link', { name: 'View all orders', exact: true }).click();
  await expect(page.locator("//td[normalize-space()='Dixit1']")).toHaveText("Dixit1")
  await page.getByRole('link', { name: 'Logout' }).click();

});