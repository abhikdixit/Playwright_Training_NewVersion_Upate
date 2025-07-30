import { test, expect } from '@playwright/test'

test.describe('Create Token - API Testing', () => {
  const baseUrl = 'https://practice.expandtesting.com'

    test('Login as an existing user', async ({ request }) => {

    const response = await request.post(`${baseUrl}/notes/api/users/register`, {
      data: {
        "name": "Test User",
        "email": "testing2@abc.com",
        "password": "test1234"
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(201)
    expect(responseBody.message).toBe("User account created successfully")
    expect(responseBody.data.email).toBe("testing1@abc.com")
  })
})