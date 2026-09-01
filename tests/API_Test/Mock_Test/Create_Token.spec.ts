import { test, expect, Page, Route, Request } from '@playwright/test';

//This Playwright test demonstrates API mocking/interception using page.route(). 
// Instead of sending the login request to the real server, 
// Playwright intercepts the request and returns a fake response.

/*Purpose
test → Creates a Playwright test.
expect → Assertions.
Page → Browser page object.
Route → Used to intercept and mock network requests.
Request → Gives access to request details. */

test("mock login api - form urlencoded", async ({ page }: { page: Page }) => {

  // Mock BEFORE triggering request
  await page.route('**/notes/api/users/login', async (route: Route, request: Request) => {
/*Whenever any request matches:
https://practice.expandtesting.com/notes/api/users/login
Playwright intercepts it before it reaches the server.*/

    // Validate request (optional but best practice)
    expect(request.method()).toBe('POST');

    const postData = request.postData() || '';
    console.log('Request Body:', postData);
    //Notice:@ = %40 - because URL encoding is used.
    expect(postData).toContain('email=testing%40abc.com');
    expect(postData).toContain('password=pass1234');

    // Mocked response - This is the fake API response.
    const mockResponse = {
      success: true,
      message: 'Login successful',
      data: {
        token: 'mock_token_123',
        email: 'testing@abc.com'
      }
    };
    //Stops request from going to the real server. Instead returns:
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockResponse),
    });
  });

  // Trigger request (same as curl) -Runs code inside browser context.
  const response = await page.evaluate(async () => {
    const res = await fetch('https://practice.expandtesting.com/notes/api/users/login', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      //Converts to: email=testing%40abc.com&password=pass1234
      body: new URLSearchParams({
        email: 'testing@abc.com',
        password: 'pass1234',
      }),
    });

    return res.json();
  });

  console.log(response);

  // ✅ Assertions
  expect(response.success).toBe(true);
  expect(response.data.token).toBe('mock_token_123');
});

//Complete Flow Diagram

/*Browser
   |
   | POST Login Request
   |
   v
Playwright Route Interceptor
   |
   | Validate Request
   | Check Email
   | Check Password
   |
   v
route.fulfill()
   |
   | Return Fake JSON
   |
   v
Browser Receives Response
   |
   v
Assertions */