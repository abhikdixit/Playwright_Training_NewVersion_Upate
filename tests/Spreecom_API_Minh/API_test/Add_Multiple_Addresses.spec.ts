const { test, expect }= require('@playwright/test')
const fs = require('fs');
let objects = fs.readFileSync('tests/Spreecom_API_Minh/utils/Spree_Add_Multple_Address.json')
const addresses = JSON.parse(objects);
import getToken from "../common/BaseTest";
let username = "minh@spree.com";
let password = "123456";
let token;

test.beforeAll(async () => {
    token = await getToken(username, password);
    expect(token).toBeTruthy();
})

test.describe('API Testing - Add Multiple Address', () => {
  const baseUrl = 'https://demo.spreecommerce.org'

  for (const address of addresses) {
    test(`POST Request - Create Address - ${address.test_case}` , async ({ request }) => {
      const response = await request.post(`${baseUrl}/api/v2/storefront/account/addresses`, {
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Authorization': `Bearer ${token}`,
        },
        data: {
          "address":address.data
        }
      })
      
      const responseBody = JSON.parse(await response.text())
      expect(response.status()).toBe(200);
      expect(responseBody.data.attributes.address1).toBe(address.data.address1)
      expect(responseBody.data.attributes.firstname).toBe(address.data.firstname)
    })
  }
})