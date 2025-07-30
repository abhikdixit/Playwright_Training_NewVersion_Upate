import { test, expect, request } from '@playwright/test';
require('dotenv').config();

// ✅ Correct variable names
const REPO_OWNER = 'abhikdixit';
const REPO_NAME = 'playwright-api-automation_GraphQL';

test('🐛 Create and 🗑 Close GitHub Issue via GraphQL Mutation', async () => {
  const token = process.env.GITHUB_TOKEN;

  const apiContext = await request.newContext({
    baseURL: 'https://api.github.com/graphql',
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  // Step 1️⃣: Fetch Repository ID
  const repoQuery = `
    query {
      repository(owner: "${REPO_OWNER}", name: "${REPO_NAME}") {
        id
      }
    }
  `;

  const repoResponse = await apiContext.post('', { data: { query: repoQuery } });
  const repoBody = await repoResponse.json();
  const repoId = repoBody?.data?.repository?.id;
  expect(repoId).toBeDefined();

  // Step 2️⃣: Create Issue
  const createIssueMutation = `
    mutation CreateIssue($repoId: ID!, $title: String!) {
      createIssue(input: {repositoryId: $repoId, title: $title}) {
        issue {
          id
          number
          title
          state
        }
      }
    }
  `;

  const issueTitle = `Test Issue - ${new Date().toISOString()}`;

  const createResponse = await apiContext.post('', {
    data: {
      query: createIssueMutation,
      variables: {
        repoId,
        title: issueTitle,
      },
    },
  });

  const createBody = await createResponse.json();
  const issue = createBody?.data?.createIssue?.issue;
  expect(issue).toBeDefined();
  console.log(`✅ Created issue #${issue.number}: ${issue.title}`);

  // Step 3️⃣: Close the Issue
  const closeIssueMutation = `
    mutation CloseIssue($issueId: ID!) {
      closeIssue(input: { issueId: $issueId }) {
        issue {
          number
          title
          state
        }
      }
    }
  `;

  const closeResponse = await apiContext.post('', {
    data: {
      query: closeIssueMutation,
      variables: { issueId: issue.id },
    },
  });

  const closeBody = await closeResponse.json();
  const closedIssue = closeBody?.data?.closeIssue?.issue;

  expect(closedIssue).toBeDefined();
  expect(closedIssue.state).toBe('CLOSED');
  console.log(`🗑 Closed issue #${closedIssue.number}: ${closedIssue.title}`);
});
