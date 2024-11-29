import { test, expect } from '@playwright/test'

test.describe('Access Token', () => {
    const baseUrl = 'https://practice.expandtesting.com'

  test('POST Request - Access Token', async ({ request }) => {
    const response = await request.post(`${baseUrl}/notes/api/users/login`, {
      data: {
        "email": "abhinay.dixit@hotmail.com",
        "password": "pass@1234"
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.data.token).toBeTruthy()
    expect(responseBody.message).toBe("Login successful")
    const token = responseBody.data.token
    console.log(token)
  })

})