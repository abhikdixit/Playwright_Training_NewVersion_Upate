import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Download and verify content of sample.txt', async ({ page, context }) => {
    const downloadDir = path.join(__dirname, '../../TestData/Downloads');

    // Ensure download directory exists
    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir, { recursive: true });
    }

    // Override download behavior to save files in custom folder
    const browser = context.browser();
    if (!browser) {
        throw new Error('Browser context is not available');
    }
    
    const newContext = await browser.newContext({
        acceptDownloads: true
    });
    const newPage = await newContext.newPage();

    await newPage.goto('https://the-internet.herokuapp.com/download');

    // Start waiting for the download
    const [download] = await Promise.all([
        newPage.waitForEvent('download'),
        newPage.click('a:text("sample.txt")')
    ]);

    const fileName = download.suggestedFilename();
    const filePath = path.join(downloadDir, fileName);

    // Save the download to desired location
    await download.saveAs(filePath);

    // ✅ Verify file exists
    expect(fs.existsSync(filePath)).toBeTruthy();

    // ✅ Read and verify content
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    console.log(`Downloaded file content:\n${fileContent}`);

    // ✅ Assert content includes expected text
    expect(fileContent).toContain('Sample file for upload test');

    // Cleanup (optional)
    // fs.unlinkSync(filePath);

    await newContext.close();
});
