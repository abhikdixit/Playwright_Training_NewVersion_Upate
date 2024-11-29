const { test, expect } = require('@playwright/test');
const fs = require('fs');
let objects = fs.readFileSync('tests/Spreecom_API_Minh/utils/Spree_Add_Update_Address.json')
const data = JSON.parse(objects);
import getToken from "../common/BaseTest";
let token;
let username = "nice@spree.com";
let password = "spree123";
let address;


test.beforeAll(async ({}) => {
    token = await getToken(username, password);
    address = data.old_address;
})

test.describe('API Testing', () => {
    const baseUrl = 'https://demo.spreecommerce.org';

    //creating an address
    test('POST Request - Add and Delete an Address', async ({ request }) => {
        
        let response = await request.post(`${baseUrl}/api/v2/storefront/account/addresses`, {

            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Authorization': `Bearer ${token}`,
            },
            data:
            {
                "address": address
            }
        }) 

        let responseBody = JSON.parse(await response.text())
        console.log(responseBody);
        expect(response.status()).toBe(200);
        expect(responseBody.data.attributes.address1).toBe("123 Main St")
        expect(responseBody.data.attributes.city).toBe('Dallas')

        //grab the id of the newly created address
        let id = responseBody.data.id
        //delete address
        response = await request.delete(`${baseUrl}/api/v2/storefront/account/addresses/${id}`, {

            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Authorization': `Bearer ${token}`
            }
        })
        expect(response.status()).toBe(204);
    })
})