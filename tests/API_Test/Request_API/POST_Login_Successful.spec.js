const { test, expect }= require('@playwright/test')

test.describe.parallel('API Testing', () => {
  const baseUrl = 'https://reqres.in/api'


test('POST Request - Login', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.token).toBeTruthy()
    console.log(responseBody.token)
  })
})