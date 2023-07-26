const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {

  // Go to https://opensource-demo.orangehrmlive.com/index.php/auth/login
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Click #divUsername >> text=Username
  await page.click('#divUsername >> text=Username');

  // Fill input[name="txtUsername"]
  await page.type('input[name="txtUsername"]', 'Admin');

  // Click input[name="txtPassword"]
  await page.click('input[name="txtPassword"]');

  // Fill input[name="txtPassword"]
  await page.fill('input[name="txtPassword"]', 'admin123');

  // Click input:has-text("LOGIN")
  await page.click('input:has-text("LOGIN")');
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/dashboard');

  //Click on Admin Tab
  await page.click("//b[normalize-space()='Admin']")
  await page.waitForLoadState(); // The promise resolves after 'load' event.
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/admin/viewSystemUsers');
  
  //await page.click('#searchBtn')
  //Click on Add User Button
  await page.click("//input[@id='btnAdd']")
  await page.waitForLoadState(); // The promise resolves after 'load' event.
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/admin/saveSystemUser');
  //await page.waitForLoadState('domcontentloaded');// The promise resolves after 'load' event.
  const dropdown = await page.$('#systemUser_userType')
  //console.log(dropdown)
  //Select Value from dropdown
  await dropdown.selectOption({value: '1'})
  //await page.selectOption('select#value', 1);
  //await page.keyboard.press('A');
  await page.click('#systemUser_employeeName_empName');
  await page.fill('#systemUser_employeeName_empName', 'Fiona Grace');
  const ExpUserName = 'Abhi'+ + new Date()
  console.log(ExpUserName)
  await page.fill('#systemUser_userName',ExpUserName)
  await page.fill('#systemUser_password','admin123')
  await page.fill('#systemUser_confirmPassword','admin123')
  await page.click('#btnSave')
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/admin/viewSystemUsers');
  //Verify that user added in Webtable using Different Assertions
  const locator = page.locator("//table[@id='resultTable']/tbody");
  await expect(locator).toContainText(ExpUserName);
  // Click text=Welcome paul
  await page.click('#welcome');

  // Click text=Logout
  await page.click('text=Logout');
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/auth/login');
  const loginpanel = await page.locator("#logInPanelHeading")
  await expect(loginpanel).toBeVisible()

});