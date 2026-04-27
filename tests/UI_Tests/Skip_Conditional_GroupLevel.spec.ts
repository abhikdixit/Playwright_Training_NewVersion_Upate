import { test, expect } from '@playwright/test';
//const { test, expect } = require('@playwright/test');

test.describe('chromium only', () => {
  test.skip(({ browserName }) => browserName !== 'webkit', 'Webkit only!');
test('BalzeDemo', async ({ page,browserName  }) => {
  //test.skip(browserName === 'firefox', 'Still working on it');
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

test('TO Test Login Functionality-Writtern Scripts', async ({ page,browserName  }) => {
  //test.skip(browserName === 'webkit', 'Still working on it');
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').click();
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');



});

});