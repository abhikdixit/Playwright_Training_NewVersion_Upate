// tests/github-graphql.spec.js
import { test, expect, request } from '@playwright/test';
require('dotenv').config();

test('GitHub GraphQL API - Get current user info', async () => {
  const apiContext = await request.newContext({
    baseURL: 'https://api.github.com/graphql',
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  const query = `
    query {
      viewer {
        login
        name
        email
        bio
      }
    }
  `;

  const response = await apiContext.post('', {
    data: { query },
  });

  expect(response.ok()).toBeTruthy();

  const result = await response.json();
  const { login, name, email, bio } = result.data.viewer;

  console.log(`✅ GitHub User: ${login}`);
  console.log(`👤 Name: ${name}`);
  console.log(`📧 Email: ${email}`);
  console.log(`� Bio: ${bio}`);
  expect(login).toBeDefined();
});
