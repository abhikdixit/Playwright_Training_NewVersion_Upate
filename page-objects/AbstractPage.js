//import { Page } from '@playwright/test'
import { expect, Locator, Page } from '@playwright/test';

export class AbstractPage {
   page= Page

  constructor(page= Page) {
    this.page = page
  }

  async wait(time) {
    await this.page.waitForTimeout(time)
  }

  
}
