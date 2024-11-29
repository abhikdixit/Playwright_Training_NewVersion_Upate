const { test, expect } = require('@playwright/test');
const fs = require('fs');
let objects = fs.readFileSync('tests/Spreecom_API_Minh/utils/Spree_Bad_Address.json')
const testcases = JSON.parse(objects);
import getToken from "../common/BaseTest";

let token;
let username = "tdd@spree.com";
let password = "spree123";


test.beforeAll(async ({ }) => {
    token = await getToken(username, password);
    console.log(token)
})


test.describe('API Testing - Create Bad Address- Verify Error', () => {
    const baseUrl = 'https://demo.spreecommerce.org';

    for (const testcase of testcases) {

        test(`Spree: ${testcase.expResult}`, async ({ request }) => {

            const response = await request.post(`${baseUrl}/api/v2/storefront/account/addresses`, {

                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Authorization': `Bearer ${token}`,
                },
                data:
                {
                    "address": testcase.address
                }
            })

            const responseBody = JSON.parse(await response.text())
            console.log(responseBody);
            switch (testcase.expResult) {
                case "valid":
                    expect(response.status()).toBe(200);
                    expect(responseBody.data.attributes.address1).toBe(testcase.address.address1)
                    expect(responseBody.data.attributes.firstname).toBe(testcase.address.firstname)
                    // id = responseBody.data.id
                    // console.log(id)
                    break;
                    
                default:
                    expect(response.status()).toBe(422);
                    let error_mes = responseBody.error;
                    console.log(error_mes);
                    expect(error_mes).toBe(testcase.expResult);
                    break;
            }
        })
    }
})