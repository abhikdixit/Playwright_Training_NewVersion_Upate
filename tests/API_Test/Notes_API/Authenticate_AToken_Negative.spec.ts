import { test, expect } from '@playwright/test'

test.describe('Access Token', () => {
    const baseUrl = 'https://practice.expandtesting.com'

  test('POST Request - Access Token', async ({ request }) => {
    const response = await request.post(`${baseUrl}/notes/api/users/login`, {
      data: {
        "email": "testing@abc.com",
        "password": "pass@1234"
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(401)
    expect(responseBody.message).toBe("Incorrect email address or password")

  })

})