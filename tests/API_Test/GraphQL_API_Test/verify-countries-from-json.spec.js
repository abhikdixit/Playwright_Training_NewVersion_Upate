import { test, expect, request } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

// Reads the JSON file from TestData directory
const countriesDataPath = join(__dirname, '../../../TestData/GraphQL_Countries.json');
const countriesData = JSON.parse(readFileSync(countriesDataPath, 'utf-8'));

const BASE_URL = 'https://countries.trevorblades.com/';

test.describe('Verify multiple country details using JSON data', () => {
  let apiContext;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json'
      }
    });
  });

  countriesData.forEach(country => {
    test(`✅ Verify country details for: ${country.code}`, async () => {
      const query = `
        query GetCountry($code: ID!) {
          country(code: $code) {
            name
            currency
            capital
          }
        }
      `;

      const response = await apiContext.post('', {
        data: {
          query,
          variables: { code: country.code }
        }
      });

      const body = await response.json();
      expect(body.errors).toBeFalsy();

      const result = body.data.country;
      const expected = country.expected;

      // Name Check
      expect(result.name).toBe(expected.name);

      // Currency Check (supports multiple comma-separated values)
      if (expected.currency && result.currency) {
        const actualCurrencies = result.currency.split(',').map(s => s.trim());
        const expectedCurrencies = expected.currency.split(',').map(s => s.trim());

      for (const currency of expectedCurrencies) {
        expect(actualCurrencies).toContain(currency); // partial match allowed
      }
      } else {
          expect(result.currency).toBe(expected.currency);
    }

      // Capital Check
      expect(result.capital).toBe(expected.capital);
    });
  });
});
