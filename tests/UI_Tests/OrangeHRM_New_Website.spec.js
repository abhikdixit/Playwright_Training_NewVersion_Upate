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

  // Click span:has-text("Admin")
  await page.locator('span:has-text("Admin")').click();
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
  await page.locator('[placeholder="Type for hints\\.\\.\\."]').fill('Fio');

  // Click text=Fiona Grace
  await page.locator('text=Fiona Grace').click();

  // Click input >> nth=2
  await page.locator('input').nth(2).click();
  const ExpUserName = 'Abhi'+ Math.random() * 100;
  // Fill input >> nth=2
  await page.locator('input').nth(2).fill(ExpUserName);
  await page.waitForTimeout(3000)
  // Click text=PasswordFor a strong password, please use a hard to guess combination of text wi >> input[type="password"]
  await page.locator('text=PasswordFor a strong password, please use a hard to guess combination of text wi >> input[type="password"]').click();

  // Fill text=PasswordFor a strong password, please use a hard to guess combination of text wi >> input[type="password"]
  await page.locator('text=PasswordFor a strong password, please use a hard to guess combination of text wi >> input[type="password"]').fill('Admin@123');

  // Click input[type="password"] >> nth=1
  await page.locator('input[type="password"]').nth(1).click();

  // Fill input[type="password"] >> nth=1
  await page.locator('input[type="password"]').nth(1).fill('Admin@123');

  // Click text=Save
  await page.locator('text=Save').click();
  await page.check("//div[text()='"+ExpUserName+"']/parent::div/preceding-sibling::div//i");
 // await page.waitForTimeout(9000)
  await page.locator("//button[normalize-space()='Delete Selected']").click();
  await page.locator("//button[normalize-space()='Yes, Delete']").click();
  //div[text()='"+ExpUserName+"']/parent::div/preceding-sibling::div//i
  // Click text=Save
 // await Promise.all([
  //  page.waitForNavigation(/*{ url: 'https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers' }*/),
  //  page.locator('text=Save').click()
  //]);

  // Click text=AdminUser ManagementPaul Collings >> i >> nth=1
  //await page.locator('text=AdminUser ManagementPaul Collings >> i').nth(1).click();
  //await page.waitForTimeout(9000)
  await page.locator("//i[@class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']").click();

  // Click text=Logout
  await page.locator('text=Logout').click();
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
 // await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/auth/login');
  const loginpanel = await page.locator("//h5[normalize-space()='Login']")
  await expect(loginpanel).toBeVisible()
});