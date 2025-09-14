const { devices } = require('@playwright/test');
/* @type {import('@playwright/test').PlaywrightTestConfig} */

const config = {
    globalSetup: require.resolve('./OrangeHRM_Login_Setup'),
    workers: 2,
    retries: 1,
    reporter: 'html',
    use: {
        // Tell all tests to load signed-in state from 'storageState.json'.
        storageState: './tests/OrangeHRM/storageState.json',
        headless: false,
        //viewport: { width: 1280, height: 720 },
        launchOptions: {
            //If want to run your scripts in slow mode
            //slowMo: 1000,
        },
        testDir: './tests/OrangeHRM/',
        //testMatch: /.*\.e2e\.js/,
        video: "on",

    },
    projects: [
        // {
        //     name: 'Chromium',
        //     use: { browserName: 'chromium' },
        // },
        /* {
            name: 'firefox',
            use: {
            ...devices['Desktop Firefox'],
            }
          },*/

        {

            name: 'Webkit',

            use: { browserName: 'webkit' },

        },



        // Test against mobile viewports.

        /*{
    
          name: 'Mobile chromium',
    
          use: devices['iPhone 12'],
    
        },*/

    ],

};



module.exports = config;