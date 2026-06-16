import { test, expect, Page, Route, Request } from '@playwright/test';

test("mock login api - form urlencoded", async ({ page }: { page: Page }) => {

  // Mock BEFORE triggering request
  await page.route('**/notes/api/users/login', async (route: Route, request: Request) => {

    // ✅ Validate request (optional but best practice)
    expect(request.method()).toBe('POST');

    const postData = request.postData() || '';
    console.log('Request Body:', postData);

    expect(postData).toContain('email=testing%40abc.com');
    expect(postData).toContain('password=test1234');

    // ✅ Mocked response
    const mockResponse = {
      success: true,
      message: 'Login successful',
      data: {
        token: 'mock_token_123',
        email: 'testing@abc.com'
      }
    };

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockResponse),
    });
  });

  // Trigger request (same as curl)
  const response = await page.evaluate(async () => {
    const res = await fetch('https://practice.expandtesting.com/notes/api/users/login', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: 'testing@abc.com',
        password: 'test1234',
      }),
    });

    return res.json();
  });

  console.log(response);

  // ✅ Assertions
  expect(response.success).toBe(true);
  expect(response.data.token).toBe('mock_token_123');
});