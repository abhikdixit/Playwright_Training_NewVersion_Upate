import { test, expect } from '@playwright/test';

test('Mock Login API Service', async ({ page }) => {

  // Intercept Login API
  await page.route('**/notes/api/users/login',async (route, request) => {

      // Get request payload
      const postData = request.postData();

      console.log('Request Payload:', postData);

      // Return mocked response
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Login successful',
          data: {
            id: '12345',
            name: 'Testing User',
            email: 'testing@abc.com',
            token: 'mocked_jwt_token_123'
          }
        })
      });

    }
  );

  // Trigger API request from browser
  await page.goto('https://practice.expandtesting.com/notes/app');

});