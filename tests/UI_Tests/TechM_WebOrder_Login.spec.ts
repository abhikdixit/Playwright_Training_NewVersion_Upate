import { test, expect } from '@playwright/test';

test('To test with valid credentials', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  await page.getByRole('textbox', { name: 'Username:' }).click();
  await page.getByRole('textbox', { name: 'Username:' }).fill('Tester');
  await page.getByRole('textbox', { name: 'Password:' }).click();
  await page.getByRole('textbox', { name: 'Password:' }).fill('test');
  //await page.pause();
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator("//h2[normalize-space()='List of All Orders']")).toContainText('List of All Orders');
  // Create Order

  await page.getByRole('link', { name: 'Order', exact: true }).click();
  await page.getByLabel('Product:*').selectOption('FamilyAlbum');
  await page.getByRole('textbox', { name: 'Quantity:*' }).click();
  await page.getByRole('textbox', { name: 'Quantity:*' }).fill('5');
  await page.getByRole('textbox', { name: 'Customer name:*' }).click();
  await page.getByRole('textbox', { name: 'Customer name:*' }).fill('Abhi');
  await page.getByRole('textbox', { name: 'Street:*' }).click();
  await page.getByRole('textbox', { name: 'Street:*' }).fill('abc');
  await page.getByRole('textbox', { name: 'City:*' }).click();
  await page.getByRole('textbox', { name: 'City:*' }).fill('Bangalore');
  await page.getByRole('textbox', { name: 'Zip:*' }).click();
  await page.getByRole('textbox', { name: 'Zip:*' }).fill('560076');
  await page.getByRole('radio', { name: 'Visa' }).check();
  await page.getByRole('textbox', { name: 'Card Nr:*' }).click();
  await page.getByRole('textbox', { name: 'Card Nr:*' }).fill('123456789');
  await page.getByRole('textbox', { name: 'Expire date (mm/yy):*' }).click();
  await page.getByRole('textbox', { name: 'Expire date (mm/yy):*' }).fill('12/25');
  await page.getByRole('textbox', { name: 'Expire date (mm/yy):*' }).press('Tab');
  await page.getByRole('link', { name: 'Process' }).click();
  await expect(page.getByRole('strong')).toContainText('New order has been successfully added.');
  await page.getByRole('link', { name: 'View all orders' }).click();
  await expect(page.locator('#ctl00_MainContent_orderGrid')).toContainText('Abhi');
// Logout
  await expect(page.locator('h2')).toContainText('List of All Orders');
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});