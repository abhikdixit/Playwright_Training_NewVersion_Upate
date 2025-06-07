import { test, expect } from '@playwright/test'
import { AccessToken, Creating_notes_and_generating_id } from './BaseTest'
test.describe('Delete Notes API Testing', () => {
  const baseUrl = 'https://practice.expandtesting.com'
  var token
  var id
 
  test.beforeAll(async ({ request }) => {
    token = await AccessToken("abhi@xyz.com", "test1234", request)
    expect(token).toBeTruthy();
    console.log(token);
    id = await Creating_notes_and_generating_id(token,request);
  })
  
  

    test('Delete Request - Delete Notes', async ({ request }) => {
      const response = await request.delete(`${baseUrl}/notes/api/notes/${id}`, {
  
          headers: {
            'x-auth-token': `${token}`,
            'accept':'application/json'
          },
      })
      expect(response.status()).toBe(200)
      const responseBody = JSON.parse(await response.text())
      console.log(responseBody)
    expect(responseBody.message).toBe('Note successfully deleted')
    })
})