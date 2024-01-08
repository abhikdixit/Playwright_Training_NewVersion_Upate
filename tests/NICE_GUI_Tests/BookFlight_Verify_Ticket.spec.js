import { test, expect } from '@playwright/test';

test('Blazedemo @smoke', async ({ page }) => {
  await page.goto('https://blazedemo.com/');
  await page.locator('select[name="fromPort"]').selectOption('Boston');
  await page.locator('select[name="toPort"]').selectOption('Rome');
  await page.getByRole('button', { name: 'Find Flights' }).click();
  //Verify that user Landed on next page

  await expect(page).toHaveURL("https://blazedemo.com/reserve.php")
  await page.url().includes("/reserve.php")
  await page.getByRole('row', { name: 'Choose This Flight 43 Virgin America 1:43 AM 9:45 PM $472.56' }).getByRole('button').click();
  await page.getByPlaceholder('First Last').fill('Abhi');
  await page.getByPlaceholder('123 Main St.').fill('ABC');
  await page.getByPlaceholder('Anytown').fill('Bangalore');
  await page.getByPlaceholder('State').fill('Kar');
  await page.getByPlaceholder('12345').fill('560076');
  await page.locator('#cardType').selectOption('amex');
  await page.getByPlaceholder('Credit Card Number').fill('123456789');
  await page.getByText('Travel The World home Your flight from TLV to SFO has been reserved. Airline: Un').click();
  await page.getByPlaceholder('Month').fill('12');
  await page.getByPlaceholder('Year').fill('2023');
  await page.getByPlaceholder('John Smith').fill('Abhi');
  await page.getByRole(' button ', { name: 'Purchase Flight' }).click();
  await expect(page.getByText("Thank you for your purchase today!")).toHaveText("Thank you for your purchase today!")
});