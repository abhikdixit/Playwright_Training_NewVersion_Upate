import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';

const testData = JSON.parse(
  readFileSync('./tests/API_Test/TestData/register_user.json', 'utf-8')
);

for (const data of testData) {

  test(`Register User - ${data.test_case}`, async ({ request }) => {

    const email =
      data.email === 'dynamic'
        ? `user_${Date.now()}_${Math.floor(Math.random() * 10000)}@abc.com`
        : data.email;

    const formData: any = {};

    if (data.name !== null) {
      formData.name = data.name;
    }

    if (data.email !== null) {
      formData.email = email;
    }

    if (data.password !== null) {
      formData.password = data.password;
    }

    const response = await request.post(
      'https://practice.expandtesting.com/notes/api/users/register',
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: formData
      }
    );

    const body = await response.json();

    console.log('====================================');
    console.log(`Test Case : ${data.test_case}`);
    console.log(`Status    : ${response.status()}`);
    console.log('Response  :', JSON.stringify(body, null, 2));
    console.log('====================================');

    // Status Validation
    expect(response.status()).toBe(data.expected_status);

    // Response Validation
    expect(body.success).toBe(data.expected_success);
    expect(body.status).toBe(data.expected_status);
    expect(body.message).toBe(data.expected_message);

    // Positive Scenario Validation
    if (data.expected_success) {

      expect(body.data).toBeTruthy();

      expect(body.data.id).toBeTruthy();
      expect(body.data.name).toBe(data.name);
      expect(body.data.email).toBe(email);

      expect(body.message).toBe(
        'User account created successfully'
      );
    }

    // Negative Scenario Validation
    if (!data.expected_success) {

      expect(body.success).toBe(false);
      expect(body.data).toBeUndefined();

      console.log(
        `Validation Message: ${body.message}`
      );
    }
  });
}