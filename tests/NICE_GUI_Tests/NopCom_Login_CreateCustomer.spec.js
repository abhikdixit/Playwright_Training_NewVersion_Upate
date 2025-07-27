// @ts-check
import { test, expect } from '@playwright/test';

test('Weborder Login Functionality', async ({ page }) => {
await page.route('**/*', (route, request) => {
    // Block known bot-detection scripts
    if (request.url().includes('cloudflare') || request.url().includes('challenge')) {
      route.abort();
    } else {
      route.continue();
    }
  });

  await page.goto('https://admin-demo.nopcommerce.com/login');
  await page.getByLabel('Email:').clear();
  await page.getByLabel('Email:').type('admin@yourstore.com');
  await page.getByLabel('Password:').clear();
  await page.getByLabel('Password:').fill('admin');
  await page.getByRole('button', { name: 'Log in' }).click();
  //await page.waitForTimeout(5000); // Wait for the login to complete
  await page.locator("//p[normalize-space()='Customers']//i[contains(@class,'right fas fa-angle-left')]").first().click();
  // Wait for the submenu to be visible before clicking the next locator
  const customersLinks = await page.locator("a[href='/Admin/Customer/List']").all();
  for (const link of customersLinks) {
    if (await link.isVisible()) {
      await link.scrollIntoViewIfNeeded();
      await link.click();
      await expect(page).toHaveURL(/.*\/Admin\/Customer\/List/);
      await expect(page.getByRole('heading', { name: 'Customers' })).toBeVisible();
      break;
    }
  }
  await page.waitForTimeout(2000); // Wait for the navigation to complete
 
  await expect(page.locator("//a[normalize-space()='Logout']")).toHaveText('Logout');
});