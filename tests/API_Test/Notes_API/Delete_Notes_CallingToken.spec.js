const { test, expect }= require('@playwright/test')
const {AccessToken} = require('./BaseTest')
test.describe('Create Notes API Testing', () => {
  const baseUrl = 'https://practice.expandtesting.com'
  var token
  var id
  var updated_id
  test.beforeAll(async ({ request }) => {
    token = await AccessToken("abhinay.dixit@hotmail.com", "pass@1234", request)
    expect(token).toBeTruthy();
  })
  
  test('POST Request - Create Notes', async ({ request }) => {
    const response = await request.post(`${baseUrl}/notes/api/notes`, {

        headers: {
          'x-auth-token': `${token}`,
        },
        data:
        {         
            title: "Playwright_Notes",
            description: "Done via API",
            category: "Work"
          },
    })
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    console.log(responseBody)
    expect(responseBody.message).toBe('Note successfully created')
    expect(responseBody.data.title).toBe('Playwright_Notes')
    id = responseBody.data.id
 
    })

    test('Update Request - Update Notes', async ({ request }) => {
      const response = await request.put(`${baseUrl}/notes/api/notes/${id}`, {
  
          headers: {
            'x-auth-token': `${token}`,
          },
          data:
          {         
              title: "Playwright_Deleted_Notes",
              description: "Done via PUT API request",
              category: "Personal",
              completed : "true"
            },
      })
      expect(response.status()).toBe(200)
      const responseBody = JSON.parse(await response.text())
      console.log(responseBody)
      expect(responseBody.message).toBe('Note successfully Updated')
      expect(responseBody.data.title).toBe('Playwright_Deleted_Notes')
      updated_id = responseBody.data.id
      })

      test('Delete Request - Delete Notes', async ({ request }) => {
        const response = await request.delete(`${baseUrl}/notes/api/notes/${updated_id}`, {
    
            headers: {
              'x-auth-token': `${token}`,
            }
        })
        expect(response.status()).toBe(200)
        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
        expect(responseBody.message).toBe('Note successfully deleted')
     
        })
})