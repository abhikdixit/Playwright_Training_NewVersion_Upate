import { test, expect, request, APIResponse } from '@playwright/test';

test.describe('User Registration API', () => {
  test('Register new user with unique email', async ({ request }) => {
    // 🔹 Generate a unique email using timestamp
    const uniqueEmail = `testing_${Date.now()}@abc.com`;

    // 🔹 Make POST request to register API
    const response: APIResponse = await request.post(
      'https://practice.expandtesting.com/notes/api/users/register',
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
          name: 'Testing',
          email: uniqueEmail,
          password: 'test1234',
        },
      }
    );

    // 🔹 Validate status code
    expect(response.status()).toBe(201);

    // 🔹 Parse JSON response
    const responseBody = await response.json();
    console.log('Response Body:', responseBody);

    // 🔹 Validate top-level keys
    expect(responseBody.success).toBe(true);
    expect(responseBody.status).toBe(201);
    expect(responseBody.message).toBe('User account created successfully');

    // 🔹 Validate data object
    expect(responseBody.data).toHaveProperty('id');
    expect(responseBody.data.name).toBe('Testing');
    expect(responseBody.data.email).toBe(uniqueEmail);
  });
});
