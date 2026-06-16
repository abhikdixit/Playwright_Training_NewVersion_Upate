	import { test, expect } from '@playwright/test';

	const BASE_URL = 'http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders';

	test.describe('WebOrders - Login and Create Order (Playwright TS)', () => {
		test('Login, create order and verify it appears in View all orders', async ({ page }) => {
			// Navigate to login page
			await page.goto(`${BASE_URL}/Login.aspx`);

			// Fill username and password (fields do not have accessible labels)
			await page.locator("input[name='ctl00$MainContent$username']").fill('Tester');
			await page.locator("input[name='ctl00$MainContent$password']").fill('test');

			// Click login (input submit)
			await page.locator("input[name='ctl00$MainContent$login_button']").click();

			// Verify logout link visible (logged in)
			await expect(page.getByRole('link', { name: /logout/i })).toBeVisible({ timeout: 5000 });

			// Navigate to Order page
			await page.goto(`${BASE_URL}/Process.aspx`);
			await page.getByRole('link', { name: 'Order', exact: true }).click();

			// Select product
			await page.locator("select[name='ctl00$MainContent$fmwOrder$ddlProduct']").selectOption('FamilyAlbum');

			// Quantity
			await page.locator("input[name='ctl00$MainContent$fmwOrder$txtQuantity']").fill('5');

			// Customer info
			await page.locator("input[name='ctl00$MainContent$fmwOrder$txtName']").fill('Dixit');
			await page.locator("input[name='ctl00$MainContent$fmwOrder$TextBox2']").fill('ABC');
			await page.locator("input[name='ctl00$MainContent$fmwOrder$TextBox3']").fill('Redwood');
			await page.locator("input[name='ctl00$MainContent$fmwOrder$TextBox5']").fill('5');

			// Payment info - select MasterCard (second option)
			await page.locator('#ctl00_MainContent_fmwOrder_cardList_1').click();
			await page.locator("input[name='ctl00$MainContent$fmwOrder$TextBox6']").fill('123456789');
			await page.locator("input[name='ctl00$MainContent$fmwOrder$TextBox1']").fill('12/23');

			// Submit
			await page.locator('#ctl00_MainContent_fmwOrder_InsertButton').click();

			// Verify success message
			await expect(page.getByText('New order has been successfully added.')).toBeVisible({ timeout: 5000 });

			// View all orders and verify created name
			await page.getByRole('link', { name: /view all orders/i }).click();
			const created = page.getByText('Dixit', { exact: true });
			await expect(created).toBeVisible({ timeout: 5000 });
			expect(await created.textContent()).toBe('Dixit');
		});
	});
