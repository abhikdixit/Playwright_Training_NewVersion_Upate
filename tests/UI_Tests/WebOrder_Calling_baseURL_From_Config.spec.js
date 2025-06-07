//import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');

test.skip('Notes App', async ({ page }) => {

  await page.goto('/');
  await page.locator("#notes-react-app").click()
  await page.locator("//a[normalize-space()='Login']").click();
  await page.getByTestId('login-email').fill('abhinay.dixit@hotmail.com');
  //await page.getByLabel('Password:').click();
  await page.getByTestId('login-password').fill('pass@1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL("https://practice.expandtesting.com/notes/app")
  await page.getByTestId("logout").click();
  await expect(page).toHaveURL("https://practice.expandtesting.com/notes/app")
});

test('OrangeHRM', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder("username").fill("Admin");
  await page.getByPlaceholder("password").fill("admin123");
  await page.locator("//button[@type='submit']").click();
  const Dashboard = page.locator("//h6[text()='Dashboard']")
  await expect(Dashboard).toHaveText("Dashboard")
});