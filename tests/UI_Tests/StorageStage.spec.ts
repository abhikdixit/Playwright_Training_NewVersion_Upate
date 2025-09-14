//import { test, expect } from '@playwright/test';
import { test, expect, page } from '@playwright/test';

test('test', async ({ page }) => {
  //page.waitForTimeout(50000)
  await page.getByRole('link', { name: 'Logout' }).click();
});