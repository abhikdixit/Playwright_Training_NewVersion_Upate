import { test, expect } from '@playwright/test';

test.describe('Create Notes API Testing', () => {
  const baseUrl = 'https://practice.expandtesting.com'
  let token: string
  let Id: string

  test.beforeAll(async ({ request }) => {
    const response = await request.post(`${baseUrl}/notes/api/users/login`, {
        data: {
          "email": "testing@abc.com",
          "password": "test1234"
        },
      })
      const responseBody = JSON.parse(await response.text())
      expect(response.status()).toBe(200)
      expect(responseBody.data.token).toBeTruthy()
      token = responseBody.data.token
      console.log(token)
  })
  test('POST Request - Create Notes', async ({ request }) => {
    const response = await request.post(`${baseUrl}/notes/api/notes`, {

        headers: {
          'x-auth-token': `${token}`,
        },
        data:
        {         
            title: "Playwright_Notes_API",
            description: "Done via API",
            category: "Work"
          },
    })
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    console.log(responseBody)
    Id=responseBody.data.id
    expect(responseBody.message).toBe('Note successfully created')
    expect(responseBody.data.title).toBe('Playwright_Notes_API')
 
    })

    test('PUT Request - Update Notes', async ({ request }) => {
      const response = await request.put(`${baseUrl}/notes/api/notes/${Id}`, {
  
          headers: {
            'x-auth-token': `${token}`,
          },
          data:
          {     
              title: "Playwright_Notes_API_Updated-2",
              description: "Done via API_Update-2",
              category: "Home",
              completed : true
            },
      })
      expect(response.status()).toBe(200)
      const responseBody = JSON.parse(await response.text())
      console.log(responseBody)
      expect(responseBody.message).toBe('Note successfully Updated')
      expect(responseBody.data.title).toBe('Playwright_Notes_API_Updated-2')
   
      })

      
})