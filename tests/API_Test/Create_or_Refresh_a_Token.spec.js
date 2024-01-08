const { test, expect }= require('@playwright/test')

test.describe('Create Token', () => {
    const baseUrl = 'https://demo.spreecommerce.org'

  test('POST Request - Create Token', async ({ request }) => {
    const response = await request.post(`${baseUrl}/spree_oauth/token`, {
      data: {
        "grant_type": "password",
        "username": "nice@spree.com",
        "password": "spree123"
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.access_token).toBeTruthy()
    const token = responseBody.access_token
    console.log(token)
  })

  test('POST Request - Create Token-Wrong Info', async ({ request }) => {
    const response = await request.post(`${baseUrl}/spree_oauth/token`, {
      data: {
        "grant_type": "password",
        "username": "nice2@spree.com",
        "password": "spree123"
      },
    })
    //const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(400)
    //expect(responseBody.access_token).toBeTruthy()
    //const token = responseBody.access_token
    //console.log(token)
  })
})