const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {

  // Go to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

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

  // Click [aria-label="Sidepanel"] >> text=Admin
  await page.locator('[aria-label="Sidepanel"] >> text=Admin').click();
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');

  // Click text=Add
  await page.locator('text=Add').click();
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/saveSystemUser');

  // Click text=User Role-- Select -- >> i
  await page.locator('text=User Role-- Select -- >> i').click();

  // Click div[role="option"]:has-text("Admin")
  await page.locator('div[role="option"]:has-text("Admin")').click();

  // Click text=Status-- Select -- >> i
  await page.locator('text=Status-- Select -- >> i').click();

  // Click div[role="option"]:has-text("Enabled")
  await page.locator('div[role="option"]:has-text("Enabled")').click();

  // Click [placeholder="Type for hints\.\.\."]
  await page.locator('[placeholder="Type for hints\\.\\.\\."]').click();

  // Fill [placeholder="Type for hints\.\.\."]
  await page.locator('[placeholder="Type for hints\\.\\.\\."]').fill('Fi');

  // Click text=Fiona Grace
  await page.locator('text=Fiona Grace').click();

  const ExpUserName = 'Abhi' + + new Date()

  // Fill input >> nth=2
  await page.locator('input').nth(2).fill(ExpUserName);
  // Fill text=PasswordYour password must contain a lower-case letter, an upper-case letter, a  >> input[type="password"]
  await page.locator("div[class='oxd-grid-item oxd-grid-item--gutters user-password-cell'] div[class='oxd-input-group oxd-input-field-bottom-space'] div input[type='password']").fill('Admin@1234');

  // Click input[type="password"] >> nth=1
  await page.locator("div[class='oxd-grid-item oxd-grid-item--gutters'] div[class='oxd-input-group oxd-input-field-bottom-space'] div input[type='password']").fill('Admin@1234')

  // Fill input[type="password"] >> nth=1
  //await page.locator('input[type="password"]').nth(1).fill('Admin@1234');

  // Click text=Save
  //await Promise.all([
  //page.waitForNavigation(/*{ url: 'https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers' }*/),
  await page.locator("button[type='submit']").click()
  //]);

  // Click text=Search
  // await page.locator('text=Search').click();
  //await page.click("button[type='submit']")
  // Click text=AdminUser ManagementPaul Collings >> i >> nth=1
  await page.locator('.oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon').click();

  // Click text=Logout
  await page.locator('text=Logout').click();
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

});