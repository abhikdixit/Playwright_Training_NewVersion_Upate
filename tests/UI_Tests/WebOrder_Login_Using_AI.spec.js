const { test, expect } = require('@playwright/test');
const testData = require('../../TestData/WebOrder_AI_Login.json');

test('WebOrder Login Tests', async ({ page }) => {
    for (const scenario of testData.testScenarios) {
        try {
            await page.goto(testData.url);
            await page.fill('input[name="ctl00$MainContent$username"]', scenario.username);
            await page.fill('input[name="ctl00$MainContent$password"]', scenario.password);
            await page.click('input[name="ctl00$MainContent$login_button"]');
            
            // Verify expected result based on scenario
            await expect(page.locator(scenario.locator)).toHaveText(scenario.expectedResult);
            
            console.log(`Test scenario "${scenario.name}" passed`);
        } catch (error) {
            console.error(`Test scenario "${scenario.name}" failed:`, error);
            throw error;
        }
    }
});
