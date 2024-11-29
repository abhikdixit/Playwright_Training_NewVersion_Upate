const { test, expect } = require('@playwright/test');

test.describe('Login / Logout Flow', () => {
  // Before Hook
  test.beforeEach(async ({ page }) => {
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  })

  // Negative Scenario
  test('Negative Scenario for login', async ({ page }) => {
    //await page.goto('https://opensource-demo.orangehrmlive.com/index.php/auth/login')


    await page.getByLabel('Username:').type('Tester1')

    await page.getByLabel('Password:').fill('test');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
  })

  // Positive Scenario + Logout
  test.only('Positive Scenario for login + logout', async ({ page }) => {

    await page.getByLabel('Username:').type('Tester')

    await page.getByLabel('Password:').fill('test');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();

  })

  test('Go to Order Page', async ({ page }) => {
    await page.getByRole('link', { name: 'Order' }).nth(1).click();

  });

  test('Go to View All Order Page', async ({ page }) => {
    await page.getByRole('link', { name: 'View all orders' }).click();

  });
})
