//Retrying assertions (toHaveText(), toBeVisible(), toHaveCount(), etc.) 
// are preferred for UI testing because web pages update asynchronously.

import { test, expect } from '@playwright/test';

test('Retrying Assertions Example', async ({ page }) => {

  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

  await page.getByLabel('Username:').fill('Tester');
  await page.getByLabel('Password:').fill('test');

  // Retrying Assertion #1
  await expect(page.getByLabel('Username:')).toHaveValue('Tester');

  // Retrying Assertion #2
  await expect(page.getByLabel('Password:')).toHaveValue('test');

  await page.getByRole('button', { name: 'Login' }).click();

  // Retrying Assertion #3
  ///Default\.aspx/
//This is a Regular Expression (Regex). It matches any URL containing:
/*The \. is important.

. in regex means any character.
\. means a literal dot (.)*/
  await expect(page).toHaveURL(/Default\.aspx/);

  // Retrying Assertion #4
  await expect(page.getByRole('link', { name: 'Order', exact: true })).toBeVisible();

  await page.getByRole('link', { name: 'Order', exact: true }).click();

  // Retrying Assertion #5
  //matches only the URL containing Process.aspx
  await expect(page).toHaveURL(/Process\.aspx/);

  await page.getByLabel('Product:*').selectOption('FamilyAlbum');

  // Retrying Assertion #6
  await expect(page.getByLabel('Product:*')).toHaveValue('FamilyAlbum');

  await page.getByLabel('Quantity:*').fill('5');

  // Retrying Assertion #7
  await expect(page.getByLabel('Quantity:*')).toHaveValue('5');

  await page.getByLabel('Customer name:*').fill('Dixit1');
  await page.getByLabel('Street:*').fill('BTM');
  await page.getByLabel('City:*').fill('Bangalore');
  await page.getByLabel('Zip:*').fill('560076');

  await page.getByLabel('Visa').check();

  // Retrying Assertion #8
  await expect(page.getByLabel('Visa')).toBeChecked();

  await page.getByLabel('Card Nr:*').fill('1234567891');
  await page.getByLabel('Expire date (mm/yy):*').fill('12/23');

  await page.getByRole('link', { name: 'Process' }).click();

  // Retrying Assertion #9
  await expect(page.getByText('New order has been successfully added.'))
      .toBeVisible();

  // Retrying Assertion #10
  await expect(page.getByText('New order has been successfully added.'))
      .toContainText('successfully added');

  await page.getByRole('link', { name: 'View all orders' }).click();

  // Retrying Assertion #11
  await expect(page.locator("//td[text()='Dixit1']"))
      .toHaveText('Dixit1');

  await page.getByRole('link', { name: 'Logout' }).click();

  // Retrying Assertion #12
  await expect(page).toHaveURL(/Login\.aspx/);
});