const { test, expect } = require('@playwright/test');
const loginData = require('../../testData/loginData.json');

test.describe('Login Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(loginData.url);
  });

  test('Successful login with valid credentials', async ({ page }) => {
    await page.fill('input[name="ctl00$MainContent$username"]', loginData.username);
    await page.fill('input[name="ctl00$MainContent$password"]', loginData.password);
    await page.click('input[name="ctl00$MainContent$login_button"]');
    
    await expect(page.locator('text=Logout')).toBeVisible();
  });

  test('Failed login with invalid username', async ({ page }) => {
    await page.fill('input[name="ctl00$MainContent$username"]', 'invalid_user');
    await page.fill('input[name="ctl00$MainContent$password"]', loginData.password);
    await page.click('input[name="ctl00$MainContent$login_button"]');
    
    await expect(page.locator('span#ctl00_MainContent_status')).toContainText('Invalid Login');
  });

  test('Failed login with invalid password', async ({ page }) => {
    await page.fill('input[name="ctl00$MainContent$username"]', loginData.username);
    await page.fill('input[name="ctl00$MainContent$password"]', 'wrong_password');
    await page.click('input[name="ctl00$MainContent$login_button"]');
    
    await expect(page.locator('span#ctl00_MainContent_status')).toContainText('Invalid Login');
  });

  test('Failed login with empty credentials', async ({ page }) => {
    await page.click('input[name="ctl00$MainContent$login_button"]');
    
    await expect(page.locator('span#ctl00_MainContent_status')).toContainText('Invalid Login');
  });
  
  test('Login form elements visibility', async ({ page }) => {
    await expect(page.locator('input[name="ctl00$MainContent$username"]')).toBeVisible();
    await expect(page.locator('input[name="ctl00$MainContent$password"]')).toBeVisible();
    await expect(page.locator('input[name="ctl00$MainContent$login_button"]')).toBeVisible();
  });
});
