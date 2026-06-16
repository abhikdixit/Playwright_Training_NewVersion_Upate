import { test, expect, APIResponse } from '@playwright/test';
//APIResponse is a TypeScript type/interface provided by Playwright. 
// It is used to tell TypeScript that the response variable will contain an API response object.
test('SOAP Calculator Add API Test', async ({ request }) => {

  const soapBody: string = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                 xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <Add xmlns="http://tempuri.org/">
        <intA>10</intA>
        <intB>20</intB>
      </Add>
    </soap:Body>
  </soap:Envelope>`;

  const response: APIResponse = await request.post(
    'http://www.dneonline.com/calculator.asmx',
    {
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        SOAPAction: '"http://tempuri.org/Add"', // no quotes needed around key
      },
      data: soapBody,
    }
  );

  // Validate status first
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const body: string = await response.text();
  console.log(body);

  // Assertion
  expect(body).toContain('<AddResult>30</AddResult>');
});