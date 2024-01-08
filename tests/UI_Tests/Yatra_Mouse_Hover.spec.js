const { test, expect } = require('@playwright/test');

test('Yatra Login Page', async ({ page }) => {

  // Go to https://opensource-demo.orangehrmlive.com/index.php/auth/login
  await page.goto('https://www.yatra.com/');

  // Click #divUsername >> text=Username
  await page.hover("//a[contains(text(),'My Account')]")

  await page.click('#signInBtn');
  await expect(page).toHaveURL('https://secure.yatra.com/social/common/yatra/signin.htm');

 
});

test('Spree com Mouse Hover', async ({ page }) => {

  // Go to https://opensource-demo.orangehrmlive.com/index.php/auth/login
  await page.goto('https://demo.spreecommerce.org/');

  // Click #divUsername >> text=Username
  await page.hover("//a[text()='Women']")

  await page.click("//a[text()='Skirts']");
  await expect(page).toHaveURL('https://demo.spreecommerce.org/t/categories/women/skirts');
  await expect(page).toHaveTitle("Skirts - Spree Demo Site");

 
});