const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {

  // Go to https://netbanking.hdfcbank.com/netbanking/
  await page.goto('https://netbanking.hdfcbank.com/netbanking/');
  //await page.goto('https://netbanking.hdfcbank.com/netbanking/');
  // Click input[name="fldLoginUserId"]
  //await page.frame({name: 'login_page'}).click('input[name="fldLoginUserId"]');

  // Fill input[name="fldLoginUserId"]
  //await page.frame({name: 'login_page'}).fill('input[name="fldLoginUserId"]', '1000');

  // Click text=CONTINUE
  await page.frame({name: 'login_page'}).click('text=CONTINUE');
  
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.waitForTimeout(5000)
  // Click a:has-text("LOGIN")
  const frame1 = await page.frame({name: 'login_page'});
  const Login = await frame1.$('a:has-text("LOGIN")');
  console.log(await Login.innerText());
  await expect(page).toHaveURL('https://netbanking.hdfcbank.com/netbanking/');
});