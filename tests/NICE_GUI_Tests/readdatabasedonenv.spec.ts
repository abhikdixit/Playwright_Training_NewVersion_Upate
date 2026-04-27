import { test, expect, type Page } from '@playwright/test';
//import { qaTestData } from '../TestData/qa/`${process.env.filename}`';
import { qaTestData } from '../TestData/qa/google.json';
import { stageTestData } from '../TestData/stage/google.json';

interface TestData {
    skill1: string;
    [key: string]: string;
}

let testData: TestData;

test.beforeAll('Initialize test data based on environment', async () => {
    try {
        // Validate environment
        const env = process.env.ENV?.toLowerCase() || 'stage';
        if (!['qa', 'stage'].includes(env)) {
            throw new Error(`Invalid environment: ${env}. Must be 'qa' or 'stage'`);
        }

        // Set test data based on environment
        testData = env === 'qa' ? qaTestData : stageTestData;
    } catch (error) {
        console.error('Failed to initialize test data:', error);
        throw error;
    }
});

test('Search functionality with environment-specific test data', async ({ page }) => {
    try {
        // Validate URL
        const baseUrl = process.env.URL;
        if (!baseUrl) {
            throw new Error('URL environment variable is not set');
        }

        // Navigate to the application
        await page.goto(baseUrl, { waitUntil: 'networkidle' });

        // Define search input selector
        const searchInput = page.locator('#APjFqb');

        // Perform search
        await searchInput.click();
        await searchInput.fill(testData.skill1);
        await searchInput.press('Enter');

        // Wait for search results to load
        await page.waitForLoadState('networkidle');

        // Optional: Add assertions here to verify search results
        
    } catch (error) {
        console.error('Test execution failed:', error);
        throw error;
    }
});