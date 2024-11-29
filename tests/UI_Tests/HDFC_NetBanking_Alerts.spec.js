const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {

  await page.goto('https://netbanking.hdfcbank.com/netbanking/');
  await page.frame({name: 'login_page'}).fill("1000")
  await page.frame({name: 'login_page'}).click('text=CONTINUE');
  await page.pause()
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  // await page.waitForTimeout(5000)
  // // Click a:has-text("LOGIN")
  // const frame1 = await page.frame({name: 'login_page'});
  // const Login = await frame1.$('a:has-text("LOGIN")');
  // console.log(await Login.innerText());
  await expect(page).toHaveURL('https://netbanking.hdfcbank.com/netbanking/');
});