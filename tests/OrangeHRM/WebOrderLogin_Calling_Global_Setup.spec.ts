import { test, expect } from '@playwright/test';

test('Create Order Unique Order - Verify Order @smoke', async ({ page }) => {
  // You are already logged in due to storageState
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Process.aspx');

  await page.getByRole('combobox', { name: 'Product:*' }).selectOption('FamilyAlbum');
  await page.getByLabel('Quantity:*').fill('5');

  const ExpUserName = 'Dixit' + Math.floor(Math.random() * 1000); // use floor for cleaner number

  await page.getByLabel('Customer name:*').fill(ExpUserName);
  await page.getByLabel('Street:*').fill('BTM');
  await page.getByLabel('City:*').fill('Bangalore');
  await page.getByLabel('Zip:*').fill('560076');
  await page.getByLabel('Visa').check();
  await page.getByLabel('Card Nr:*').fill('1234567891');
  await page.getByLabel('Expire date (mm/yy):*').fill('12/23');
  await page.getByRole('link', { name: 'Process' }).click();

  const neworder = page.locator("//strong[normalize-space()='New order has been successfully added.']");
  await expect(neworder).toContainText('New order has been successfully added.');

  await page.getByRole('link', { name: 'View all orders' }).click();
  await expect(page.locator(`//td[normalize-space()='${ExpUserName}']`)).toHaveText(ExpUserName);

  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page).toHaveURL(/.*Login.aspx/);
});
