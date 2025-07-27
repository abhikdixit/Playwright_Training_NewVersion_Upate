const { test, expect } = require('@playwright/test');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./tests/TestData/data.json', 'utf8'));

test('Purchase flight on Blazedemo @dixit', async ({ page }) => {
  await page.goto('https://blazedemo.com/index.php');

  const fromPortSelector = 'select[name="fromPort"]';
  const toPortSelector = 'select[name="toPort"]';
  await page.selectOption(fromPortSelector, { label: 'Boston' });
  await page.selectOption(toPortSelector, { label: 'London' });

  await page.click('input[type="submit"]');

  await page.waitForSelector('h3');
  const lufthansaFlight = page.locator('tr', { hasText: 'Lufthansa' }).locator('input[type="submit"]');
  await lufthansaFlight.click();

  const paymentDetails = {
    name: 'John Doe',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    cardNumber: '1234567890123456',
    nameOnCard: 'John Doe'
  };

  await page.fill('input[name="inputName"]', paymentDetails.name);
  await page.fill('input[name="address"]', paymentDetails.address);
  await page.fill('input[name="city"]', paymentDetails.city);
  await page.fill('input[name="state"]', paymentDetails.state);
  await page.fill('input[name="zipCode"]', paymentDetails.zipCode);

  const cardType = data.cardTypes[0];
  await page.selectOption('select[name="cardType"]', { label: cardType });

  await page.fill('input[name="creditCardNumber"]', paymentDetails.cardNumber);
  await page.fill('input[name="nameOnCard"]', paymentDetails.nameOnCard);

  await page.click('input[type="submit"]');

  const successMessage = page.locator('h1');
  await expect(successMessage).toHaveText('Thank you for your purchase today!');
});