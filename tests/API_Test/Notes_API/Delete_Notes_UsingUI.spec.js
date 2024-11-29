const { test, expect }= require('@playwright/test')
const {AccessToken} = require('./BaseTest')
test.describe('Create Notes API Testing', () => {
  const baseUrl = 'https://practice.expandtesting.com'
  var token
  var id
  var updated_id
  test.beforeAll(async ({ request }) => {
    token = await AccessToken("abhinay.dixit@hotmail.com", "pass@1234", request)
    expect(token).toBeTruthy();
  })
  
  test('POST Request - Create Notes', async ({ request }) => {
    
    const response = await request.post(`${baseUrl}/notes/api/notes`, {

        headers: {
          'x-auth-token': `${token}`,
        },
        data:
        {         
            title: "Playwright_UI",
            description: "Done via API",
            category: "Work"
          },
    })
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    console.log(responseBody)
    expect(responseBody.message).toBe('Note successfully created')
    expect(responseBody.data.title).toBe('Playwright_UI')
    id = responseBody.data.id
 
    })

    test('Delete Notes using API', async ({ page }) => {
      await page.goto('https://practice.expandtesting.com/notes/app');
      await page.getByRole('link', { name: 'Login' }).click();
      await page.getByTestId('login-email').fill('abhinay.dixit@hotmail.com');
      await page.getByTestId('login-password').fill('pass@1234');
      await page.getByTestId('login-submit').click();
      await page.getByTestId('category-work').click();
      await page.locator("//div[normalize-space()='Playwright_UI']/following-sibling::div[2]/div/button[2]").click()
      await page.locator("//button[@type='button'][normalize-space()='Delete']").click()
      await expect(page.locator("//div[@data-testid='notes-list']")).not.toContainText("Playwright_UI")
      await page.getByTestId('logout').click();
    });
})