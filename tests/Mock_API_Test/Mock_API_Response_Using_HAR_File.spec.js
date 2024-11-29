const { test, expect } = require('@playwright/test');

test('mocking api using the HAR file', async ({ page }) => {
    // Load the HAR file 
    await page.routeFromHAR('./tests/TestData/HAR_File/github_octocat.har', {
        url: 'https://api.github.com/users/octocat',
        update: false,
        "my_name": "Abhi",
        "login": "octocat",
        "id": 583231,

        "node_id": "MDQ6VXNlcjU4MzIzMQ==",
    });

    await page.goto('https://api.github.com/users/octocat');
});