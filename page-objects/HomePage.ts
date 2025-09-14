//import { Locator, Page } from '@playwright/test'
import { expect, Locator, Page } from '@playwright/test';
export class HomePage {
   page: Page
   signInButton: Locator
   searchBox: Locator
   linkFeedback: Locator
   linkOnlineBanking: Locator
   usernameDropdown: Locator
   logoutButton: Locator

   
  constructor(page: Page) {
    this.page = page
    this.signInButton = page.locator('#signin_button')
    this.searchBox = page.locator('#searchTerm')
    this.linkFeedback = page.locator('#feedback')
    this.linkOnlineBanking = page.locator("//strong[normalize-space()='Online Banking']")
    this.usernameDropdown=page.getByText('username')
    this.logoutButton=page.getByRole('link', { name: 'Logout' })
  }

  async visit(): Promise<void> {
    await this.page.goto(String(process.env.URL_ZeroBank))
  }

  async clickOnSignIn(): Promise<void> {
    await this.signInButton.click()
  }

  async clickOnFeedbackLink(): Promise<void> {
    await this.linkFeedback.click()
  }

  async clickOnOnlineBankingLink(): Promise<void> {
    await this.linkOnlineBanking.click()
  }

  async searchFor(phrase: string): Promise<void> {
    await this.searchBox.type(phrase)
    await this.page.keyboard.press('Enter')
  }

  async logout(): Promise<void> {
    await this.usernameDropdown.click()
    await this.logoutButton.click()
}

  async VerifyURL(url: string): Promise<void> {
    await this.page.waitForURL(url)
    await expect(this.page).toHaveURL(url)
}
  
}
