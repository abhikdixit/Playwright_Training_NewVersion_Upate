const { test, expect } = require('@playwright/test');

test('Test login page Smoke', async ({ page }) => {
  await page.goto('https://blazedemo.com/');
  //await page.pause();
  await page.locator('select[name="fromPort"]').selectOption('Boston');
  await page.locator('select[name="toPort"]').selectOption('London');
  await page.getByRole('button', { name: 'Find Flights' }).click();
  await page.goto('https://blazedemo.com/purchase.php');
  await page.getByPlaceholder('First Last').click();
  await page.getByPlaceholder('First Last').fill('Abhi Dixit');
  await page.locator('#cardType').selectOption('amex');
  await page.getByPlaceholder('Credit Card Number').click();
  await page.getByPlaceholder('Credit Card Number').fill('123456789');
  await page.getByPlaceholder('John Smith').click();
  await page.getByPlaceholder('John Smith').fill('Abhi');
  await page.getByRole('button', { name: 'Purchase Flight' }).click();
  await page.getByRole('heading', { name: 'Thank you for your purchase today!' }).click();
});