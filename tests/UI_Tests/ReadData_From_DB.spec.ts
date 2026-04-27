import { test, expect, Page } from '@playwright/test';
import db from './database';

// Define Type for DB Result
type LoginRecord = {
  uname: string;
  pass: string;
};

test.describe('Database Driven Login Tests', () => {

  test('Validate login using DB data', async ({ page }: { page: Page }) => {

    const query = 'SELECT uname, pass FROM login';

    try {
      // Fetch data from DB
      const results = await db.queryDatabase(query) as LoginRecord[];
      console.log('Database Query Results:', results);

      for (const row of results) {

        await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

        await page.getByLabel('Username:').fill(row.uname);
        await page.getByLabel('Password:').fill(row.pass);
        await page.getByRole('button', { name: 'Login' }).click();

        // Validation (simple example)
        await expect(page).toHaveURL(/WebOrders/);

        // Logout (only if login successful)
        const logoutLink = page.getByRole('link', { name: 'Logout' });
        if (await logoutLink.isVisible()) {
          await logoutLink.click();
        }
      }

      const pageUrl = page.url();
      console.log('Final Page URL:', pageUrl);

    } catch (error) {
      console.error('Error executing query:', error);
      throw error; // fail test explicitly
    } finally {
      // Close DB connection safely
      await db.connection.end();
    }

  });

});