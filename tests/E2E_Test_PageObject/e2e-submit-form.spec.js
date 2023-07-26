const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../page-objects/HomePage')
const { FeedbackPage } = require('../../page-objects/FeedbackPage')

test.describe('Feedback Form', () => {
  let homePage= HomePage
  let feedbackPage= FeedbackPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    feedbackPage = new FeedbackPage(page)

    await homePage.visit()
    await homePage.clickOnFeedbackLink()
  })

  // Reset feedback form
  test('Reset feedback form', async ({ page }) => {
    await feedbackPage.fillForm(
      'name',
      'email@mail.com',
      'subject',
      'my awesome message'
    )
    await feedbackPage.resetForm()
    await feedbackPage.assertReset()
  })

  // Submit feedback form
  test('Submit feedback form', async ({ page }) => {
    await feedbackPage.fillForm(
      'name',
      'email@mail.com',
      'subject',
      'my awesome message'
    )
    await feedbackPage.submitForm()
    await feedbackPage.feedbackFormSent()
  })
})
