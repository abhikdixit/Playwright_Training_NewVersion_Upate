import { test, expect } from '@playwright/test';

test('Register and Login with newly created user', async ({ request }) => {

  // Test Data
  const userName = 'testing';
  const password = 'test1234';
  const uniqueEmail = `adixit_${Date.now()}@abc.com`;

  console.log(`Email Generated: ${uniqueEmail}`);

  // =====================================================
  // REGISTER USER
  // =====================================================

  const registerResponse = await request.post(
    'https://practice.expandtesting.com/notes/api/users/register',
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        name: userName,
        email: uniqueEmail,
        password: password
      }
    }
  );

  expect(registerResponse.status()).toBe(201);

  const registerBody = await registerResponse.json();

  console.log('Register Response:', registerBody);

  expect(registerBody.success).toBe(true);
  expect(registerBody.status).toBe(201);
  expect(registerBody.message).toBe('User account created successfully');

  expect(registerBody.data.name).toBe(userName);
  expect(registerBody.data.email).toBe(uniqueEmail);
  expect(registerBody.data.id).toBeTruthy();

  // =====================================================
  // LOGIN WITH CREATED USER
  // =====================================================

  const loginResponse = await request.post(
    'https://practice.expandtesting.com/notes/api/users/login',
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        email: uniqueEmail,
        password: password
      }
    }
  );

  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();

  console.log('Login Response:', loginBody);

  // =====================================================
  // LOGIN VALIDATIONS
  // =====================================================

  expect(loginBody.success).toBe(true);

  // Verify login message
  expect(loginBody.message).toContain('Login successful');

  // Verify token is returned
  expect(loginBody.data.token).toBeTruthy();

  // Verify user details
  expect(loginBody.data.email).toBe(uniqueEmail);

  console.log('Access Token:', loginBody.data.token);

});