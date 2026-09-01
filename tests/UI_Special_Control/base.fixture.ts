//This code creates a custom Playwright Test fixture. Instead of using Playwright's 
// default page and context, you are creating your own reusable context and page lifecycle management.
//Playwright already provides a default test object:
//Here it is renamed: test as base
//because you are going to extend it with your own fixtures.
//base.extend()
//Take Playwright's existing test functionality and add custom behavior.
// This code creates a custom Playwright Test fixture.
// It extends Playwright's default fixtures and provides reusable
// browser, context, and page lifecycle management.

import { test as base, Browser, BrowserContext, Page } from "@playwright/test";

type MyFixtures = {
  browser: Browser;
  context: BrowserContext;
  page: Page;
};

export const test = base.extend<MyFixtures>({

  // Browser fixture
  // Playwright automatically creates the browser instance.
  browser: async ({ browser }, use) => {

    // Share browser instance with tests/framework classes
    await use(browser);

  },


  // Create custom browser context
  context: async ({ browser }, use) => {

    const context = await browser.newContext();

    // Share context with test
    await use(context);

    // Cleanup
    await context.close();
  },


  // Create custom page
  page: async ({ context }, use) => {

    const page = await context.newPage();

    // Share page with test
    await use(page);

    // Cleanup
    await page.close();
  }

});

export { expect } from "@playwright/test";