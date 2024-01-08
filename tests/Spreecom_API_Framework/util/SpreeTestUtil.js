const { test, expect } = require('@playwright/test')
import {setBasePath, resetBasePath, setContentTypeJson, setBody, setToken, resetReqObj, response} from './RequestUtil'
import  {setRes, actStatus, testStatus, getResText, testEmpty, testNonHtml, getJsonVal, testJsonValTruthy} from './ResponseUtil'

async function CreateToken(un, pw, request) {
    test.setTimeout(120000)
    console.log("Getting token....")
    setBasePath('/spree_oauth/token')
    setBody({
        "grant_type": "password",
        "username": un,
        "password": pw
    }) 
    setRes( await response(request, 'post') )

    await getResText()
    testNonHtml() //eg if html, cannot parse json - if html: fail and print title

    testStatus(200)
    testJsonValTruthy('access_token')
    console.log("Created token -> ", getJsonVal('access_token'))

    resetBasePath()
    resetReqObj()
    return getJsonVal('access_token')
}

async function getAllAddresses(token, request) {
    test.setTimeout(120000)
    console.log("Getting all addresses....")
    setBasePath('/api/v2/storefront/account/addresses')
    setContentTypeJson()
    setToken(token)

    setRes( await response(request, 'get') )

    await getResText()
    testNonHtml() //eg if html, cannot parse json - if html: fail and print title

    testStatus(200)
    testJsonValTruthy('data')
    
    resetBasePath()
    resetReqObj()
    return getJsonVal('data')
}

async function deleteAddress(token, id, request) {
    test.setTimeout(120000)
    console.log("Deleting address " +id + "....")
    setBasePath('/api/v2/storefront/account/addresses/'+id)
    setToken(token)

    setRes( await response(request, 'delete') )

    await getResText()
    testEmpty()
    testStatus(204)
    resetBasePath()
    resetReqObj()
}

export {CreateToken, getAllAddresses, deleteAddress}