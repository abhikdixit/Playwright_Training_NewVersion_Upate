import { test, expect } from '@playwright/test'

test.describe.parallel('API Testing', () => {
  test('POST Register user on practice.expandtesting.com', async ({ request }) => {
    const uniqueEmail = `testing+${Date.now()}@aaa.com`

    const response = await request.post('https://practice.expandtesting.com/notes/api/users/register', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        name: 'Test',
        email: uniqueEmail,
        password: 'test1234',
      },
    })

    expect(response.status()).toBe(201)

    const responseBody = await response.json()
    console.log('Response body:', responseBody)

    expect(responseBody).toBeTruthy()
    expect(responseBody).toHaveProperty('success', true)
    expect(responseBody).toHaveProperty('status', 201)
    expect(responseBody).toHaveProperty('message', 'User account created successfully')
    expect(responseBody).toHaveProperty('data.name', 'Test')
    expect(responseBody).toHaveProperty('data.email', uniqueEmail)
  })
})
