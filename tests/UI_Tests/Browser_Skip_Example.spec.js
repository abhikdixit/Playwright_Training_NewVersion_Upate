const { test, expect } = require('@playwright/test');

/*test('Login to Weborders @smoke', async ({ page, browserName }) => {
  //test.skip('Login to Weborders @smoke', async ({ page, browserName }) => {
  //Skip execution against Firefox
  //test.skip(browserName === 'Webkit', 'Feature not ready for Firefox browser')

  //fixme test against Firefox
  //test.fixme(browserName == 'firefox','Feature not ready for Firefox browser')
  // Go to http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

  // Click input[name="ctl00\$MainContent\$username"]
  await page.click('input[name="ctl00\\$MainContent\\$username"]');

  // Fill input[name="ctl00\$MainContent\$username"]
  await page.fill('input[name="ctl00\\$MainContent\\$username"]', 'Tester');

  // Click input[name="ctl00\$MainContent\$password"]
  await page.click('input[name="ctl00\\$MainContent\\$password"]');

  // Fill input[name="ctl00\$MainContent\$password"]
  await page.fill('input[name="ctl00\\$MainContent\\$password"]', 'test');

  // Click text=Login
  await page.click('text=Login');
  await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');

  // Click text=Logout
  await page.click('text=Logout');
  await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx');

});*/

test.describe('Login / Logout Flow', () => {
  // Before Hook
  test.beforeEach(async ({ page }) => {
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  })

  // Negative Scenario
  test.fixme('Negative Scenario for login', async ({ page }) => {
    //await page.goto('https://opensource-demo.orangehrmlive.com/index.php/auth/login')
   

    await page.getByLabel('Username:').type('Tester1')
  
    await page.getByLabel('Password:').fill('test');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();

   // const errorMessage = await page.locator('#spanMessage')
  //  await expect(errorMessage).toContainText('Invalid credentials')
  })

  // Positive Scenario + Logout
  test('Positive Scenario for login + logout', async ({ page }) => {

    await page.getByLabel('Username:').type('Tester')
  
    await page.getByLabel('Password:').fill('test');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();

    /*const DashboardTab = await page.locator("#menu_dashboard_index")
    await expect(DashboardTab).toContainText('Dashboard')
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/dashboard')

    await page.goto('https://opensource-demo.orangehrmlive.com/index.php/auth/logout')
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/auth/login')*/
  })
})
