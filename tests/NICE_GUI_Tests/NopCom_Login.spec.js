// @ts-check
import { test, expect } from '@playwright/test';

test('Weborder Login Functionality', async ({ browser }) => {
  const context = await browser.newContext({
    // userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    // viewport: { width: 1280, height: 800 },
    // locale: 'en-US',
    // timezoneId: 'America/New_York',
    // permissions: ['geolocation', 'notifications'],
    // geolocation: { latitude: 40.7128, longitude: -74.0060 },
  });
  const page = await context.newPage();
  await page.route('**/*', (route, request) => {
    // Block known bot-detection scripts
    if (request.url().includes('cloudflare') || request.url().includes('challenge')) {
      route.abort();
    } else {
      route.continue();
    }
  });
  await page.goto('https://admin-demo.nopcommerce.com/login', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500); // Wait for Cloudflare check
  await page.getByLabel('Email:').clear();
  await page.getByLabel('Email:').type('admin@yourstore.com', { delay: 120 });
  await page.getByLabel('Password:').clear();
  await page.getByLabel('Password:').fill('admin', { timeout: 2500 });
  await page.waitForTimeout(700); // Mimic human pause
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.locator("//a[normalize-space()='Logout']")).toHaveText('Logout');
  await context.close();
});