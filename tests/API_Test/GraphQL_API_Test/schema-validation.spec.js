const { test, expect, request } = require('@playwright/test');

const GRAPHQL_API = 'https://countries.trevorblades.com/';

test.describe('GraphQL Schema Validation - Countries API', () => {

  let apiContext;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({
      baseURL: GRAPHQL_API,
      extraHTTPHeaders: {
        'Content-Type': 'application/json'
      }
    });
  });

  test('✅ Valid GraphQL Query - country by code', async () => {
    const validQuery = `
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
      data: { query: validQuery }
    });

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.errors).toBeFalsy();
    expect(body.data.country.name).toBe('India');
    expect(body.data.country.continent.name).toBe('Asia');
  });

  test('❌ Invalid GraphQL Query - field not in schema', async () => {
    const invalidQuery = `
      query {
        country(code: "IN") {
          name
          population   # Invalid: 'population' field is not in schema
        }
      }
    `;

    const response = await apiContext.post('', {
      data: { query: invalidQuery }
    });

    const body = await response.json();
    console.log(body);
    expect(response.status()).toBe(200);
    expect(body.errors).toBeTruthy();
    expect(body.errors[0].message).toContain("Cannot query field \"population\" on type \"Country\".");
  });

});
