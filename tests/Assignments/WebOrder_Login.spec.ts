// playwright version of WebOrder_Login_Headless_Browser
const { test, expect } = require('@playwright/test');

test('WebOrder Login in Headless Mode', async ({ browser }) => {
  // Launch browser in headless mode (default for Playwright)
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to login page
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

  // Fill username and password
  await page.fill('input[name="ctl00$MainContent$username"]', 'Tester');
  await page.fill('input[name="ctl00$MainContent$password"]', 'test');

  // Click login button
  await page.click('input[name="ctl00$MainContent$login_button"]');

  // Assert Logout link and List of All Orders are visible
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
  await expect(page.locator('h2')).toHaveText('List of All Orders');

// click on create order and add all details and verify that order is created
  await page.click('text=Order');
  await page.selectOption('select[name="ctl00$MainContent$fmwOrder$ddlProduct"]', { label: 'FamilyAlbum' });
  await page.fill('input[name="ctl00$MainContent$fmwOrder$txtQuantity"]', '5');
  const UserName = 'Dixit' + Math.floor(Math.random() * 1000);
  await page.fill('input[name="ctl00$MainContent$fmwOrder$txtName"]', UserName);
  await page.fill('input[name="ctl00$MainContent$fmwOrder$TextBox2"]', 'ABC');
  await page.fill('input[name="ctl00$MainContent$fmwOrder$TextBox3"]', 'Redwood');
  await page.fill('input[name="ctl00$MainContent$fmwOrder$TextBox5"]', '5');
  await page.check('#ctl00_MainContent_fmwOrder_cardList_1'); // Visa
  await page.fill('input[name="ctl00$MainContent$fmwOrder$TextBox6"]', '123456789');
  await page.fill('input[name="ctl00$MainContent$fmwOrder$TextBox1"]', '12/23');
  await page.click('#ctl00_MainContent_fmwOrder_InsertButton'); // Submit order
  await expect(page.locator('strong')).toHaveText('New order has been successfully added.');

  // Go back to View All Orders and verify user
  await page.click('text=View all orders'); // Navigate to View All Orders
  const userCell = page.locator(`//td[text()='${UserName}']`);  // Locate the cell with the username
  await expect(userCell).toHaveText(UserName); // Verify the username is present  

  // Edit city for the created order and verify that city is updated for respective user
  await page.click(`xpath=//td[text()='${UserName}']/following-sibling::td/input`); // Click on the edit button for the user
  await expect(page.locator('h2')).toHaveText('Edit Order'); // Verify we are on the Edit Order page
  await page.fill('input[name="ctl00$MainContent$fmwOrder$TextBox4"]', 'CA'); // Update city
  await page.click('#ctl00_MainContent_fmwOrder_UpdateButton'); // Click on Update  
  const stateCell = page.locator(`//td[text()='${UserName}']/following-sibling::td[text()='CA']`); // Locate the cell with the updated city
  await expect(stateCell).toHaveText('CA'); // Verify the city is updated
  
  // Logout and close
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await context.close();
});
