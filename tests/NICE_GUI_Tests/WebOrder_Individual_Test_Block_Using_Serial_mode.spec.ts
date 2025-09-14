import { test, expect, Page } from '@playwright/test';

test.describe('E2E WebOrder Application - Serial Mode', () => {
  // Configure tests to run in serial mode with abort on failure
  test.describe.configure({ 
    mode: 'serial',
    retries: 0  // Don't retry in serial mode as state might be corrupted
  });

  // Declare properly typed variables
  let page: Page;
  let ExpUserName: string;

  test.beforeAll(async ({ browser }) => {
    try {
      // Create new page
      page = await browser.newPage();
      
      // Navigate to login page with explicit wait
      await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx', {
        waitUntil: 'networkidle'
      });

      // Wait for and fill login form
      const usernameInput = page.getByLabel('Username:');
      const passwordInput = page.getByLabel('Password:');
      const loginButton = page.getByRole('button', { name: 'Login' });

      await usernameInput.waitFor({ state: 'visible' });
      await usernameInput.fill('Tester');
      await passwordInput.fill('test');
      await loginButton.click();

      // Verify successful login
      await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');
      await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
    } catch (error) {
      console.error('Setup failed:', error);
      throw error; // Re-throw to fail the test suite
    }

  });

  test('Create Order', async () => {
    try {
      // Navigate to Order page
      const orderLink = page.getByRole('link', { name: 'Order' }).nth(1);
      await orderLink.click();
      await expect(page).toHaveURL(/.*Process\.aspx/);

      // Generate unique username
      ExpUserName = `Dixit${Math.floor(Math.random() * 10000)}`;

      // Fill order form
      const orderForm = {
        product: page.getByRole('combobox', { name: 'Product:*' }),
        quantity: page.getByLabel('Quantity:*'),
        customerName: page.getByLabel('Customer name:*'),
        street: page.getByLabel('Street:*'),
        city: page.getByLabel('City:*'),
        zip: page.getByLabel('Zip:*'),
        card: page.getByLabel('Visa'),
        cardNumber: page.getByLabel('Card Nr:*'),
        expireDate: page.getByLabel('Expire date (mm/yy):*')
      };

      await orderForm.product.selectOption('FamilyAlbum');
      await orderForm.quantity.fill('5');
      await orderForm.customerName.fill(ExpUserName);
      await orderForm.street.fill('BTM');
      await orderForm.city.fill('Bangalore');
      await orderForm.zip.fill('560076');
      await orderForm.card.check();
      await orderForm.cardNumber.fill('1234567891');
      await orderForm.expireDate.fill('12/23');

      // Submit order
      await page.getByRole('link', { name: 'Process' }).click();

      // Verify success message
      const successMessage = page.locator("//strong[normalize-space()='New order has been successfully added.']");
      await expect(successMessage).toBeVisible();
      await expect(successMessage).toContainText('New order has been successfully added.');

      // Verify order in list
      await page.getByRole('link', { name: 'View all orders' }).click();
      const orderRow = page.locator(`//td[normalize-space()='${ExpUserName}']`);
      await expect(orderRow).toBeVisible();
      await expect(orderRow).toHaveText(ExpUserName);
    } catch (error) {
      console.error('Create Order failed:', error);
      throw error;
    }
  });

  test('Update Order', async () => {
    try {
      // Locate and click edit button for the order
      const editButton = page.locator(`//td[normalize-space()='${ExpUserName}']//following-sibling::td/input`);
      await editButton.waitFor({ state: 'visible' });
      await editButton.click();

      // Update city field
      const cityInput = page.locator('#ctl00_MainContent_fmwOrder_TextBox3');
      await cityInput.waitFor({ state: 'visible' });
      await cityInput.clear();
      await cityInput.fill('Delhi');

      // Save changes
      const updateButton = page.locator('#ctl00_MainContent_fmwOrder_UpdateButton');
      await updateButton.click();

      // Verify city was updated
      const updatedCityCell = page.locator(`//td[normalize-space()='${ExpUserName}']//following-sibling::td[text()='Delhi']`);
      await expect(updatedCityCell).toBeVisible();
      await expect(updatedCityCell).toHaveText('Delhi');
    } catch (error) {
      console.error('Update Order failed:', error);
      throw error;
    }
  });

  test('Delete Order', async () => {
    try {
      // Select order for deletion
      const deleteCheckbox = page.locator(`//td[normalize-space()='${ExpUserName}']//preceding-sibling::td/input`);
      await deleteCheckbox.waitFor({ state: 'visible' });
      await deleteCheckbox.click();

      // Click delete button
      const deleteButton = page.locator('#ctl00_MainContent_btnDelete');
      await deleteButton.waitFor({ state: 'visible' });
      await deleteButton.click();

      // Verify order was deleted
      const orderGrid = page.locator('#ctl00_MainContent_orderGrid');
      await expect(orderGrid).not.toContainText(ExpUserName);
      
      // Additional verification that the row is actually gone
      const deletedRow = page.locator(`//td[normalize-space()='${ExpUserName}']`);
      await expect(deletedRow).toHaveCount(0);
    } catch (error) {
      console.error('Delete Order failed:', error);
      throw error;
    }
  });

  test.afterAll(async () => {
    try {
      // Logout and verify redirect to login page
      const logoutLink = page.getByRole('link', { name: 'Logout' });
      await logoutLink.click();
      await expect(page).toHaveURL(/.*Login\.aspx/);
      
      // Additional verification that we're logged out
      const loginButton = page.getByRole('button', { name: 'Login' });
      await expect(loginButton).toBeVisible();
    } catch (error) {
      console.error('Cleanup failed:', error);
      throw error;
    }
  });
});