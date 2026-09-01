import { test, expect } from '@playwright/test';

const loginUrl = 'http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx';

test('Create a new WebOrder and verify it appears in the order list', async ({ page }) => {
  await page.goto(loginUrl);

  await expect(page).toHaveURL(/Login\.aspx/);
  await expect(page.getByRole('heading', { name: 'Web Orders Login' })).toBeVisible();

  await page.getByLabel('Username:').fill('Tester');
  await page.getByLabel('Password:').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/Default\.aspx/);
  await expect(page.getByRole('heading', { name: 'Web Orders' })).toBeVisible();

  await page.getByRole('link', { name: 'Order' }).click();
  await expect(page.getByRole('heading', { name: 'Order' })).toBeVisible();
  await expect(page).toHaveURL(/Process\.aspx/);

  await page.locator('#ctl00_MainContent_fmwOrder_ddlProduct').selectOption({ label: 'FamilyAlbum' });
  await page.locator('#ctl00_MainContent_fmwOrder_txtQuantity').fill('5');
  await page.locator('input[value="Calculate"]').click();

  const expectedUserName = `Dixit${Date.now()}`;
  await page.locator('#ctl00_MainContent_fmwOrder_txtName').fill(expectedUserName);
  await page.locator('#ctl00_MainContent_fmwOrder_TextBox2').fill('BTM');
  await page.locator('#ctl00_MainContent_fmwOrder_TextBox3').fill('Bangalore');
  await page.locator('#ctl00_MainContent_fmwOrder_TextBox4').fill('560076');
  await page.locator('#ctl00_MainContent_fmwOrder_cardList_0').check();
  await page.locator('#ctl00_MainContent_fmwOrder_TextBox6').fill('1234567891');
  await page.locator('#ctl00_MainContent_fmwOrder_TextBox1').fill('12/23');

  await page.locator('#ctl00_MainContent_fmwOrder_InsertButton').click();

  await expect(page.getByText('New order has been successfully added.')).toBeVisible();

  await page.getByRole('link', { name: 'View all orders' }).click();
  const customerCell = page.locator(`//td[text()="${expectedUserName}"]`);
  await expect(customerCell).toBeVisible();
  await expect(customerCell).toHaveText(expectedUserName);

  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page).toHaveURL(/Login\.aspx/);
});
