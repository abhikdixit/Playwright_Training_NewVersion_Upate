import { test, expect, APIResponse } from '@playwright/test';
import path from 'path';
import { readFile, utils } from 'xlsx';

// Define Type for Excel Data
// type CreateTokenData = {
//   TestCase_ID: string;
//   email: string;
//   password: string;
//   exp_res: string;
//   exp_status_code: number;
// };

// Read Excel File
const filePath = path.join(__dirname, '../TestData/Create_Token.xlsx');
const workbook = readFile(filePath);
const sheetName = workbook.SheetNames[0];
const records: any[] = utils.sheet_to_json(workbook.Sheets[sheetName]);

for (const testCase of records) {
    test(`Token API Test - ${testCase.TestCase_ID}`, async ({ request }) => {
        // Login API endpoint
        const loginUrl = 'https://practice.expandtesting.com/notes/api/users/login';
        
        // Request body with credentials from JSON
        const requestBody = {
            email: testCase.email,
            password: testCase.password
        };

        // Make POST request
        const response: APIResponse = await request.post(loginUrl, {
            data: requestBody,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Assert response status
       expect(response.status()).toBe(testCase.exp_status_code);

        // Parse response body
        const responseBody = await response.json();

        // Assertions for response
        expect(responseBody.message).toBe(testCase.exp_res);
        
        // Log test case details
        console.log(`Test Case ${testCase.TestCase_ID} completed`);
        if (testCase.exp_status_code === 200) {
            console.log('Auth Token:', responseBody.data.token);
        }
    });
}
