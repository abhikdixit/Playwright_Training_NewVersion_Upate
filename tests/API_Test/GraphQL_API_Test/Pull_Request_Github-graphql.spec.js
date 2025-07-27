// tests/API_Test/GraphQL_API_Test/Pull_Request_Github-graphql.spec.js
const { test, expect, request } = require('@playwright/test');
require('dotenv').config();

test('Create Pull Request via GitHub GraphQL API', async () => {
  const OWNER = 'abhikdixit';
  const REPO = 'playwright-api-automation_GraphQL';
  const BASE_BRANCH = 'main';
  const NEW_BRANCH = 'feature/test-branch';
  const FILE_PATH = 'hello.txt';
  const FILE_CONTENT = 'Hello from Playwright PR!';
  const COMMIT_MESSAGE = 'Added hello.txt via Playwright';
  const PR_TITLE = 'Automated PR: Add hello.txt';
  const PR_BODY = 'This pull request was created via Playwright and GitHub GraphQL API.';

  const api = await request.newContext({
    baseURL: 'https://api.github.com',
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
    },
  });

  // Step 1: Get base branch SHA
  const refRes = await api.get(`/repos/${OWNER}/${REPO}/git/ref/heads/${BASE_BRANCH}`);
  expect(refRes.ok()).toBeTruthy();
  const baseSha = (await refRes.json()).object.sha;
  console.log(`✅ Base branch "${BASE_BRANCH}" SHA: ${baseSha}`);

  // Step 2: Delete existing branch if it exists
  const branchExistsRes = await api.get(`/repos/${OWNER}/${REPO}/git/ref/heads/${NEW_BRANCH}`);
  if (branchExistsRes.ok()) {
    console.log(`⚠️ Branch "${NEW_BRANCH}" already exists. Deleting...`);
    const deleteRes = await api.delete(`/repos/${OWNER}/${REPO}/git/refs/heads/${NEW_BRANCH}`);
    expect(deleteRes.ok()).toBeTruthy();
    console.log(`🗑️ Deleted existing branch "${NEW_BRANCH}"`);
  } else {
    console.log(`✅ Branch "${NEW_BRANCH}" does not exist. Proceeding to create.`);
  }

  // Step 3: Create a new branch from main
  const createRef = await api.post(`/repos/${OWNER}/${REPO}/git/refs`, {
    data: {
      ref: `refs/heads/${NEW_BRANCH}`,
      sha: baseSha,
    },
  });
  expect(createRef.ok()).toBeTruthy();
  console.log(`🌿 Created branch "${NEW_BRANCH}"`);

  // Step 4: Create a blob (file content)
  const blobRes = await api.post(`/repos/${OWNER}/${REPO}/git/blobs`, {
    data: {
      content: FILE_CONTENT,
      encoding: 'utf-8',
    },
  });
  const blobSha = (await blobRes.json()).sha;

  // Step 5: Get base tree SHA
  const commitRes = await api.get(`/repos/${OWNER}/${REPO}/git/commits/${baseSha}`);
  const baseTreeSha = (await commitRes.json()).tree.sha;

  // Step 6: Create a new tree with the file
  const treeRes = await api.post(`/repos/${OWNER}/${REPO}/git/trees`, {
    data: {
      base_tree: baseTreeSha,
      tree: [
        {
          path: FILE_PATH,
          mode: '100644',
          type: 'blob',
          sha: blobSha,
        },
      ],
    },
  });
  const newTreeSha = (await treeRes.json()).sha;

  // Step 7: Create a commit
  const commitCreateRes = await api.post(`/repos/${OWNER}/${REPO}/git/commits`, {
    data: {
      message: COMMIT_MESSAGE,
      tree: newTreeSha,
      parents: [baseSha],
    },
  });
  const commitSha = (await commitCreateRes.json()).sha;

  // Step 8: Update branch with new commit
  const updateRef = await api.patch(`/repos/${OWNER}/${REPO}/git/refs/heads/${NEW_BRANCH}`, {
    data: {
      sha: commitSha,
      force: true,
    },
  });
  expect(updateRef.ok()).toBeTruthy();
  console.log(`✅ Updated "${NEW_BRANCH}" with new commit`);

  // Step 9: Create Pull Request via GraphQL
  const gql = await request.newContext({
    baseURL: 'https://api.github.com/graphql',
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  const repoId = await getRepoId(api, OWNER, REPO);

  const prQuery = `
    mutation {
      createPullRequest(input: {
        repositoryId: "${repoId}",
        baseRefName: "${BASE_BRANCH}",
        headRefName: "${NEW_BRANCH}",
        title: "${PR_TITLE}",
        body: "${PR_BODY}"
      }) {
        pullRequest {
          number
          url
        }
      }
    }
  `;

  const prRes = await gql.post('', { data: { query: prQuery } });
  const prResult = await prRes.json();

  if (prResult.errors) {
    console.error('❌ PR Creation Error:', prResult.errors);
    throw new Error('Failed to create pull request.');
  }

  const pr = prResult.data.createPullRequest.pullRequest;
  console.log(`✅ Pull Request Created: ${pr.url}`);
  expect(pr.url).toBeDefined();
});

// Helper: Fetch repository ID using GraphQL
async function getRepoId(api, owner, repo) {
  const gql = await request.newContext({
    baseURL: 'https://api.github.com/graphql',
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  const query = `
    query {
      repository(owner: "${owner}", name: "${repo}") {
        id
      }
    }
  `;
  const res = await gql.post('', { data: { query } });
  const json = await res.json();
  return json.data.repository.id;
}
