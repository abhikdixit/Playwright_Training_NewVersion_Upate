import { test, expect } from '@playwright/test'
import { AccessToken } from './BaseTest'
test.describe('Create Notes API Testing', () => {
  const baseUrl = 'https://practice.expandtesting.com'
  var token
  var id
  var Exp_title="Playwright_Notes_API_21"
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
            title: Exp_title,
            description: "Done via API",
            category: "Personal"
          },
    })
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    console.log(responseBody)
    expect(responseBody.message).toBe('Note successfully created')
    expect(responseBody.data.title).toBe(Exp_title)
    id = responseBody.data.id
 
    })

    test('Update Request - Update Notes', async ({ request }) => {
      const response = await request.put(`${baseUrl}/notes/api/notes/${id}`, {
  
          headers: {
            'x-auth-token': `${token}`,
          },
          data:
          {         
              
              title: "Playwright_Updated_Notes",
              description: "Done via PUT API request",
              category: "Work",
              completed : "true"
            },
      })
      expect(response.status()).toBe(200)
      const responseBody = JSON.parse(await response.text())
      console.log(responseBody)
      expect(responseBody.message).toBe('Note successfully Updated')
      expect(responseBody.data.title).toBe('Playwright_Updated_Notes')
   
      })

})