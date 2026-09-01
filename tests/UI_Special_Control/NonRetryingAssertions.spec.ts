//Non-retrying assertions (expect(value).toBe(), expect(await locator.textContent()).toBe())
//  are best for validating values that are already stable or for pure JavaScript 
// logic where waiting is unnecessary.

import { test, expect } from '@playwright/test';

test('Non-Retrying Assertions Example', async ({ page }) => {

  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

  await page.getByLabel('Username:').fill('Tester');
  await page.getByLabel('Password:').fill('test');

  // Non-Retrying Assertion #1
  expect(await page.getByLabel('Username:').inputValue()).toBe('Tester');

  // Non-Retrying Assertion #2
  expect(await page.getByLabel('Password:').inputValue()).toBe('test');

  await page.getByRole('button', { name: 'Login' }).click();

  // Non-Retrying Assertion #3
  expect(page.url()).toContain('Default.aspx');

  await page.getByRole('link', { name: 'Order', exact: true }).click();

  // Non-Retrying Assertion #4
  expect(page.url()).toContain('Process.aspx');

  await page.getByLabel('Product:*').selectOption('FamilyAlbum');

  // Non-Retrying Assertion #5
  expect(await page.getByLabel('Product:*').inputValue()).toBe('FamilyAlbum');

  await page.getByLabel('Quantity:*').fill('5');

  // Non-Retrying Assertion #6
  expect(await page.getByLabel('Quantity:*').inputValue()).toBe('5');

  await page.getByLabel('Customer name:*').fill('Dixit1');
  await page.getByLabel('Street:*').fill('BTM');
  await page.getByLabel('City:*').fill('Bangalore');
  await page.getByLabel('Zip:*').fill('560076');

  await page.getByLabel('Visa').check();

  // Non-Retrying Assertion #7
  expect(await page.getByLabel('Visa').isChecked()).toBe(true);

  await page.getByLabel('Card Nr:*').fill('1234567891');
  await page.getByLabel('Expire date (mm/yy):*').fill('12/23');

  await page.getByRole('link', { name: 'Process' }).click();

  const successMessage = await page
      .getByText('New order has been successfully added.')
      .textContent();

  // Non-Retrying Assertion #8
  expect(successMessage).toContain('successfully added');

  await page.getByRole('link', { name: 'View all orders' }).click();

  const customer = await page.locator("//td[text()='Dixit1']").textContent();

  // Non-Retrying Assertion #9
  expect(customer).toBe('Dixit1');

  await page.getByRole('link', { name: 'Logout' }).click();

  // Non-Retrying Assertion #10
  expect(page.url()).toContain('Login.aspx');
});