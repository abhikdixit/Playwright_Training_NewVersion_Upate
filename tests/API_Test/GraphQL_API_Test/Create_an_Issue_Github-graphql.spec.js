// tests/github-create-issue.spec.js
const { test, expect, request } = require('@playwright/test');
require('dotenv').config();

test('Create a new issue in GitHub repo using GraphQL', async () => {
  const OWNER = 'abhikdixit';
  const NAME = 'playwright-api-automation_GraphQL';

  const apiContext = await request.newContext({
    baseURL: 'https://api.github.com',
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  // Step 1: Get repository ID
  const repoQuery = `
    query {
      repository(owner: "${OWNER}", name: "${NAME}") {
        id
        name
        url
      }
    }
  `;

  const repoResponse = await apiContext.post('/graphql', { data: { query: repoQuery } });
  expect(repoResponse.ok()).toBeTruthy();
  const repoResult = await repoResponse.json();
  const repoId = repoResult.data.repository.id;

  // Step 2: Create an issue using mutation
  const issueMutation = `
    mutation {
      createIssue(input: {
        repositoryId: "${repoId}",
        title: "Playwright Test Issue",
        body: "This issue was created during an automated Playwright GraphQL test run."
      }) {
        issue {
          id
          number
          url
        }
      }
    }
  `;

  const issueResponse = await apiContext.post('/graphql', { data: { query: issueMutation } });
  expect(issueResponse.ok()).toBeTruthy();

  const issueResult = await issueResponse.json();
  const issue = issueResult.data.createIssue.issue;

  console.log(`✅ Issue created: #${issue.number} → ${issue.url}`);
  expect(issue.url).toContain('/issues/');
});
