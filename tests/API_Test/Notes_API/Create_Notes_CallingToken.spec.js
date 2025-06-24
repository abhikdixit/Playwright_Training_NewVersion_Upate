import { test, expect } from '@playwright/test'
import { AccessToken } from './BaseTest'
test.describe('Create Notes API Testing', () => {
  const baseUrl = 'https://practice.expandtesting.com'
  var token

  test.beforeAll(async ({ request }) => {
    token = await AccessToken("testing@abc.com", "test1234", request)
    expect(token).toBeTruthy();
  })
  
  test('POST Request - Create Notes', async ({ request }) => {
    const response = await request.post(`${baseUrl}/notes/api/notes`, {

        headers: {
          'x-auth-token': `${token}`,
        },
        data:
        {         
            title: "Playwright_Notes_CallingToken",
            description: "Done via API",
            category: "Personal"
          },
    })
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    console.log(responseBody)
    expect(responseBody.message).toBe('Note successfully created')
    expect(responseBody.data.title).toBe('Playwright_Notes_CallingToken')

    })
})