const { test, expect }= require('@playwright/test')

test.describe('API Testing', () => {
    const baseUrl = 'https://demo.spreecommerce.org'
    //var token

test('POST Request - Create Address', async ({ request }) => {
    //console.log(token)
    const response = await request.post(`${baseUrl}/api/v2/storefront/account/addresses`, {

      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': 'Bearer A-nQoBZDt3IBTxHDf0UZXLHEsAFM4v6p500n8_ONpWw',
      },
      data:
    {
        "address": {
          firstname: "Abhi",
          lastname: "K",
          address1: "BTM",
          address2: "2nd Floor",
          city: "Bethesda",
          phone: "3014445002",
          zipcode: "20814",
          state_name: "MD",
          country_iso: "US"
        },
    }})
    
    const responseBody = JSON.parse(await response.text())
    console.log(responseBody);
    expect(response.status()).toBe(200);
   
       expect(responseBody.data.attributes.address1).toBe('BTM')
       expect(responseBody.data.attributes.firstname).toBe('Abhi')
  })

  
  
})