const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {

  // Go to https://opensource-demo.orangehrmlive.com/index.php/auth/login
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').click();
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');

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
 // Click input[name="systemUser\[employeeName\]\[empName\]"]
 await page.click('input[name="systemUser\\[employeeName\\]\\[empName\\]"]');

 // Fill input[name="systemUser\[employeeName\]\[empName\]"]
 await page.fill('input[name="systemUser\\[employeeName\\]\\[empName\\]"]', 'Fiona Grace');

  const ExpUserName = 'Abhi'+ + new Date()
  await page.fill('#systemUser_userName',ExpUserName)
  await page.fill('#systemUser_password','admin123')
  await page.fill('#systemUser_confirmPassword','admin123')
  await page.click('#btnSave')
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/admin/viewSystemUsers');
  //Verify added user to webTable
  const tablebodydata = await page.$$('#resultTable tbody tr td a')
  console.log(tablebodydata.length)

  for await (const tabledata of tablebodydata)
  {
    //await page.waitForTimeout(5000)
    const returntd = await tabledata.innerText()
    console.log(returntd)
    //await page.waitForTimeout(2000)
    if(returntd.includes(ExpUserName))
    {
      await page.check("//a[text()='"+ExpUserName+"']/parent::td/preceding-sibling::td/input");
      await page.waitForTimeout(2000)
    }
  }
  await page.click('#welcome');

  // Click text=Logout
  await page.click('text=Logout');
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/auth/login');
  const loginpanel = await page.locator("#logInPanelHeading")
  await expect(loginpanel).toBeVisible()

});