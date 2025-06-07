const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test('Download and verify content of sample.txt', async ({ page, context }) => {
    const downloadDir = path.join(__dirname, '../../TestData/Downloads');

    // Ensure download directory exists
    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir, { recursive: true });
    }

    // Override download behavior to save files in custom folder
    const newContext = await context.browser().newContext({
        acceptDownloads: true
    });
    const newPage = await newContext.newPage();

    await newPage.goto('https://the-internet.herokuapp.com/download');

    // Start waiting for the download
    const [download] = await Promise.all([
        //newPage.waitForEvent('download'),
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
    expect(fileContent).toContain('This is a test file for upload functionality');

    // Cleanup (optional)
    // fs.unlinkSync(filePath);

    await newContext.close();
});
