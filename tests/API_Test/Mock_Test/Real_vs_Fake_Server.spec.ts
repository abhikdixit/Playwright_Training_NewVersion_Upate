import { test, expect } from '@playwright/test';
import nock from 'nock';

test('Create Note - Real or Fake API', async () => {

  const apiMode = process.env.API_MODE ?? 'FAKE';

  const baseUrl = 'https://practice.expandtesting.com';

  const apiEndpoint = '/notes/api/notes';


  const requestBody = {
    title: 'Testing',
    description: 'Welcome',
    category: 'Home'
  };


  // -------------------------------
  // Configure Mock API
  // -------------------------------

  if (apiMode.toUpperCase() === 'FAKE') {

    console.log('Running against MOCK API');


    nock(baseUrl)
      .post(apiEndpoint, requestBody)
      .reply(200, {

        success: true,
        status: 200,

        message: 'Note successfully created',

        data: {

          id: '6a3214fbc760c30296ca698d',

          title: 'Testing',

          description: 'Welcome',

          category: 'Home',

          completed: false,

          created_at: '2026-06-17T03:31:07.564Z',

          updated_at: '2026-06-17T03:31:07.564Z',

          user_id: '68b0018b6f7da0028a4b2976'

        }

      });


  } else {

    console.log('Running against REAL API');

  }



  // -------------------------------
  // API Call using Fetch
  // -------------------------------


  const response = await fetch(
    `${baseUrl}${apiEndpoint}`,
    {

      method: 'POST',

      headers: {

        'x-auth-token': process.env.AUTH_TOKEN || '',

        'Content-Type': 'application/x-www-form-urlencoded'

      },


      body: new URLSearchParams({

        title: requestBody.title,

        description: requestBody.description,

        category: requestBody.category

      })

    });



  // -------------------------------
  // Response Validation
  // -------------------------------


  expect(response.status).toBe(200);


  const responseBody = await response.json();


  console.log('Response:');

  console.log(
    JSON.stringify(responseBody, null, 2)
  );



  expect(responseBody.success)
    .toBeTruthy();



  expect(responseBody.message)
    .toContain('Note');



  // -------------------------------
  // Fake API Validation
  // -------------------------------

  if (apiMode.toUpperCase() === 'FAKE') {


    expect(responseBody.data.id)
      .toBe(
        '6a3214fbc760c30296ca698d'
      );


  } 


  // -------------------------------
  // Real API Validation
  // -------------------------------

  else {


    expect(responseBody.data.title)
      .toBe(requestBody.title);


    expect(responseBody.data.description)
      .toBe(requestBody.description);

  }



  // Verify mock was called

  if(apiMode.toUpperCase() === 'FAKE') {

    expect(
      nock.isDone()
    ).toBeTruthy();

  }


});