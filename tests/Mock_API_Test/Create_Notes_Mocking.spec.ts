import { test, expect, Page, Route, Request } from '@playwright/test';

test('Mock Create Notes API', async ({ page }: { page: Page }) => {

  // Intercept Create Notes API
  await page.route('**/notes/api/notes',async (route: Route, request: Request) => {

      // Verify request method
      expect(request.method()).toBe('POST');

      // Get request headers
      const headers = request.headers();

      console.log('Headers:', headers);

      // Get form-urlencoded payload
      const postData = request.postData();

      console.log('Payload:', postData);

      // Validate request payload
      expect(postData).toContain('title=Testing');
      expect(postData).toContain('description=Welcome');
      expect(postData).toContain('category=Home');

      // Validate token
      expect(headers['x-auth-token']).toBeDefined();

      // Return mocked response
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Note successfully created',
          data: {
            id: 'note_101',
            title: 'Testing',
            description: 'Welcome',
            category: 'Home',
            completed: false,
            created_at: '2026-05-08T10:00:00Z'
          }
        })
      });

    }
  );

  // Open application
  await page.goto('https://practice.expandtesting.com/notes/app');

});