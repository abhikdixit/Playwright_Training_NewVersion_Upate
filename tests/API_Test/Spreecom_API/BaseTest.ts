const { test, expect }= require('@playwright/test')

async function CreateToken(un, pw, request) {
    test.setTimeout(120000)
    console.log("Getting token....")
    let token;
    const response = await request.post("https://demo.spreecommerce.org/spree_oauth/token", {
        data: {
            "grant_type": "password",
            "username": un,
            "password": pw
        },
    })

    let resptext = await response.text()
    if (resptext[0] == '<') {
        console.log(resptext.split('title')[1])
        return null
    }
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.access_token).toBeTruthy()
    token = responseBody.access_token
    console.log("Created token -> ", token)
    return token
}

export{CreateToken}