import { test, expect } from '@playwright/test';

test('Handle button inside Shadow DOM', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/shadowdom');

  // ✅ Method 1: Simplest way — using Playwright’s built-in shadow selector
  const shadowButton = page.locator('#shadow-host >> #my-btn');

  await expect(shadowButton).toBeVisible();
  await shadowButton.click();

//   console.log('✅ Clicked Shadow DOM button using built-in selector.');

//   // ✅ Method 2: Manually traverse into shadowRoot (alternative approach)
//   const host = await page.locator('#shadow-host').elementHandle();
//   const shadowRoot = await host?.evaluateHandle(el => (el as HTMLElement).shadowRoot);
//   const buttonHandle = await shadowRoot?.asElement()?.$('#my-btn');

//   if (buttonHandle) {
//     await buttonHandle.click();
//     console.log('✅ Clicked Shadow DOM button using shadowRoot traversal.');
//   } else {
//     throw new Error('❌ Could not find #my-btn inside shadowRoot.');
//   }

  // (Optional) Verify the click worked — for example, you could check console log or state
});
