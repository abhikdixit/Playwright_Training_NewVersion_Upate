const { test, expect }= require('@playwright/test')

test.describe.parallel('API Testing', () => {
  const baseUrl = 'https://reqres.in/api'


test('POST Unsuccessful Register - User', async ({ request }) => {
    const response = await request.post(`${baseUrl}/register`, {
      data: {
        "email": "dixit@abc.com"
    },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(400)
    expect(responseBody.error).toBe("Missing password")
    console.log(responseBody)
  })
})