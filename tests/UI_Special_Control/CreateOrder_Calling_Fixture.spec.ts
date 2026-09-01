import { test, expect } from "./base.fixture";

test("Add Unique User and Verify Creation @smoke", async ({ page }) => {
test.setTimeout(80000);
   await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  //Browser.object.action
  await page.getByLabel('Username:').fill('Tester');
  //await page.pause();
  await page.getByLabel('Password:').fill('test');
  const loginbutton = page.getByRole('button', { name: 'Login' });
  await loginbutton.click();
  await page.waitForLoadState();
  await expect(page.getByText("List of All Orders")).toHaveText('List of All Orders');
  //Verify that user has logged in
  //await page.url().includes('/Default1.aspx')
  await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx')
  await page.getByRole('link', { name: 'Order', exact: true }).click();
  await expect(page.locator("//h2[normalize-space()='Order']")).toBeVisible();
    //Verify that user has clicked on Order Link
  await page.url().includes('/Process.aspx')
});