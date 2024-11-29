import { test, expect } from '@playwright/test';
//Set the View Port here
test.use({viewport:{width:1200,height:800}})

test('View Port Test cases @sanity @smoke', async ({ page }) => {

  //test.use({viewport:{width:1200,height:800}})
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  await page.getByLabel('Username:').fill('Tester');
 // await page.pause()
  await page.getByLabel('Password:').fill('test');
  
  await page.getByRole('button', { name: 'Login' }).click();
  //Verify user has logged in

  await expect(page.getByRole('link', { name: 'View all orders' })).toHaveText("View all orders")
  await page.getByRole('link', { name: 'Logout' }).click();
});