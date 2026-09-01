import { expect, Locator, Page } from '@playwright/test';
export class FeedbackPage  {
  page: Page;
  nameInput: Locator;
  emailInput: Locator;
  subjectInput: Locator;
  commentInput: Locator;
  clearButton: Locator;
  submitButton: Locator;
  feedbackTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.subjectInput = page.locator('#subject');
    this.commentInput = page.locator('#comment');
    this.clearButton = page.locator("input[name='clear']");
    this.submitButton = page.locator("input[type='submit']");
    this.feedbackTitle = page.locator('#feedback-title');
  }

  async fillForm(
    name: string,
    email: string,
    subject: string,
    comment: string
  ): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.commentInput.fill(comment);
  }

  async resetForm(): Promise<void> {
    await this.clearButton.click();
  }

  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  async assertReset(): Promise<void> {
    await expect(this.nameInput).toBeEmpty();
    await expect(this.emailInput).toBeEmpty();
    await expect(this.subjectInput).toBeEmpty();
    await expect(this.commentInput).toBeEmpty();
  }

  // async feedbackFormSent(): Promise<void> {
  //   await expect(this.feedbackTitle).toBeVisible();    
  // }

  async feedbackFormSent(expectedName: string): Promise<string> {
    const actualMessage = await this.feedbackTitle.textContent();
    const expectedMessage = `Thank you for your comments, ${expectedName}. They will be reviewed by our Customer Service staff and given the full attention that they deserve.`;
    await expect(this.feedbackTitle).toHaveText(expectedMessage);
    return actualMessage?.trim() || '';
}
}
