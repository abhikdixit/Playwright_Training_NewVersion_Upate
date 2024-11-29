const { test, expect }= require('@playwright/test')

test.describe('Create Token', () => {
    const baseUrl = 'https://demo.spreecommerce.org'

  test('POST Request - Create Token', async ({ request }) => {
    const response = await request.post(`${baseUrl}/spree_oauth/token`, {
      data: {
        "grant_type": "password",
        "username": "minh@spree.com",
        "password": "123456"
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    
    expect(responseBody.access_token).toBeTruthy()
    const token = responseBody.access_token
    console.log(token)
  })
})