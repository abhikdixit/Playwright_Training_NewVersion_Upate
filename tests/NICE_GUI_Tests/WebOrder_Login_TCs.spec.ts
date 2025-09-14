import { test, expect } from '@playwright/test';


test('WebOrder Login - Valid User', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  await page.getByLabel('Username:').fill('Tester');
 // await page.pause()
  await page.getByLabel('Password:').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  //Verify user has logged in
  await expect(page.getByRole('link', { name: 'View all orders' })).toHaveText("View all orders")
  //await page.getByRole('link', { name: 'Logout' }).click();
  //await expect(page.getByRole('button', { name: 'Login' })).toHaveValue("Login")
});

test('WebOrder Login - Invalid User', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  await page.getByLabel('Username:').fill('Tester');
 // await page.pause()
  await page.getByLabel('Password:').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  //Verify user has logged in
  await expect(page.getByRole('link', { name: 'View all orders' })).toHaveText("View all orders")
  //await page.getByRole('link', { name: 'Logout' }).click();
  //await expect(page.getByRole('button', { name: 'Login' })).toHaveValue("Login")
});

test('WebOrder Login - Invalid Password', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  await page.getByLabel('Username:').fill('Tester');
 // await page.pause()
  await page.getByLabel('Password:').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  //Verify user has logged in
  await expect(page.getByRole('link', { name: 'View all orders' })).toHaveText("View all orders")
  //await page.getByRole('link', { name: 'Logout' }).click();
  //await expect(page.getByRole('button', { name: 'Login' })).toHaveValue("Login")
});

test('WebOrder Login - Balnk User', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  await page.getByLabel('Username:').fill('Tester');
 // await page.pause()
  await page.getByLabel('Password:').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  //Verify user has logged in
  await expect(page.getByRole('link', { name: 'View all orders' })).toHaveText("View all orders")
  //await page.getByRole('link', { name: 'Logout' }).click();
  //await expect(page.getByRole('button', { name: 'Login' })).toHaveValue("Login")
});

test('WebOrder Login - Balnk Password', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  await page.getByLabel('Username:').fill('Tester');
 // await page.pause()
  await page.getByLabel('Password:').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  //Verify user has logged in
  await expect(page.getByRole('link', { name: 'View all orders' })).toHaveText("View all orders")
  //await page.getByRole('link', { name: 'Logout' }).click();
  //await expect(page.getByRole('button', { name: 'Login' })).toHaveValue("Login")
});