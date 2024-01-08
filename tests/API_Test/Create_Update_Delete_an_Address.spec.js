const { test, expect } = require('@playwright/test')
const { CreateToken } = require('./BaseTest')

test.describe('API Testing', () => {
  const baseUrl = 'https://demo.spreecommerce.org'
  var token
  var id
  test.beforeAll(async ({ request }) => {
    token = await CreateToken("nice@spree.com", "spree123", request)
    expect(token).toBeTruthy();
  })

  test('POST Request - Create Address', async ({ request }) => {
    console.log(token)
    const response = await request.post(`${baseUrl}/api/v2/storefront/account/addresses`, {

      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
      data:
      {
        "address": {
          firstname: "Naziya",
          lastname: "Sayyed",
          address1: "BTM",
          address2: "2nd Floor",
          city: "Bethesda",
          phone: "3014445002",
          zipcode: "20814",
          state_name: "MD",
          country_iso: "US"
        },
      }
    })

    const responseBody = JSON.parse(await response.text())
    console.log(responseBody);
    expect(response.status()).toBe(200);

    expect(responseBody.data.attributes.address1).toBe('BTM')
    expect(responseBody.data.attributes.firstname).toBe('Naziya')
    id = responseBody.data.id
    console.log(id)
  })

  test('PATCH Request - Update an Address', async ({ request }) => {
    console.log(token)
    const response = await request.patch(`${baseUrl}/api/v2/storefront/account/addresses/${id}`, {

      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
      data:
      {
        "address": {
          firstname: "Playwright",
          lastname: "Test",
          address1: "HSR",
          address2: "2nd Floor",
          city: "Bethesda",
          phone: "3014445002",
          zipcode: "20814",
          state_name: "MD",
          country_iso: "US"
        },
      }
    })

    const responseBody = JSON.parse(await response.text())
    console.log(responseBody);
    expect(response.status()).toBe(200);

    expect(responseBody.data.attributes.address1).toBe('HSR')
    expect(responseBody.data.attributes.firstname).toBe('Playwright')
  })

  test('Delete Request - Delete Address', async ({ request }) => {
    console.log(token)
    console.log(id)
    const response = await request.delete(`${baseUrl}/api/v2/storefront/account/addresses/${id}`, {

      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },

    })


    expect(response.status()).toBe(204);

  })
})