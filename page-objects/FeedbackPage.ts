import { expect, Locator, Page } from '@playwright/test';
export class FeedbackPage {
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
    await this.nameInput.type(name);
    await this.emailInput.type(email);
    await this.subjectInput.type(subject);
    await this.commentInput.type(comment);
  }

  async resetForm(): Promise<void> {
    await this.clearButton.click();
  }

  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  async assertReset(): Promise<void> {
    await expect(this.nameInput).toHaveValue('');
    await expect(this.emailInput).toHaveValue('');
    await expect(this.subjectInput).toHaveValue('');
    await expect(this.commentInput).toHaveValue('');
  }

  async feedbackFormSent(): Promise<void> {
    await expect(this.feedbackTitle).toBeVisible();
  }
}
