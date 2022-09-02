// @ts-check
const { devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();


/*    - undo
 /* @see https://playwright.dev/docs/test-configuration
 /* @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',
  retries: 1,
  workers: 3,
  //outputDir: './test results',
  //preserveOutput: 'always',
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
  //fullyParallel: true,  - undo
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //forbidOnly: !!process.env.CI,   - undo
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,   - undo
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined, - undo
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects: [
    {
      name: 'safari',
  use: {

        browserName: 'webkit',
        headless: false,
        screenshot: 'off',
        trace: 'on',
        ...devices['iPhone 11']
}},
{
  name: 'chrome',
use: {

    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on',
    ignoreHttpsErrors: true,
    Permissions: ['geolocation'],
    viewport: {width:720, height:720}

}}
]
};

/* Configure projects for major browsers */
//   projects: [
//     {
//       name: 'chromium',
//       use: {
//         ...devices['Desktop Chrome'],
//       },
//     },

//     {
//       name: 'firefox',
//       use: {
//         ...devices['Desktop Firefox'],
//       },
//     },

//     {
//       name: 'webkit',
//       use: {
//         ...devices['Desktop Safari'],
//       },
//     },

//     /* Test against mobile viewports. */
//     // {
//     //   name: 'Mobile Chrome',
//     //   use: {
//     //     ...devices['Pixel 5'],
//     //   },
//     // },
//     // {
//     //   name: 'Mobile Safari',
//     //   use: {
//     //     ...devices['iPhone 12'],
//     //   },
//     // },

//     /* Test against branded browsers. */
//     // {
//     //   name: 'Microsoft Edge',
//     //   use: {
//     //     channel: 'msedge',
//     //   },
//     // },
//     // {
//     //   name: 'Google Chrome',
//     //   use: {
//     //     channel: 'chrome',
//     //   },
//     // },
//   ],

//   /* Folder for test artifacts such as screenshots, videos, traces, etc. */
//   // outputDir: 'test-results/',

//   /* Run your local dev server before starting the tests */
//   // webServer: {
//   //   command: 'npm run start',
//   //   port: 3000,
//   // },
// };

module.exports = config;
