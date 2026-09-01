import { test, expect } from '@playwright/test';
import { AccessToken } from './BaseTest';
import notes from '../TestData/create_notes_testdata.json';

test.describe('Create Notes API Testing @sanity @E2E', () => {

  const baseUrl = 'https://practice.expandtesting.com';
  let token: string;

  test.beforeAll(async ({ request }) => {
    token = await AccessToken('testing@abc.com', 'pass1234', request);
    expect(token).toBeTruthy();
  });

  notes.forEach((note, index) => {

    test(`Create Note ${index + 1} - Expected Status ${note.statuscode}`, async ({ request }) => {

      const response = await request.post(`${baseUrl}/notes/api/notes`, {
        headers: {
          'x-auth-token': token
        },
        data: {
          title: note.title,
          description: note.description,
          category: note.category
        }
      });

      const responseBody = await response.json();

      console.log(`Test Case ${index + 1}`);
      console.log(responseBody);

      // Validate Status Code
      expect(response.status()).toBe(note.statuscode);

      if (note.statuscode === 200) {

        // Positive Validation
        expect(responseBody.success).toBe(true);
        expect(responseBody.message).toBe('Note successfully created');

        expect(responseBody.data.title).toBe(note.title);
        expect(responseBody.data.description).toBe(note.description);
        expect(responseBody.data.category).toBe(note.category);

        expect(responseBody.data.id).toBeTruthy();
        expect(responseBody.data.user_id).toBeTruthy();

      } else {

        // Negative Validation
        expect(
          responseBody.error || responseBody.message
        ).toBe(note.error);

      }

    });

  });

});