import { test as base, expect, type Page } from '@playwright/test';
import ExcelJS from 'exceljs';
import path from 'path';

// Define test data structure
interface TestRecord {
    uname: string;
    pass: string;
    Exp_Result: string;
    [key: string]: string;
}

// Test configuration
const config = {
    baseUrl: 'http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx',
    testDataPath: path.join(process.cwd(), 'tests', 'TestData', 'TestAllScenario.xlsx'),
    selectors: {
        username: 'input[name="ctl00\\$MainContent\\$username"]',
        password: 'input[name="ctl00\\$MainContent\\$password"]',
        loginButton: 'text=Login',
        logoutButton: 'text=Logout',
        ordersHeading: "div[class='content'] h2",
        errorMessage: "#ctl00_MainContent_status"
    }
};

// Define test fixtures
interface TestFixtures {
    page: Page;
    testData: TestRecord[];
}

// Create a test object with fixtures
const test = base.extend<TestFixtures>({
    page: async ({ browser }, use) => {
        const page = await browser.newPage();
        await use(page);
        await page.close();
    },
    testData: async ({}, use) => {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(config.testDataPath);
        
        const worksheet = workbook.worksheets[0];
        if (!worksheet) {
            throw new Error('No worksheet found in Excel file');
        }

        const records: TestRecord[] = [];
        const headers: string[] = [];

        worksheet.getRow(1).eachCell((cell) => {
            headers.push(cell.value?.toString() || '');
        });

        const requiredHeaders = ['uname', 'pass', 'Exp_Result'];
        const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
        if (missingHeaders.length > 0) {
            throw new Error(`Missing required headers: ${missingHeaders.join(', ')}`);
        }

        for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
            const row = worksheet.getRow(rowNumber);
            if (!row.hasValues) continue;

            const record: TestRecord = { uname: '', pass: '', Exp_Result: '' };
            row.eachCell((cell, colNumber) => {
                const header = headers[colNumber - 1];
                if (header) {
                    record[header] = cell.value?.toString() || '';
                }
            });

            if (record.uname || record.pass || record.Exp_Result) {
                records.push(record);
            }
        }

        await use(records);
    }
});

test.describe('WebOrder Login Tests', () => {
    test('Login scenarios from Excel data', async ({ page, testData }) => {
        await page.goto(config.baseUrl, { waitUntil: 'networkidle' });

        for (const record of testData) {
            // Perform login
            await page.fill(config.selectors.username, record.uname);
            await page.fill(config.selectors.password, record.pass);
            await page.click(config.selectors.loginButton);
            await page.waitForLoadState('networkidle');

            // Verify results
            if (record.Exp_Result === 'List of All Orders') {
                await expect(
                    page.locator(config.selectors.ordersHeading)
                ).toContainText(record.Exp_Result);

                await page.click(config.selectors.logoutButton);
                await page.waitForLoadState('networkidle');
            } else if (record.Exp_Result === 'Invalid Login or Password.') {
                await expect(
                    page.locator(config.selectors.errorMessage)
                ).toHaveText(record.Exp_Result);
            } else {
                throw new Error(`Unexpected result: ${record.Exp_Result}`);
            }
        }
    });
});

