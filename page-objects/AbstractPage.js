//import { Page } from '@playwright/test'
const { expect, Locator, Page } = require('@playwright/test');

exports.AbstractPage= class AbstractPage {
   page= Page

  constructor(page= Page) {
    this.page = page
  }

  async wait(time) {
    await this.page.waitForTimeout(time)
  }
}
