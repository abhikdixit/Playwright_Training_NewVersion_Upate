const { test, expect, request } = require('@playwright/test');

test('Get country info from GraphQL API', async () => {
  const apiContext = await request.newContext({
    baseURL: 'https://countries.trevorblades.com',
    extraHTTPHeaders: {
      'Content-Type': 'application/json'
    }
  });

  const query = `
    query {
      country(code: "IN") {
        name
        currency
        continent {
          name
        }
      }
    }
  `;

  const response = await apiContext.post('', {
    data: {
      query: query
    }
  });

  const resBody = await response.json();
  console.log(resBody);
  expect(resBody.data.country.name).toBe('India');
});
