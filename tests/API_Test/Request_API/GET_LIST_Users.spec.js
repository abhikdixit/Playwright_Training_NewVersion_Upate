const { test, expect }= require('@playwright/test')

test.describe.parallel('API Testing', () => {
  const baseUrl = 'https://reqres.in/api'

  test('Simple API Test - Assert Response Status', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/2`)
    expect(response.status()).toBe(200)

    const responseBody = JSON.parse(await response.text())
    console.log(responseBody)
    expect(responseBody.data.first_name).toBe('Janet')
  })

  test('Negative Scenario No user exists - Assert Response Status', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/23`)
    expect(response.status()).toBe(404)

    //const responseBody = JSON.parse(await response.text())
    //console.log(responseBody)
    //expect(responseBody.data.first_name).toBe('Janet')
  })
})
