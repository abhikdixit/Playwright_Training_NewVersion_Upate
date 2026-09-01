import { test, expect } from '@playwright/test';

const baseUrl = 'https://practice.expandtesting.com';
const loginPayload = {
  email: 'test_abhi@abc.com',
  password: 'test1234',
};

test.describe.serial('Create Notes API Testing', () => {
  let authToken: string;

  test.beforeAll(async ({ request }) => {
    const response = await request.post(`${baseUrl}/notes/api/users/login`, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: loginPayload,
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.message).toBe('Login successful');
    expect(responseBody.data).toBeTruthy();
    expect(responseBody.data.token).toBeTruthy();

    authToken = responseBody.data.token;
  });

  test('create note using auth token', async ({ request }) => {
    const notePayload = {
      title: 'TestNG_API',
      description: 'Done via Playwright',
      category: 'Home',
    };

    const response = await request.post(`${baseUrl}/notes/api/notes`, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth-token': authToken,
      },
      data: notePayload,
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.message).toBe('Note successfully created');
    expect(responseBody.data).toBeTruthy();
    expect(responseBody.data.title).toBe(notePayload.title);
    expect(responseBody.data.description).toBe(notePayload.description);
    expect(responseBody.data.category).toBe(notePayload.category);
  });
});
