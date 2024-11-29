const { test, expect }= require('@playwright/test')

test.describe('Create Token', () => {
    const baseUrl = 'https://restful-booker.herokuapp.com'

  test('POST Request - Create Token', async ({ request }) => {
    const response = await request.post(`${baseUrl}/auth`, {
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${token}`,
      },
      data: {
        "username" : "admin",
        "password" : "password123"
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.token).toBeTruthy()
    const token = responseBody.token
    console.log(token)
  })

  test.only('POST Request - Negative Scenario', async ({ request }) => {
    const response = await request.post(`${baseUrl}/auth`, {
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${token}`,
      },
      data: {
        "username" : "admin",
        "password" : "password1235"
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    //expect(responseBody.token).toBeTruthy()
    const token = responseBody.token
    console.log(token)
  })

})