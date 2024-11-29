const { test, expect } = require('@playwright/test');

//Using Serial Keyword we can skip remaining test in case any test fail.
test.describe.serial('Login / Logout Flow', () => {
  // Before Hook
  test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  // Negative Scenario
  test('Negative Scenario for login', async ({ page }) => {
    //await page.goto('https://opensource-demo.orangehrmlive.com/index.php/auth/login')
    // Fill input[name="txtUsername"]
   // Click [placeholder="Username"]
   await page.locator('[placeholder="Username"]').click();
  
   // Fill [placeholder="Username"]
   await page.locator('[placeholder="Username"]').fill('Admin');
 
   // Click [placeholder="Password"]
   await page.locator('[placeholder="Password"]').click();
 
   // Fill [placeholder="Password"]
   await page.locator('[placeholder="Password"]').fill('admin1234');
 
   // Click button:has-text("Login")
   await page.locator('button:has-text("Login1")').click();

    const errorMessage = await page.locator('.oxd-text.oxd-text--p.oxd-alert-content-text')
    await expect(errorMessage).toContainText('Invalid credentials')
  })

  // Positive Scenario + Logout
  test('Positive Scenario for login + logout', async ({ page }) => {
   // await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Click [placeholder="Username"]
    await page.locator('[placeholder="Username"]').click();
  
    // Fill [placeholder="Username"]
    await page.locator('[placeholder="Username"]').fill('Admin');
  
    // Click [placeholder="Password"]
    await page.locator('[placeholder="Password"]').click();
  
    // Fill [placeholder="Password"]
    await page.locator('[placeholder="Password"]').fill('admin123');
  
    // Click button:has-text("Login")
    await page.locator('button:has-text("Login")').click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
      await page.waitForTimeout(3000)
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/logout')
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

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
})
