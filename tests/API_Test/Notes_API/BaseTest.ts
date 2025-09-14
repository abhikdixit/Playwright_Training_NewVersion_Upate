import { expect, APIRequestContext } from '@playwright/test'

async function AccessToken(email: string, password: string, request: APIRequestContext): Promise<string> {
  const baseUrl = 'https://practice.expandtesting.com'
  console.log("Getting Access Token....")
  
  const response = await request.post(`${baseUrl}/notes/api/users/login`, {
    data: {
      "email": email,
      "password": password
    },
  })
  
  const responseBody = JSON.parse(await response.text())
  expect(response.status()).toBe(200)
  expect(responseBody.data.token).toBeTruthy()
  
  const token = responseBody.data.token
  console.log(token)
  return token
}

async function Creating_notes_and_generating_id(token: string, request: APIRequestContext): Promise<string> {
  const baseUrl = 'https://practice.expandtesting.com'
  console.log("Creating a new note and generating a unique id....")
  
  const response = await request.post(`${baseUrl}/notes/api/notes`, {
    headers: {
      'x-auth-token': `${token}`,
    },
    data: {
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
  
  const id = responseBody.data.id
  return id
}

async function deleteAllNotes(token: string, request: APIRequestContext): Promise<void> {
  const baseUrl = 'https://practice.expandtesting.com'
  console.log('Deleting all notes...')
  
  // Fetch existing notes
  const response = await request.get(`${baseUrl}/notes/api/notes`, {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    }
  })
  
  expect(response.status()).toBe(200)
  const responseBody = JSON.parse(await response.text())
  const notesIds = responseBody.data.map((note: any) => note.id)
  
  // Loop through each note ID and delete it
  for (const noteId of notesIds) {
    const deleteResponse = await request.delete(`${baseUrl}/notes/api/notes/${noteId}`, {
      headers: {
        'x-auth-token': token
      }
    })
    expect(deleteResponse.status()).toBe(200) // Assuming 200 is the success status for deletion
    console.log(`Deleted note ID: ${noteId}`)
  }
}

export { AccessToken, Creating_notes_and_generating_id, deleteAllNotes }