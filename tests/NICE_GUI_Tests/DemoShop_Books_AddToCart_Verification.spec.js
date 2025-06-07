const { test, expect } = require('@playwright/test');

test.describe('DemoShop Books Add To Cart Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com');
    await page.click('a.ico-login');
    await page.fill('input[name="Email"]', 'vasavigrandhi555@gmail.com');
    await page.fill('input[name="Password"]', 'Welcome');
    await page.click('input[value="Log in"]');
  });

  test('add to cart validation', async ({ page }) => {
    await page.click('a:has-text("Books")');
    const actvalue = await page.textContent('h1:has-text("Books")');
    const expectvalue = 'Books';
    expect(actvalue).toBe(expectvalue);

    try {
      await page.waitForSelector('a:has-text("Science") >> xpath=parent::h2/following-sibling::div[@class="add-info"]//input', { timeout: 5000 });
      console.log('Add to cart is Present');
    } catch (e) {
      console.log('Add to cart is disabled');
    }
  });

  test.afterEach(async ({ page }) => {
    await page.click('a:has-text("Log out")');
  });
});
