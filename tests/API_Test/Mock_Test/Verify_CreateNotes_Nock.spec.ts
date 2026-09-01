import { test, expect } from '@playwright/test';
import nock from 'nock';

test('Create Note using Nock Mocking', async ({ request }) => {

  // Mock the API
  nock('https://practice.expandtesting.com')
    .post('/notes/api/notes', {
      title: 'Testing',
      description: 'Welcome',
      category: 'Home'
    })
    .reply(200, {
      success: true,
      status: 200,
      message: 'Note successfully created',
      data: {
        id: '6a3214fbc760c30296ca698d',
        title: 'Testing',
        description: 'Welcome',
        category: 'Home',
        completed: false,
        created_at: '2026-06-17T03:31:07.564Z',
        updated_at: '2026-06-17T03:31:07.564Z',
        user_id: '68b0018b6f7da0028a4b2976'
      }
    });

  const response = await request.post(
    'https://practice.expandtesting.com/notes/api/notes',
    {
      form: {
        title: 'Testing',
        description: 'Welcome',
        category: 'Home'
      },
      headers: {
        'x-auth-token': 'dummy-token'
      }
    }
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  console.log(JSON.stringify(responseBody, null, 2));

  expect(responseBody.success).toBeTruthy();
  expect(responseBody.message).toBe('Note successfully created');
  expect(responseBody.data.title).toBe('Testing');
});