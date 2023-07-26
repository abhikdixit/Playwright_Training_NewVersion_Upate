const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {

  // Go to https://chercher.tech/practice/dropdowns
  await page.goto('https://chercher.tech/practice/dropdowns');

  // Select Google
  await page.selectOption('select', 'Google');

  // Click text=Food Items Multiple selection :PizzaDonutBurgerBonda >> select
  await page.click('text=Food Items Multiple selection :PizzaDonutBurgerBonda >> select');

  // Click input[type="textbar"]
  await page.click('input[type="textbar"]');

  // Fill input[type="textbar"]
  await page.fill('input[type="textbar"]', 'Abhi');

  // Check input[type="checkbox"]
  await page.check('input[type="checkbox"]');

  // Click text=Sample link
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://www.google.com/' }*/),
    page.click('text=Sample link')
  ]);

});