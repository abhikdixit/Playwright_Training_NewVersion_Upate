import { test, expect } from '@playwright/test';
import path from 'path';

test('Shadow DOM Complete Example', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    // Read Mobiles
    const mobiles = page.locator('#shadow_host .info');
    await expect(mobiles).toHaveText('Mobiles');

    // Read Laptops (Nested Shadow DOM)
    const laptops = page.locator('#nested_shadow_host >> text=Laptops');
    await expect(laptops).toHaveText('Laptops');

    // Click Blog
    await page.locator('#shadow_host a').click();

    // Go back
    await page.goBack();

    // Fill textbox
    const textbox = page.locator('#shadow_host input[type="text"]');
    await textbox.fill('Playwright');

    await expect(textbox).toHaveValue('Playwright');

    // Checkbox
    const checkbox = page.locator('#shadow_host input[type="checkbox"]');
    await checkbox.check();

    await expect(checkbox).toBeChecked();

    // Upload file
    await page
        .locator('#shadow_host input[type="file"]')
        .setInputFiles('tests/TestData/Images/Abhi.jpg');

});