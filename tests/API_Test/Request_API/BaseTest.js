const { test, expect }= require('@playwright/test')

async function CreateUser(name, job, request) {
    const baseUrl = 'https://reqres.in/api'
    console.log("Getting User ID....")
    let cust_id;
    const response = await request.post(`${baseUrl}/users`, {
        data: {
          "name": name,
          "job": job
      },
      })
      const responseBody = JSON.parse(await response.text())
      expect(response.status()).toBe(201)
      expect(responseBody.name).toBe(name)
      console.log(responseBody.id)
      cust_id = responseBody.id
      console.log(responseBody)
    return cust_id
}

export{CreateUser}