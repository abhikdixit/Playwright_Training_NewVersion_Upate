/*AJV (Another JSON Schema Validator) is a fast, powerful JSON Schema validator 
for JavaScript/Node.js. It's widely used to validate data (e.g., API 
requests/responses, configuration files) against a defined JSON Schema.*/

/*ajv-formats is a plugin for AJV that adds support for format validation like:

    "date-time"
    "email"
    "uri"
    "ipv4"
    "hostname"
    And more...
    JSON Schema itself allows "format" keyword, but ajv offloads that support to ajv-formats.

*/

const { test, expect, request } = require('@playwright/test');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { noteSchema } = require('../schema/note.schema');
import { AccessToken } from './BaseTest'

test.describe('Create Notes API Testing', () => {
  const baseUrl = 'https://practice.expandtesting.com'
  var token

  test.beforeAll(async ({ request }) => {
    token = await AccessToken("testing@abc.com", "test1234", request)
    expect(token).toBeTruthy();
  })
  

test('Validate Create Note API response schema', async () => {
  const context = await request.newContext();
  
  const response = await context.post('https://practice.expandtesting.com/notes/api/notes', {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': `${token}`,
    },
    data: {
      title: 'Testing',
      description: 'welcome to API',
      category: 'Home'
    }
  });

  expect(response.status()).toBe(200);
  const body = await response.json();

  // Validate JSON Schema
  const ajv = new Ajv();
  addFormats(ajv); // for date-time format
  const validate = ajv.compile(noteSchema);
  const isValid = validate(body);

  expect(isValid, JSON.stringify(validate.errors, null, 2)).toBe(true);
});
});