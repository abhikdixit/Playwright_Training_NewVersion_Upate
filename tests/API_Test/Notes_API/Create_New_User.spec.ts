import { test, expect } from '@playwright/test';

test('Register user with unique email', async ({ request }) => {

  // Generate unique email
  const uniqueEmail = `adixit_${Date.now()}@abc.com`;

  // Form URL Encoded Data
  const formData = new URLSearchParams();
  formData.append('name', 'testing');
  formData.append('email', uniqueEmail);
  formData.append('password', 'test1234');

  const response = await request.post(
    'https://practice.expandtesting.com/notes/api/users/register',
    {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData.toString()
    }
  );

  // Verify Status Code
  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  console.log('Response:', responseBody);

  // Verify Response Structure
  expect(responseBody.success).toBe(true);
  expect(responseBody.status).toBe(201);
  expect(responseBody.message).toBe('User account created successfully');

  // Verify User Data
  expect(responseBody.data.id).toBeTruthy();
  expect(responseBody.data.name).toBe('testing');
  expect(responseBody.data.email).toBe(uniqueEmail);

});