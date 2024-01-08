const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
  // This will help to mesure the performance of test within given timeline
  //test.setTimeout(10000);
  //Unconditionally marks a test as "slow". Slow test will be given triple the default timeout.
  test.slow();
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  await page.getByLabel('Username:').click();
  await page.getByLabel('Username:').fill('Tester');
  await page.getByLabel('Password:').click();
  await page.getByLabel('Password:').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');
  await page.getByRole('link', { name: 'Logout' }).click();
  const login = page.locator('#ctl00_MainContent_login_button');
  await expect(login).toBeVisible();

});