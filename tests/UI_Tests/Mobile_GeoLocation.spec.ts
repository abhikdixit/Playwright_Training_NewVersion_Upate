const { test, expect, devices } = require('@playwright/test');
const iPhone11 = devices['iPhone 11 Pro']

test.use({...iPhone11,
  locale: 'en-IND',
  geolocation: { longitude: 13.003697623477295, latitude: 77.59979613090046 },
  permissions: ['geolocation'],
})

test('Mobile and geolocation', async ({ page }) => {
  await page.goto('https://maps.google.com');
  // Capture full page screenshots
  await page.screenshot({ path: './tests/Screenshots/iphone11.png', fullPage: true})
  await page.waitForTimeout(3000)
})
