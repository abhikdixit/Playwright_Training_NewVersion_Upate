import { test, expect } from '@playwright/test';
import path from 'path';

test('Login, create, edit, upload file and verify Account in Salesforce @smoke', async ({ page }) => {
  await page.goto('https://innovation-page-8100.my.salesforce.com');

  await page.fill('input#username', 'abhinay.dixit-amcd@force.com');
  await page.fill('input#password', 'Test@1234');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.waitForLoadState('networkidle');

  const remindMeLaterLink = page.getByRole('link', { name: 'Remind Me Later' });
  if (await remindMeLaterLink.isVisible().catch(() => false)) {
    await remindMeLaterLink.click();
    console.log('🟡 "Remind Me Later" prompt handled.');
  } else {
    console.log('✅ "Remind Me Later" prompt not present, continuing...');
  }

  // Navigate to Accounts
  const accountsLink = page.getByLabel('Main').getByRole('link', { name: 'Accounts' });
  await accountsLink.waitFor({ state: 'visible' });
  await accountsLink.click();

  // Create new account
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByLabel('*Account Name').waitFor();
  await page.getByLabel('*Account Name').fill('Testing');
  await page.getByRole('combobox', { name: 'Type' }).click();
  await page.getByRole('option', { name: 'Analyst' }).click();
  await page.getByLabel('Description').fill('Welcome to Salesforce');
  await page.getByRole('button', { name: 'Save', exact: true }).click();

  // ✅ Verify initial account name
  const highlights = page.locator('records-highlights2');
  await expect(highlights).toContainText('Testing');

  // 🔼 Upload file
  const filePath = 'tests/TestData/dummy.pdf'; // make sure dummy.pdf exists

  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles(filePath);
  await page.getByRole('button', { name: 'Done' }).click();

  // ✅ Wait for upload to finish
  const uploadedFile = page.getByText('dummy.pdf', { exact: true });
  await uploadedFile.waitFor({ timeout: 10000 });
  await expect(uploadedFile).toBeVisible();

  console.log('✅ File uploaded and verified.');

  // 🔚 Log out
  const profileBtn = page.getByRole('button', { name: 'View profile' });
  await profileBtn.waitFor();
  await profileBtn.click();

  const logoutLink = page.getByRole('link', { name: 'Log Out' });
  await logoutLink.waitFor();
  await logoutLink.click();
});
