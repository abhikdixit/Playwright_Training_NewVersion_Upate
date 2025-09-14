import { test, expect } from '@playwright/test'

test.describe('Access Token', () => {
    const baseUrl = 'https://practice.expandtesting.com'

  test('POST Request - Access Token', async ({ request }) => {
    const response = await request.post(`${baseUrl}/notes/api/users/login`, {
      data: {
        "email": "abhinay.dixit@hotmail.com",
        "password": ""
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(400)
    expect(responseBody.message).toBe("Password must be between 6 and 30 characters")

  })

})