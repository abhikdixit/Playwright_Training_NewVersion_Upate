import { test, expect } from '@playwright/test';

test('POST Request - Login with ReqRes', async ({ request }) => {
  const response = await request.post('https://reqres.in/api/login', {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    },
  });

  console.log('Status:', response.status());
  console.log('Response:', await response.text());

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.token).toBeTruthy();
  console.log('Token:', body.token);
});
