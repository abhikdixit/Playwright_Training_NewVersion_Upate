const { test, expect }= require('@playwright/test')
const {CreateToken} = require('./BaseTest')
const { addresses } = require('../TestData/SpreeCreateAddresses.json')

test.describe('API Testing', () => {
  //test.setTimeout(120000)
  const baseUrl = 'https://demo.spreecommerce.org'
  var token
  test.beforeAll(async ({ request }) => {
    token = await CreateToken("nice@spree.com", "spree123", request)
    expect(token).toBeTruthy();
  })

  addresses.forEach((address, index) => {
    test('POST Request - Create Address ' + index+1, async ({ request }) => {
      const response = await request.post(`${baseUrl}/api/v2/storefront/account/addresses`, {
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Authorization': `Bearer ${token}`,
        },
        data: { "address": address }
      })
      
      const responseBody = JSON.parse(await response.text())
      console.log(responseBody);
      expect(response.status()).toBe(200);
      expect(responseBody.data.attributes.address1).toBe(address.address1)
      expect(responseBody.data.attributes.firstname).toBe(address.firstname)
    })
  })
})