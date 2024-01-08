const { test, expect } = require("@playwright/test");
import getToken from "../common/BaseTest";
import getAllAddressIds from "../common/Get_All_Address";
let username = "minh@spree.com";
let password = "123456";
const token =  getToken(username, password)
const addressIds =  getAllAddressIds(token)

test.beforeAll(async ({}) => {
  token = await getToken(username, password);
  expect(token).toBeTruthy();
  addressIds = await getAllAddressIds(token);
  expect(addressIds).toBeTruthy();
});

test.describe("Delete address", async () => {
  const baseUrl = "https://demo.spreecommerce.org";
  for (let i = 0; i < addressIds.length; i++) {
    test(`second-test - ${i}`, async ({ request }) => {
      console.log(addressIds[i]);
      const response = await request.delete(
        `${baseUrl}/api/v2/storefront/account/addresses/${addressIds[i]}`,
        {
          headers: {
            "Content-Type": "application/vnd.api+json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      expect(response.status()).toBe(204);
    });
  }
});
