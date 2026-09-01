import { test, expect, request } from '@playwright/test';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { noteSchema } from '../schema/note.schema';
import { AccessToken } from './BaseTest';  // 👈 import your function

const ajv = new Ajv();
addFormats(ajv);
const validateSchema = ajv.compile(noteSchema);

const testCases = [
  {
    name: 'Positive - Valid note creation',
    data: {
      title: 'Valid Title',
      description: 'A well-formed note',
      category: 'Work',
    },
    expectedStatus: 200,
    expectValidSchema: true,
  },
  {
    name: ' Negative - Missing title',
    data: {
      description: 'Missing title field',
      category: 'Home',
    },
    expectedStatus: 400,
    expectValidSchema: false,
  },
  {
    name: ' Negative - Empty category',
    data: {
      title: 'Title',
      description: 'No category provided',
      category: '',
    },
    expectedStatus: 400,
    expectValidSchema: false,
  },
  {
    name: ' Negative - All fields missing',
    data: {},
    expectedStatus: 400,
    expectValidSchema: false,
  },
];

test.describe(' Create Note API - Parametrized Tests', () => {
  let token: string;

  //  Get token once before all tests
  test.beforeAll(async ({ request }) => {
    token = await AccessToken(
      'testing@abc.com',        //  replace with your real test user
      'pass1234',
      request
    );
  });

  for (const testCase of testCases) {
    test(testCase.name, async ({ request }) => {
      const response = await request.post('https://practice.expandtesting.com/notes/api/notes', {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        data: testCase.data,
      });

      const status = response.status();
      const body = await response.json();

      expect(status).toBe(testCase.expectedStatus);

      const isValidSchema = validateSchema(body);

      if (testCase.expectValidSchema) {
        expect(isValidSchema, JSON.stringify(validateSchema.errors, null, 2)).toBe(true);
      } else {
        expect(isValidSchema).toBe(false);
        console.log(' Schema mismatch as expected:', validateSchema.errors);
      }
    });
  }
});
