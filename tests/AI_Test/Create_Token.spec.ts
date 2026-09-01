import { test, expect } from '@playwright/test';
import tokenData from './TestData/token.json';

test.describe.parallel('Token API - AI_Test', () => {
  const loginUrl = 'https://practice.expandtesting.com/notes/api/users/login';

  for (const testCase of tokenData.testCases) {
    test(`${testCase.id} - ${testCase.description}`, async ({ request }) => {
      const response = await request.post(loginUrl, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
          email: testCase.email,
          password: testCase.password,
        },
      });

      expect(response.status()).toBe(testCase.expected.status);

      const responseBody = await response.json();
      expect(responseBody.success).toBe(testCase.expected.success);

      if (testCase.expected.message !== undefined) {
        expect(responseBody.message).toBe(testCase.expected.message);
      }

      if (testCase.expected.success) {
        expect(responseBody.data).toBeTruthy();
        expect(responseBody.data.name).toBe(testCase.expected.name);
        expect(responseBody.data.email).toBe(testCase.expected.email);
        expect(responseBody.data.token).toBeTruthy();
      } else {
        expect(responseBody.data).toBeFalsy();
      }
    });
  }
});
