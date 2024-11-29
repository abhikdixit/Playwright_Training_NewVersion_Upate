const { test, expect }= require('@playwright/test')

async function AccessToken(email, password, request) {
    const baseUrl = 'https://practice.expandtesting.com'
    console.log("Getting Access Token....")
    let token;
    const response = await request.post(`${baseUrl}/notes/api/users/login`, {
      data: {
        "email": email,
        "password": password
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.data.token).toBeTruthy()
    token = responseBody.data.token
    console.log(token)
    return token
}

export{AccessToken}