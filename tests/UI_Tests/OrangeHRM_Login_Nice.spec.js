const { test, expect } = require('@playwright/test');
//const { test, expect } = require('@playwright/test');
test('TO Test Login Functionality-Writtern Scripts', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder("username").type("Admin");
  await page.getByPlaceholder("password").type("admin123");
  await page.locator("//button[@type='submit']").click();
  const Dashboard = page.locator("//h6[text()='Dashboard']")
  await expect(Dashboard).toHaveText("Dashboard")

});

test('Recorded Script', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.fill("input[name='username']",'Admin');
    await page.getByPlaceholder('password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click()

    //Logout from Application
    await page.locator("//i[@class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']").click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await expect(page).toHaveTitle("OrangeHRM")
    const Login = page.locator("//h5")
    await expect(Login).toHaveText("Login")
  });