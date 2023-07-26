const { test, expect, Page } = require('@playwright/test');
//Describe Block is like Your Suite or Class Name in Java
test.describe('Login to APP -> Add User -> Delete User ->Verify User', async () => {
let page = Page;
//Page can be directly used in test not in hooks, in hooks we can use browser and assign new page to page
test.beforeAll(async ({browser}) => {
    //const browser = await chromium.launch();
    page = await browser.newPage();
    // Go to https://opensource-demo.orangehrmlive.com/index.php/auth/login
    await page.goto('https://opensource-demo.orangehrmlive.com/index.php/auth/login');

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
});
//ExpUserName should be declared as global variable, so that it can be access inside another test
let ExpUserName;
test('Add User with Valid info', async () => {

  //Click on Admin Tab
  await page.click("//b[normalize-space()='Admin']")
  await page.waitForLoadState(); // The promise resolves after 'load' event.
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/admin/viewSystemUsers');
   //Click on Add User Button
  await page.click("//input[@id='btnAdd']")
  await page.waitForLoadState(); // The promise resolves after 'load' event.
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/admin/saveSystemUser');
  //await page.waitForLoadState('domcontentloaded');// The promise resolves after 'load' event.
  const dropdown = await page.$('#systemUser_userType')
  //console.log(dropdown)
  //Select Value from dropdown
  await dropdown.selectOption({value: '1'})
  await page.click('#systemUser_employeeName_empName');
  await page.fill('#systemUser_employeeName_empName', 'Fiona Grace');
  ExpUserName = 'Abhi'+ Math.random()
  //await page.fill('#systemUser_userName','Abhi'+ new Date())
  await page.fill('#systemUser_userName',ExpUserName)
  await page.fill('#systemUser_password','admin123')
  await page.fill('#systemUser_confirmPassword','admin123')
  await page.click('#btnSave')
  
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/admin/viewSystemUsers');
});
//fixme hooks used to skip the test, which are having some bug and you don't want to run for time being
//test.fixme('Delete User', async () => {
test('Delete User', async () => {

  //Verify added user to webTable
  await page.check("//a[text()='"+ExpUserName+"']/parent::td/preceding-sibling::td/input");
  // Click input:has-text("Delete")
  await page.click('input:has-text("Delete")');
  // Click text=× OrangeHRM - Confirmation Required Delete records? Ok Cancel >> input[type="button"]
  await page.click('text=× OrangeHRM - Confirmation Required Delete records? Ok Cancel >> input[type="button"]');
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/admin/viewSystemUsers');
  // Verify that user got deleted from Webtable using not.tocontaintext assertions
  const locator = page.locator("//table[@id='resultTable']/tbody");
  await expect(locator).not.toContainText(ExpUserName);
});


test.afterAll(async () => {
  // Click text=Welcome paul
  await page.click('#welcome');

  // Click text=Logout
  await page.click('text=Logout');
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/auth/login');
  const loginpanel = await page.locator("#logInPanelHeading")
  await expect(loginpanel).toBeVisible()
});
});