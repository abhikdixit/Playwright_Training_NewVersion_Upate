const { test, expect }= require('@playwright/test')
const fs = require('fs')

test.describe('API Testing', () => {
  const baseUrl = 'https://demo.spreecommerce.org'
  const jsonData = fs.readFileSync('tests/spree/utils/Contries_ISO.json', 'utf8')
  const dataArray = JSON.parse(jsonData);
  for(const data of dataArray){
    test('Get Country' + data.iso, async ({ request }) => {
      const response = await request.get(`${baseUrl}/api/v2/storefront/countries/${data.iso}`)
      expect(response.status()).toBe(200)
  
      const responseBody = JSON.parse(await response.text())
      console.log(responseBody)
      expect(response.status()).toBe(200)
      expect(responseBody.data.attributes.iso_name).toBe(data.iso_name)
    })
  }
  
})