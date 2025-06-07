const { test, expect } = require('@playwright/test');
import { queryDatabase, connection } from './database';

  test('test', async ({ page }) => {

  // Example query to fetch data from the database
  const query = 'SELECT * FROM login'; // replace with your SQL query
  try {
    const results = await queryDatabase(query);
    console.log('Database Query Results:', results);

    // Use the data in your Playwright script
    // Example: Navigate to a webpage and perform actions
    await page.goto('https://example.com');
    await page.fill('#input-field', results[0].your_column_name); // replace with your actual column name
    await page.click('#submit-button');

    // Perform assertions if needed
    // Example: Check if the page URL contains a specific path
    const pageUrl = await page.url();
    console.log('Page URL:', pageUrl);
  } catch (error) {
    console.error('Error executing query:', error);
  } finally {
    // Close the database connection
    connection.end();

    // Close the browser
    await browser.close();
  }
});
