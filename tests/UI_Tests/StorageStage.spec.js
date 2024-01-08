//import { test, expect } from '@playwright/test';
const { test, expect, page } = require('@playwright/test');

test('test', async ({ page }) => {
  //page.waitForTimeout(50000)
  await page.getByRole('link', { name: 'Logout' }).click();
});