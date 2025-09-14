const { test, expect, devices } = require('@playwright/test');

test('Evaluate in browser context', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx');
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    }
  })
  console.log(dimensions);
})

test.only('Bounding Box example', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx');
  const mylocator = await page.locator("#ctl00_MainContent_login_button")
  const box = await mylocator.boundingBox()
  const view = page.viewportSize() // note: doesn't need await
  const isMyLocatorInViewport = box.y + box.height - view.height < 0 && box.y > 0
  console.log(isMyLocatorInViewport)
  //var box = await element.boundingBox()
  await page.mouse.click(box.x + box.width / 2, box.y + box.height - 5);
})