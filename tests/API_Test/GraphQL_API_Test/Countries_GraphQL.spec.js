// api.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Countries GraphQL API', () => {
  const endpoint = 'https://countries.trevorblades.com/';

  test('list all countries and check count', async ({ request }) => {
    const response = await request.post(endpoint, {
      data: {
        query: `
          query {
            countries {
              code
              name
            }
          }
        `
      }
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.data?.countries).toHaveLength(250); // this API returns 250 countries :contentReference[oaicite:1]{index=1}
    expect(body.data.countries[0]).toHaveProperty('code');
    expect(body.data.countries[0]).toHaveProperty('name');
  });

  test('filter specific country by code (DE)', async ({ request }) => {
    const response = await request.post(endpoint, {
      data: {
        query: `
          query {
            countries(filter: { code: { eq: "DE" } }) {
              code
              name
              capital
              currency
              languages {
                code
                name
              }
            }
          }
        `
      }
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    const countries = body.data?.countries;
    expect(countries).toHaveLength(1);
    const de = countries[0];
    expect(de.code).toBe('DE');
    expect(de.name).toBe('Germany');
    expect(de.capital).toBeDefined();
    expect(de.currency).toContain('EUR');
  });

  test('query continent with variable (EU)', async ({ request }) => {
    const response = await request.post(endpoint, {
      data: {
        query: `
          query ContinentQuery($code: ID!) {
            continent(code: $code) {
              code
              name
              countries {
                code
                name
                emoji
              }
            }
          }
        `,
        variables: { code: 'EU' }
      }
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    const cont = body.data?.continent;
    expect(cont).toBeTruthy();
    expect(cont.code).toBe('EU');
    expect(cont.name).toBe('Europe');
    expect(cont.countries).toContainEqual(expect.objectContaining({ name: 'Belgium' }));
    expect(cont.countries).not.toContainEqual(expect.objectContaining({ name: 'America' }));
  });
});
