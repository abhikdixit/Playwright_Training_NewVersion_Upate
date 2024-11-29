const { test, expect } = require('@playwright/test');
const fs = require('fs');
let objects = fs.readFileSync('tests/Spreecom_API_Minh/utils/Spree_Add_Update_Address.json')
const data = JSON.parse(objects);
import getToken from "../common/BaseTest";
let token;
let username = "minh@spree.com";
let password = "123456";
let old_address;
let new_address;

test.beforeAll(async ({}) => {
    token = await getToken(username, password);
    old_address = data.old_address;
    new_address = data.new_address;
})

test.describe('API Testing', () => {
    const baseUrl = 'https://demo.spreecommerce.org';
    test('POST Request - Add and Update an Address', async ({ request }) => {
        console.log(old_address);
        let response = await request.post(`${baseUrl}/api/v2/storefront/account/addresses`, {

            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Authorization': `Bearer ${token}`,
            },
            data:
            {
                "address": old_address
            }
        }) 

        let responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200);
        expect(responseBody.data.attributes.address1).toBe("123 Main St")
        expect(responseBody.data.attributes.city).toBe('Dallas')

        //grab the id of the newly created address
        let id = responseBody.data.id
        //update address
        response = await request.patch(`${baseUrl}/api/v2/storefront/account/addresses/${id}`, {

            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Authorization': `Bearer ${token}`,
            },
            data:
            {
                "address": new_address
            }
        })

        responseBody = JSON.parse(await response.text())
        console.log(responseBody);
        expect(response.status()).toBe(200);
        expect(responseBody.data.attributes.address1).toBe("775 Old Georgetown Road")
        expect(responseBody.data.attributes.city).toBe('Qethesda')
    })
})