const { test, expect } = require('@playwright/test')
import { CreateToken, getAllAddresses, deleteAddress } from '.././util/SpreeTestUtil'
import { addresses } from '../../Spreecom_API_Framework/testdata/SpreeCreateAddresses.json'

import { setBasePath, resetBasePath, setContentTypeJson, setBody, setToken, resetReqObj, response } from '.././util/RequestUtil'
import { setRes, actStatus, testStatus, getResText, testEmpty, testNonHtml, getJsonVal, testJsonValTruthy, testJsonKeylistVal } from '.././util/ResponseUtil'

test.describe('API Testing', () => {
  test.setTimeout(120000)
  var token, addresses
  test.beforeAll(async ({ request }) => {
    token = await CreateToken("nice@spree.com", "spree123", request)
    expect(token).toBeTruthy();
  })

  test('', async ({request}) => {
    addresses = await getAllAddresses(token, request)
    expect(addresses).toBeTruthy();
    for (let i = 0; i < addresses.length; i++)
      await deleteAddress(token, addresses[i].id, request)
  })
})