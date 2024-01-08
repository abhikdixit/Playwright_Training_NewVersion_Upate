//import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');

test.only('Spree com Mouse Hover', async ({ page }) => {

  // Go to https://opensource-demo.orangehrmlive.com/index.php/auth/login
  // Relative Path Example
  //await page.goto('/t/categories/women');
  //Absolute Path Example
  await page.goto('/');
  // Click #divUsername >> text=Username
  await page.hover("//a[text()='Women']")

  await page.click("//a[text()='Skirts']");
  await expect(page).toHaveURL('https://demo.spreecommerce.org/t/categories/women/skirts');
  await expect(page).toHaveTitle("Skirts - Spree Demo Site");

 
});

test('OrangeHRN', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder("username").type("Admin");
  await page.getByPlaceholder("password").type("admin123");
  await page.locator("//button[@type='submit']").click();
  const Dashboard = page.locator("//h6[text()='Dashboard']")
  await expect(Dashboard).toHaveText("Dashboard")
});