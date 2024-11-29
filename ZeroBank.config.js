// @ts-check
require('dotenv').config();
const { devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();


/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  //globalSetup: "./global-setup",
  //testDir: './tests/UI_Tests/',
  //testDir: './tests/NICE_GUI_Tests/',
  //testDir: './tests/API_Test/',
  testDir: './tests/ZeroBank_Test_PageObject/',
  //testDir: './tests/Spreecom_API_Framework/',
  //testDir: './tests/Spreecom_API_Minh/test/',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  workers: 1,
  //retries: 1,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    //baseURL: 'https://demo.spreecommerce.org/',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    //video: 'on-first-retry',
    video: 'on',
    //screenshot:'on',
    screenshot: 'only-on-failure',
    //storageState: "./LoginAuth.json"
    //viewport: { width: 1280, height: 1020 }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
   /* {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' }, // or 'msedge-dev'
    },
    //  {
    //     name: 'firefox',
    //     use: {
    //     ...devices['Desktop Firefox'],
    //     },
    //   },

*/
  /*  {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    }*/

    /* Test against mobile viewports. */
     /* {
        name: 'Mobile Chrome',
        use: {
          ...devices['iPhone XR'],
        },
      },*/
    /* {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },*/
    /* Test against mobile viewports. */
    /* {
       name: 'Mobile Chrome',
       use: {
         ...devices['iPad Mini'],
       },
     },*/
    /* {
       name: 'Mobile Safari',
        use: {
          ...devices['iPhone 12'],
        },
      },*/

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

module.exports = config;
