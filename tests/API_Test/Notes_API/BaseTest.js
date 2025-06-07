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

async function Creating_notes_and_generating_id(token , request) {
    const baseUrl = 'https://practice.expandtesting.com'
    console.log("Creating a new note and generating a unique id....")
    var id;
    const response = await request.post(`${baseUrl}/notes/api/notes`, {

        headers: {
          'x-auth-token': `${token}`,
        },
        data:
        {         
            title: "Playwright_Notes_Newly_Created",
            description: "Done via API",
            category: "Work"
          },
    })
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    console.log(responseBody)
    expect(responseBody.message).toBe('Note successfully created')
    expect(responseBody.data.title).toBe('Playwright_Notes_Newly_Created')
    id = responseBody.data.id
    return id
    }
    

export{AccessToken}
export{Creating_notes_and_generating_id}