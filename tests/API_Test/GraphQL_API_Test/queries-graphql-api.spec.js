const { test, expect, request } = require('@playwright/test');

const BASE_URL = 'https://countries.trevorblades.com/';

test.describe('GraphQL API Query Testing - Countries API', () => {

  let apiContext;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json'
      }
    });
  });

  test('✅ Basic Query - Get Country by Code', async () => {
    const query = `
      query {
        country(code: "IN") {
          name
          currency
          capital
        }
      }
    `;

    const response = await apiContext.post('', { data: { query } });
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.errors).toBeFalsy();
    expect(body.data.country.name).toBe('India');
  });

  test('✅ Nested Query - Country & Languages', async () => {
    const query = `
      query {
        country(code: "US") {
          name
          languages {
            name
            code
          }
        }
      }
    `;

    const response = await apiContext.post('', { data: { query } });
    const body = await response.json();

    expect(body.data.country.languages.length).toBeGreaterThan(0);
  });

  test('✅ Alias Query - Fetch Multiple Countries', async () => {
    const query = `
      query {
        india: country(code: "IN") {
          name
        }
        japan: country(code: "JP") {
          name
        }
      }
    `;

    const response = await apiContext.post('', { data: { query } });
    const body = await response.json();

    expect(body.data.india.name).toBe('India');
    expect(body.data.japan.name).toBe('Japan');
  });

  test('❌ Invalid Field Query - Should Trigger Error', async () => {
    const invalidQuery = `
      query {
        country(code: "IN") {
          name
          population  # ❌ Field not in schema
        }
      }
    `;

    const response = await apiContext.post('', { data: { query: invalidQuery } });
    const body = await response.json();

    expect(body.errors).toBeTruthy();
    expect(body.errors[0].message).toContain("Cannot query field \"population\" on type \"Country\".");
  });

  test('✅ Variable-based Query', async () => {
    const query = `
      query GetCountry($code: ID!) {
        country(code: $code) {
          name
          emoji
        }
      }
    `;

    const variables = { code: "BR" };

    const response = await apiContext.post('', {
      data: {
        query,
        variables
      }
    });

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.errors).toBeFalsy();
    expect(body.data.country.name).toBe('Brazil');
  });

});
