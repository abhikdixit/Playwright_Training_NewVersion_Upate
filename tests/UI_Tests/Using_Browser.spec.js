const { webkit } = require('playwright');

(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage();
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx')
  // Create pages, interact with UI elements, assert values
  await browser.close();
})();

//const Base_URL = 'http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx';