import { test, expect, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const LOGIN_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

async function performLogin(page: Page, username = 'Admin', password = 'admin123'): Promise<void> {
  // use standard locators
  await page.getByPlaceholder(/username/i).fill(username);
  await page.getByPlaceholder(/password/i).fill(password);
  await page.getByRole('button', { name: /login/i }).click();
  await page.waitForLoadState('networkidle');
}

async function performLogout(page: Page): Promise<void> {
  await page.locator('img.oxd-userdropdown-img').click();
  await page.waitForTimeout(300);
  // logout link
  const logout = page.getByText('Logout', { exact: true });
  await logout.click();
  await page.waitForLoadState('networkidle');
}

// Load test data
const dataPath = path.join(__dirname, 'TestData', 'OrangeHRM_Login.json');
const raw = fs.readFileSync(dataPath, 'utf-8');
type TestCase = { name: string; username: string; password: string; expected: string; message: string };
const testCases: TestCase[] = JSON.parse(raw);

test.describe('OrangeHRM - Data-driven Login Tests', () => {
  for (const tc of testCases) {
    test(tc.name, async ({ page }) => {
      // Navigate to login page
      await page.goto(LOGIN_URL);
      await page.waitForLoadState('networkidle');

      // Fill fields
      await page.getByPlaceholder(/username/i).fill(tc.username);
      await page.getByPlaceholder(/password/i).fill(tc.password);

      // Click login
      await page.getByRole('button', { name: /login/i }).click();

      // Positive case: dashboard
      if (tc.expected === 'dashboard') {
        await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible({ timeout: 10000 });
        await expect(page).toHaveURL(/.*\/dashboard/);
      }

      // Invalid credentials
      if (tc.expected === 'invalid') {
        const alert = page.locator('.oxd-alert-content');
        await expect(alert).toContainText(tc.message, { timeout: 5000 });
        await expect(page).toHaveURL(/.*\/auth\/login/);
      }

      // Required field validation
      if (tc.expected === 'required') {
        // The form shows inline 'Required' messages; assert at least one appears
        const requiredMessage = page.getByText(tc.message, { exact: true });
        await expect(requiredMessage).toBeVisible({ timeout: 5000 });
        await expect(page).toHaveURL(/.*\/auth\/login/);
      }

      // If logged in (positive), logout to reset state
      if (tc.expected === 'dashboard') {
        await performLogout(page);
        await expect(page.getByPlaceholder(/username/i)).toBeVisible();
      }
    });
  }
});
