//import { test, expect } from '@playwright/test';
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  //await page.getByLabel('Username:').click();
  await page.locator("//input[@id='ctl00_MainContent_username']").fill("Tester");
  //await page.getByLabel('Password:').click();
  //await page.locator("input[id='ctl00_MainContent_password']").fill('test');
  await page.fill("input[id='ctl00_MainContent_password']",'test')
  //await page.getByRole('button', { name: 'Login' }).click();
  await page.locator("#ctl00_MainContent_login_button").click()
  await page.getByRole('link', { name: 'Logout' }).click()
});