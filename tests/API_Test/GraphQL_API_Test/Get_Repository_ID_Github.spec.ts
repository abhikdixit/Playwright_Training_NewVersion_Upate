// tests/github-get-repo-id.spec.js
import { test, expect, request } from '@playwright/test';
require('dotenv').config();

test('Get GitHub repository ID using GraphQL', async () => {
  const OWNER = 'abhikdixit';
  const NAME = 'playwright-api-automation_GraphQL';

  const apiContext = await request.newContext({
    baseURL: 'https://api.github.com',
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  const query = `
    query {
      repository(owner: "${OWNER}", name: "${NAME}") {
        id
        name
        url
      }
    }
  `;

  const response = await apiContext.post('/graphql', { data: { query } });

  expect(response.ok()).toBeTruthy();

  const result = await response.json();

  if (result.errors) {
    console.error('❌ GraphQL Error:', result.errors);
    throw new Error('GraphQL query failed');
  }

  const repo = result.data.repository;
  console.log(`📦 Repository Name: ${repo.name}`);
  console.log(`🔗 Repository URL: ${repo.url}`);
  console.log(`🆔 Repository ID: ${repo.id}`);

  expect(repo.id).toBeDefined();
});
