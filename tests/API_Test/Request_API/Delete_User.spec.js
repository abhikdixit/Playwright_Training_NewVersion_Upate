const { test, expect }= require('@playwright/test')

test.describe('API Testing', () => {
  const baseUrl = 'https://reqres.in/api'
  var cust_id
  test.beforeAll(async ({ request }) => {
    const response = await request.post(`${baseUrl}/users`, {
      data: {
        "name": "dixit",
        "job": "Playwright"
    },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(201)
    expect(responseBody.name).toBe("dixit")
    console.log(responseBody.id)
    cust_id = responseBody.id
    console.log(responseBody)
  })

  test('PUT Update Request - Login', async ({ request }) => {
      const response = await request.put(`${baseUrl}/users/${cust_id}`, {
        data: {
          "name": "dixit",
          "job": "API"
      },
      })
      const responseBody = JSON.parse(await response.text())
      expect(response.status()).toBe(200)
      expect(responseBody.job).toBe("API")
      //console.log(responseBody.id)
      console.log(responseBody)
    })

    test('Delete Request - Login', async ({ request }) => {
      const response = await request.delete(`${baseUrl}/users/${cust_id}`)
      expect(response.status()).toBe(204)
    })
})