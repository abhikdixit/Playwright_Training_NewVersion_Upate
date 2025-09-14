//import { test, expect } from '@playwright/test';
import { test, expect, Page } from '@playwright/test';

test.describe('E2E WebOrder Application', () => {
  let page: Page;
  let ExpUserName: string;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    
    // Navigate to login page and wait for load
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx', {
      waitUntil: 'networkidle'
    });

    // Login with credentials
    await page.getByLabel('Username:').waitFor({ state: 'visible' });
    await page.getByLabel('Username:').fill('Tester');
    await page.getByLabel('Password:').fill('test');
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify successful login
    await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');
    // Additional verification that we're logged in
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();

  });

  test('Create Order', async () => {
    // Navigate to Order page
    await page.getByRole('link', { name: 'Order' }).nth(1).click();
    await expect(page).toHaveURL(/.*Process\.aspx/);

    // Generate unique username
    ExpUserName = `Dixit${Math.floor(Math.random() * 10000)}`;

    // Fill order form
    await page.getByRole('combobox', { name: 'Product:*' }).waitFor({ state: 'visible' });
    await page.getByRole('combobox', { name: 'Product:*' }).selectOption('FamilyAlbum');
    await page.getByLabel('Quantity:*').fill('5');
    await page.getByLabel('Customer name:*').fill(ExpUserName);
    await page.getByLabel('Street:*').fill('BTM');
    await page.getByLabel('City:*').fill('Bangalore');
    await page.getByLabel('Zip:*').fill('560076');
    await page.getByLabel('Visa').check();
    await page.getByLabel('Card Nr:*').fill('1234567891');
    await page.getByLabel('Expire date (mm/yy):*').fill('12/23');
    
    // Submit order
    await page.getByRole('link', { name: 'Process' }).click();

    const neworder = await page.locator("//strong[normalize-space()='New order has been successfully added.']")
    await expect(neworder).toContainText('New order has been successfully added.')

    await page.getByRole('link', { name: 'View all orders' }).click();
    // Verify that user got created
    await expect(page.locator("//td[normalize-space()='" + ExpUserName + "']")).toHaveText(ExpUserName)
  });

  test('Update Order', async () => {
    // Find and edit the order
    const editButton = page.locator(`//td[normalize-space()='${ExpUserName}']//following-sibling::td/input`);
    await editButton.waitFor({ state: 'visible' });
    await editButton.click();

    // Update city field
    const cityField = page.locator('[name="ctl00$MainContent$fmwOrder$TextBox3"]');
    await cityField.waitFor({ state: 'visible' });
    await cityField.clear();
    await cityField.fill('Delhi');
    
    // Save changes
    await page.locator('[id="ctl00_MainContent_fmwOrder_UpdateButton"]').click();

    // Verify city update
    await expect(page.locator(`//td[normalize-space()='${ExpUserName}']//following-sibling::td[text()='Delhi']`))
      .toHaveText('Delhi');
  });

  test('Delete Order', async () => {
    // Select order for deletion
    const checkbox = page.locator(`//td[normalize-space()='${ExpUserName}']//preceding-sibling::td/input`);
    await checkbox.waitFor({ state: 'visible' });
    await checkbox.check();

    // Click delete and wait for the operation to complete
    await page.locator('[id="ctl00_MainContent_btnDelete"]').click();
    
    // Verify order deletion
    const orderGrid = page.locator('[id="ctl00_MainContent_orderGrid"]');
    await expect(orderGrid).not.toContainText(ExpUserName);
  });

  test.afterAll(async () => {
    // Perform logout
    await page.getByRole('link', { name: 'Logout' }).click();
    
    // Verify successful logout by checking URL and login form visibility
    await expect(page).toHaveURL(/.*Login\.aspx/);
    await expect(page.getByLabel('Username:')).toBeVisible();
    
    // Close the page
    await page.close();
  });
});