const { test, expect } = require('@playwright/test')
var res;
var restext
function setRes(response) { res = response }

function actStatus() { return res.status(); }
function testStatus(expStatus) {
    expect(actStatus()).toBe(expStatus)
}

async function getResText() { restext = await res.text() }
function testEmpty() { expect(restext).toBe('') }
function testNonHtml() {
    //eg if html, cannot parse json - - if html: fail and print title
    if (restext[0] == '<') {
        expect(null).toBeTruthy()
    }
}

function resJson() { return JSON.parse(restext) }

function getJsonVal(key) { return resJson()[key] }
function testJsonValTruthy(key) { expect(getJsonVal(key)).toBeTruthy() }
function testJsonVal(key, val) { expect(getJsonVal(key)).toBe(val) }
function testJsonKeylistVal(keylist, val) {
    let obj = resJson()
    keylist.forEach((key)=> {obj = obj[key]})
    expect(obj).toBe(val)
}

export {setRes, actStatus, testStatus, getResText, testEmpty, testNonHtml, getJsonVal, testJsonValTruthy, testJsonVal, testJsonKeylistVal}