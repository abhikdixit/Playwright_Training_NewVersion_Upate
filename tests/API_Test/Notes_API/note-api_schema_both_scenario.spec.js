const { test, expect, request } = require('@playwright/test');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { noteSchema } = require('../schema/note.schema');

const ajv = new Ajv();
addFormats(ajv);
const validateSchema = ajv.compile(noteSchema);

// 🔐 Replace with a valid token
const token = 'da217bd372f0419ea58d6e38ef3541a12782bfcfb8474540afbff40c28ff4bcb';

const testCases = [
  {
    name: '✅ Positive - Valid note creation',
    data: {
      title: 'Valid Title',
      description: 'A well-formed note',
      category: 'Work',
    },
    expectedStatus: 200,
    expectValidSchema: true,
  },
  {
    name: '❌ Negative - Missing title',
    data: {
      description: 'Missing title field',
      category: 'Home',
    },
    expectedStatus: 400,
    expectValidSchema: false,
  },
  {
    name: '❌ Negative - Empty category',
    data: {
      title: 'Title',
      description: 'No category provided',
      category: '',
    },
    expectedStatus: 400,
    expectValidSchema: false,
  },
  {
    name: '❌ Negative - All fields missing',
    data: {},
    expectedStatus: 400,
    expectValidSchema: false,
  },
];

test.describe('🧪 Create Note API - Parametrized Tests', () => {
  for (const testCase of testCases) {
    test(testCase.name, async () => {
      const context = await request.newContext();
      const response = await context.post('https://practice.expandtesting.com/notes/api/notes', {
        headers: {
          'Content-Type': 'application/json',
            'x-auth-token': `${token}`,
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
        console.log('❌ Schema mismatch as expected:', validateSchema.errors);
      }
    });
  }
});
