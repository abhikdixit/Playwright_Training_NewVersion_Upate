const { test, expect } = require('@playwright/test')
import { CreateToken } from '.././util/SpreeTestUtil'
import { addresses } from '.././testdata/SpreeCreateAddresses.json';
import { setBasePath, resetBasePath, setContentTypeJson, setBody, setToken, resetReqObj, response } from '.././util/RequestUtil'
import { setRes, actStatus, testStatus, getResText, testEmpty, testNonHtml, getJsonVal, testJsonValTruthy, testJsonKeylistVal } from '.././util/ResponseUtil'

test.describe('API Testing', () => {
  test.setTimeout(120000)
  var token
  test.beforeAll(async ({ request }) => {
    token = await CreateToken("nice@spree.com", "spree123", request)
    expect(token).toBeTruthy();
  })

  addresses.forEach((address, index) => {
    console.log('test', address)
    test('POST Request - Create Address ' + index + 1, async ({ request }) => {
      setBasePath('/api/v2/storefront/account/addresses')
      setContentTypeJson()
      setToken(token)
      setBody({ "address": address })
      setRes(await response(request, 'post'))

      await getResText()
      testNonHtml() //eg if html, cannot parse json - if html: fail and print title

      testStatus(200)

      testJsonKeylistVal(['data', 'attributes', 'address1'], address.address1)
      testJsonKeylistVal(['data', 'attributes', 'firstname'], address.firstname)

      resetBasePath()
      resetReqObj()
    })
  })


})