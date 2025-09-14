import { test, expect, request } from '@playwright/test'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { noteSchema } from '../schema/note.schema'
import { AccessToken } from './BaseTest'

test.describe('Create Notes API Testing', () => {
  const baseUrl = 'https://practice.expandtesting.com'
  let token: string

  test.beforeAll(async ({ request }) => {
    token = await AccessToken("testing@abc.com", "test1234", request)
    expect(token).toBeTruthy()
  })

  test('Validate Create Note API response schema', async () => {
    const context = await request.newContext()
    
    const response = await context.post('https://practice.expandtesting.com/notes/api/notes', {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${token}`,
      },
      data: {
        // title is intentionally missing
        description: 'Missing title test',
        category: 'Work'
      }
    })

    // Expect it to return a 400 or 422 (client error)
    expect([400, 422]).toContain(response.status())

    const body = await response.json()
    console.log('💡 Negative Response:', body)

    // Expect the response to NOT match the success schema
    const ajv = new Ajv()
    addFormats(ajv)
    const validate = ajv.compile(noteSchema)
    const isValid = validate(body)

    // Schema should NOT validate (because it's not a success object)
    expect(isValid).toBe(false)
    console.log('❌ Schema validation failed as expected: ', validate.errors)
  })
})