import { expect, APIRequestContext } from '@playwright/test'

async function CreateUser(name: string, job: string, request: APIRequestContext): Promise<string> {
  const baseUrl = 'https://reqres.in/api'
  console.log("Getting User ID....")
  
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
  
  const cust_id = responseBody.id
  console.log(responseBody)
  return cust_id
}

export { CreateUser }