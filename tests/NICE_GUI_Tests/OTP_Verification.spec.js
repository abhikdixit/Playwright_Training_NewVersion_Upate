
import { test, expect, Page } from '@playwright/test';
import MailSlurp from "mailslurp-client";

test.describe('test email login with playwright', () => {
  test('can login and verify email address with mailslurp', async ({ page }) => {

    // load playground app
    await page.goto("https://playground.mailslurp.com");
    await page.click('[data-test="sign-in-create-account-link"]');
    await page.waitForTimeout(3000)

    // create a new inbox
    const mailslurp = new MailSlurp({
      apiKey: '302d3aa6cb7fb2a13c4efa3b5b035be67386f55ca6e12d7c17f5d733eb575b6f'});
    const password = "test-password"
    const { id, emailAddress } = await mailslurp.createInbox()
    await page.waitForTimeout(3000)

    // fill sign up form
    await page.fill('input[name=email]', emailAddress);
    await page.fill('input[name=password]', password);
    await page.click('[data-test="sign-up-create-account-button"]');
    await page.waitForTimeout(3000)

    // wait for verification code
    const email = await mailslurp.waitForLatestEmail(id)

    // extract the confirmation code (so we can confirm the user)
    // \d+ → Matches one or more digits (0-9).
    //$ → Ensures it matches only at the end of email.body. 
    const code = /(\d+)$/.exec(email.body)[1];

    // enter confirmation code
    await page.fill('[data-test="confirm-sign-up-confirmation-code-input"]', code);
    await page.click('[data-test="confirm-sign-up-confirm-button"]');
    await page.waitForTimeout(3000)

    // fill out username (email) and password
    await page.fill('[data-test="username-input"]', emailAddress);
    await page.fill('[data-test="sign-in-password-input"]', password);
    await page.waitForTimeout(3000)

    // submit
    await page.click('[data-test="sign-in-sign-in-button"]');
    await page.waitForTimeout(3000)
    await page.waitForSelector("[data-test='greetings-nav']")
  });
});