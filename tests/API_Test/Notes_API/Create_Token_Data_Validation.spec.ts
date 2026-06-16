import { test, expect } from '@playwright/test'
import logindata from '../TestData/Token_Valid_Data.json' // No destructuring here

test.describe('Validate Different Data - API Testing @smoke', () => {
  const baseUrl = 'https://practice.expandtesting.com'

  for(const data of logindata) {
    test(`Token - Validate different data: ${data.TestCase_ID}`, async ({ request }) => {

    const response = await request.post(`${baseUrl}/notes/api/users/login`, {
      data: {
        "email": data.email,
        "password": data.password
      },
    })

    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(data.exp_status_code)
    expect(responseBody.data.token).toBeTruthy()
    expect(responseBody.message).toBe(data.exp_res)
    const token = responseBody.data.token
    console.log(token)
    
  })
}
})