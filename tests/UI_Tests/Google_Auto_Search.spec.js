const { test, expect } = require('@playwright/test');
const assert = require('assert')

test('Login to Weborders @smoke', async ({ page }) => {
    
    // Navigate to Google
    await page.goto('https://www.google.com');

    // Accept Cookies if prompted
    try {
        await page.click('button:has-text("Accept all")', { timeout: 3000 });
    } catch (e) {
        console.log("No cookie prompt found.");
    }

    // Type in the search box
    const searchSelector = 'textarea[name="q"]';
    await page.fill(searchSelector, 'playwright automation');
    //await page.waitForTimeout(5000); // Wait for auto-suggestions to appear
    // Wait for auto-suggestions to appear
    await page.waitForSelector('ul[role="listbox"] li');

    // Capture all auto-suggestions
    const suggestions = await page.$$eval('ul[role="listbox"] li span', elements =>
        elements.map(el => el.textContent)
    );

    console.log('Auto-suggestions:', suggestions);

    // Click the first suggestion (if needed)
    await page.click('ul[role="listbox"] li:first-child');

    // Wait for results to load
    //await page.waitForNavigation();

    console.log('Page title after selecting suggestion:', await page.title());
    
});