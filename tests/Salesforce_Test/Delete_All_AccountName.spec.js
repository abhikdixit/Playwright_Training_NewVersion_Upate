import { test, expect } from '@playwright/test';

test('Login to Weborders and Delete Accounts @smoke', async ({ page }) => {
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

  // Go to Accounts tab
  const accountsLink = page.getByLabel('Main').getByRole('link', { name: 'Accounts' });
  await accountsLink.waitFor({ state: 'visible', timeout: 10000 });
  await accountsLink.click();

  // Click 'New' to add account
  const newButton = page.getByRole('button', { name: 'New' });
  await newButton.waitFor({ state: 'attached' });
  await newButton.click();

  const accountNameField = page.getByLabel('*Account Name');
  await accountNameField.waitFor({ state: 'visible' });
  await accountNameField.fill('Testing');

  const typeComboBox = page.getByRole('combobox', { name: 'Type' });
  await typeComboBox.waitFor({ state: 'attached' });
  await typeComboBox.click();

  const analystOption = page.getByRole('option', { name: 'Analyst' });
  await analystOption.waitFor({ state: 'visible' });
  await analystOption.click();

  const descriptionField = page.getByLabel('Description');
  await descriptionField.waitFor({ state: 'visible' });
  await descriptionField.fill('Welcome to Salesforce');

  const saveButton = page.getByRole('button', { name: 'Save', exact: true });
  await saveButton.waitFor({ state: 'attached' });
  await saveButton.click();

  // Assert account was saved and displayed
  const highlights = page.locator('records-highlights2');
  await expect(highlights).toContainText('Testing');
  await expect(page.getByText('Show All Activities', { exact: true })).toBeVisible();

  // 🔽 NEW SECTION: Delete account(s) from list view 🔽

  // Navigate back to Accounts tab (to list view)
  await page.click("a[title='Accounts']");
  // 🔽 NEW SECTION: Delete accounts one by one 🔽

  // // Go back to Accounts tab (list view)
  // await accountsLink.click();
  // await page.waitForSelector("table[aria-label='Recently Viewed']");

  // Get all account links in the list view
  const accountLinks = page.locator("table[aria-label='Recently Viewed'] tbody tr td a");
  const count = await accountLinks.count();

  for (let i = 0; i < count; i++) {
    // Re-fetch the locator to avoid stale element error
    const currentAccount = page.locator("table[aria-label='Recently Viewed'] tbody tr td a").nth(i);
    const accountName = await currentAccount.innerText();

    await currentAccount.click();
    await page.waitForLoadState('networkidle');

    // Click the dropdown arrow for record actions
    const actionMenuBtn = page.locator("button[title='Show more actions']");
    await actionMenuBtn.waitFor({ state: 'visible' });
    await actionMenuBtn.click();

    // Click the "Delete" option
    const deleteOption = page.getByRole('menuitem', { name: 'Delete' });
    await deleteOption.waitFor({ state: 'visible' });
    await deleteOption.click();

    // Confirm the delete in confirmation dialog
    const confirmDelete = page.getByRole('button', { name: 'Delete', exact: true });
    await confirmDelete.waitFor({ state: 'visible' });
    await confirmDelete.click();

    console.log(`🗑️ Account "${accountName}" deleted.`);

    // Wait for navigation back to list view
    await page.waitForLoadState('networkidle');
    await page.waitForSelector("table[aria-label='Recently Viewed']");
  }

  // ✅ Final assertion (optional): No accounts named "Testing" exist
  const noMoreAccounts = await page.locator("table[aria-label='Recently Viewed'] td a:text-is('Testing')").count();
  expect(noMoreAccounts).toBe(0);
  console.log('✅ All accounts named "Testing" have been deleted.');

  // Logout
  const profileBtn = page.getByRole('button', { name: 'View profile' });
  await profileBtn.waitFor({ state: 'attached' });
  await profileBtn.click();

  const logoutLink = page.getByRole('link', { name: 'Log Out' });
  await logoutLink.waitFor({ state: 'visible' });
  await logoutLink.click();
});
