// @ts-check

// Read environment variables from file.
require('dotenv').config();
import { devices } from '@playwright/test';

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

  // @ts-ignore
  //globalSetup: require.resolve('./OrangeHRM_Login_Setup'),
  //globalSetup: require.resolve('./WebOrder_Login_Setup'),
  //globalSetup: "./global-setup",
  //testDir: './tests/',
  //testDir: './tests/UI_Tests/',

  //testDir: './tests/UI_Special_Control/',
  testDir: './tests/NICE_GUI_Tests/',
  //testDir: './tests/Assignments/',
  //testDir: './tests/API_Test/',
  //testDir: './tests/API_Test/Restful-booker_API/',
  //testDir: './tests/Mock_API_Test/',
  //testDir: './tests/OrangeHRM/',
  //testDir: './tests/ZeroBank_Test_PageObject/',
  //testDir: './tests/Spreecom_API_Framework/',
  //testDir: './tests/Spreecom_API_Minh/API_test/',
  //testDir:'./tests/API_Test/Request_API/',
  //testDir:'./tests/API_Test/Notes_API/',
  //testDir: './tests/Salesforce_Test',
  /* Maximum time one test can run for. */
  //timeout: 60000,
  
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    //timeout: 7000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  workers:1,
  //retries: 2,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  reporter: [['html', { open: 'never' }]],
  //reporter: [["line"], ["allure-playwright"]],
  //reporter: [["html"], ["allure-playwright"]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    //baseURL: 'http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx',
    //baseURL: 'https://practice.expandtesting.com/',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    //video: 'on-first-retry',
    //video: 'retain-on-failure',
    screenshot: 'on',
    // slowMo: 1000, // Moved to launchOptions in project config if needed
    // Tell all tests to load signed-in state from 'storageState.json'.
    //storageState: './tests/OrangeHRM/WebOrderState.json',
    //storageState: './tests/OrangeHRM/storageState.json',
    video: 'on',
    //screenshot: 'only-on-failure',
    //screenshot: 'only-on-failure',
    //storageState: "./LoginAuth.json"
    //viewport: { width: 1920, height: 1080 },
    headless: false,
    //trace : 'on',
    // To bypass Certificate error.
    ignoreHTTPSErrors:true
    //viewport: { width: 680, height: 520 }

  },

  /* Configure projects for major browsers */
  projects: [
   {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport:{width:1536,height:864},
        //colorScheme: 'dark',
        launchOptions: {
          //slowMo: 1000,
           //args:["--start-fullscreen"]
           //args:["--start-maximized"]
        }
      },
    },
    
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' }, // or 'msedge-dev'
    // },
  //     {
  //        name: 'firefox',
  //        use: {
  //        ...devices['Desktop Firefox'],
  //        launchOptions:{
  //         args:["--start-maximized"]
  //        }
  //      },
  //     },
  //  {
  //     name: 'webkit',
  //     use: {
  //       ...devices['Desktop Safari'],
  //       //viewport:{width:1536,height:864}
  //       // launchOptions:{
  //       //   args:["--start-maximized"]
  //       //  }
  //      },
  //     },
    
     // Test against mobile viewports. */
      //  {
      //    name: 'Mobile Chrome',
      //    use: {
      //      ...devices['iPhone 14 Pro Max'],
      //    },
      //  },
    /* {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },*/
    /* Test against mobile viewports. */
    //  {
    //    name: 'Mobile Chrome',
    //    use: {
    //      ...devices['iPad Mini'],
    //    },
    //  },
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

export default config;