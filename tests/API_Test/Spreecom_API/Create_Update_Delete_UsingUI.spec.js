const { test, expect } = require('@playwright/test')

test.describe('API Testing', () => {
  const baseUrl = 'https://demo.spreecommerce.org'
  var token
  var id
  var fname
  test.beforeAll(async ({ request }) => {
    const response = await request.post(`${baseUrl}/spree_oauth/token`, {
      data: {
        "grant_type": "password",
        "username": "nice@spree.com",
        "password": "spree123"
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.access_token).toBeTruthy()
    token = responseBody.access_token
    console.log(token)
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

  test('POST Request - Update an Address', async ({ request }) => {
    console.log(token)
    const response = await request.patch(`${baseUrl}/api/v2/storefront/account/addresses/${id}`, {

      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`,
      },
      data:
      {
        "address": {
          firstname: "API",
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
    expect(responseBody.data.attributes.firstname).toBe('API')
    fname = responseBody.data.attributes.firstname
    console.log(fname)
  })

  /* test('Delete Request - Delete Address', async ({ request }) => {
     console.log(token)
     console.log(id)
     const response = await request.delete(`${baseUrl}/api/v2/storefront/account/addresses/${id}`, {
 
       headers: {
         'Content-Type': 'application/vnd.api+json',
         'Authorization': `Bearer ${token}`,
       },
      
     })
     
     
     expect(response.status()).toBe(204);
     
   })*/
  //Need to update as per Spreecom UI 
  test('TO Test Login Functionality-Writtern Scripts', async ({ page }) => {


    await page.goto('https://demo.spreecommerce.org/login');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('nice@spree.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('spree123');
    await page.getByRole('button', { name: 'Login' }).click();
    const MyAccount = page.locator("//h3[normalize-space()='My Account']")
    await expect(MyAccount).toHaveText("My Account")
    

  });
});

