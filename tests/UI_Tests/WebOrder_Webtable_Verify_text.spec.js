const { test, expect } = require('@playwright/test');
const assert = require('assert')

test('test', async ({ page }) => {
  test.setTimeout(50000);
  // Go to http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

  // Click input[name="ctl00\$MainContent\$username"]
  await page.click('input[name="ctl00\\$MainContent\\$username"]');

  // Fill input[name="ctl00\$MainContent\$username"]
  await page.fill('input[name="ctl00\\$MainContent\\$username"]', 'Tester');

  // Click input[name="ctl00\$MainContent\$password"]
  await page.click('input[name="ctl00\\$MainContent\\$password"]');

  // Fill input[name="ctl00\$MainContent\$password"]
  await page.fill('input[name="ctl00\\$MainContent\\$password"]', 'test');

  // Click text=Login
  await page.click('text=Login');
  await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');

  await page.waitForSelector('#ctl00_MainContent_orderGrid tbody tr')
  const tablebodydata = await page.$$('#ctl00_MainContent_orderGrid tbody tr')
  console.log(tablebodydata.length)
  //console.log(tablebodydata)
  await page.waitForSelector('#ctl00_MainContent_orderGrid tbody tr')
  const tddata = await page.$$('#ctl00_MainContent_orderGrid tbody tr td')
  console.log(await tddata.innerText)
  for await (const tabledata of tddata)
  {
    await page.waitForTimeout(1000)
    const returntd = await tabledata.textContent()
    console.log(returntd)
    //await page.waitForTimeout(1000)
    //Mark Smith
    if(returntd.includes('Mark Smith'))
    {
      page.check('#ctl00_MainContent_orderGrid tbody tr td input')
      page.click("(//input[@alt='Edit'])[1]")
      await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx')
    }

  }

  // Click text=Logout
  await page.click('text=Logout');
  await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx');

});