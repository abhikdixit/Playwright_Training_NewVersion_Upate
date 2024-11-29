const { test, expect }= require('@playwright/test')

test.describe('GET ALL Notes API Testing', () => {
  const baseUrl = 'https://practice.expandtesting.com'
  var token

  test.beforeAll(async ({ request }) => {
    const response = await request.post(`${baseUrl}/notes/api/users/login`, {
        data: {
          "email": "abhinay.dixit@hotmail.com",
          "password": "pass@1234"
        },
      })
      const responseBody = JSON.parse(await response.text())
      expect(response.status()).toBe(200)
      expect(responseBody.data.token).toBeTruthy()
      token = responseBody.data.token
      console.log(token)
  })
  test('GET Request - GET All Notes', async ({ request }) => {
    const response = await request.get(`${baseUrl}/notes/api/notes`, {

        headers: {
          'x-auth-token': `${token}`,
        }
    })
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    console.log(responseBody)
    expect(responseBody.message).toBe('Notes successfully retrieved')
    //expect(responseBody.data.attributes.name).toBe('United States')
 
    })
})