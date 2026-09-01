//npm install nock 

/*nock is a HTTP server mocking library for Node.js. It is commonly used in API automation testing to fake API responses without calling the real server.
Why use Nock?
When testing APIs, you may want to:

✅ Test your code even when the actual API is unavailable
✅ Avoid hitting production/test servers repeatedly
✅ Simulate error responses (500, 404, timeout, etc.)
✅ Make tests faster and more reliable
✅ Test edge cases that are difficult to reproduce on a real server */
import nock from 'nock';
import { test, expect } from '@playwright/test';

test('Mock API using Nock', async ({ request }) => {

  nock('https://practice.expandtesting.com')
    .post('/notes/api/users/login')
    .reply(200, {
      success: true,
      token: 'mock_token_123'
    });

  const response = await request.post(
    'https://practice.expandtesting.com/notes/api/users/login'
  );

  const body = await response.json();

  expect(body.token).toBe('mock_token_123');
});