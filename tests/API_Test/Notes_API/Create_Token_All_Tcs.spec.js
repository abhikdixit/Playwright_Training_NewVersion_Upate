const { test, expect } = require('@playwright/test');
const testData = require('../TestData/CreateToken.json');

for (const testCase of testData.testCases) {
    test(`Login API Test - ${testCase.TestCase_ID}`, async ({ request }) => {
        // Login API endpoint
        const loginUrl = 'https://practice.expandtesting.com/notes/api/users/login';
        
        // Request body with credentials from JSON
        const requestBody = {
            email: testCase.email,
            password: testCase.password
        };

        // Make POST request
        const response = await request.post(loginUrl, {
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
