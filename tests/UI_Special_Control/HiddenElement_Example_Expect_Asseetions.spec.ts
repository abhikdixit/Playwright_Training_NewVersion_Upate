import { test, expect } from '@playwright/test';

test('Hidden element example', async ({ page }) => {

    await page.goto('https://practice.expandtesting.com/dynamic-loading/1');

    await page.getByRole('button', { name: 'Start' }).click();

    await expect(page.locator('#finish')).toHaveText('Hello World!');
});