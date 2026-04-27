import { test, expect, type Page, type BrowserContext } from '@playwright/test';
import { CommonFunction } from './CommonFunction';

interface ProductInfo {
  name: string;
  price: string;
}

const config = {
  url: 'http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx',
  credentials: {
    username: 'Tester',
    password: 'test'
  },
  products: ['MyMoney', 'FamilyAlbum', 'ScreenSaver'],
  selectors: {
    username: 'label:has-text("Username:")',
    password: 'label:has-text("Password:")',
    loginButton: 'input[type="submit"][value="Login"]',
    viewProducts: 'a:text("View all products")',
    //orderLink: { selector: 'link', options: { name: 'Order', exact: true } },
    //orderLink: 'a:text("Order")',
    productsTable: 'table.ProductsTable > tbody > tr',
    productDropdown: 'select[name="ctl00$MainContent$fmwOrder$ddlProduct"]',
    priceInput: 'input[name="ctl00$MainContent$fmwOrder$txtUnitPrice"]',
    quantityInput: 'input[name="ctl00$MainContent$fmwOrder$txtQuantity"]',
    customerNameInput: 'input[name="ctl00$MainContent$fmwOrder$txtName"]',
    streetInput: 'input[name="ctl00$MainContent$fmwOrder$txtStreet"]',
    cityInput: 'input[name="ctl00$MainContent$fmwOrder$txtCity"]',
    zipInput: 'input[name="ctl00$MainContent$fmwOrder$txtZip"]',
    cardTypeVisa: 'input[name="ctl00$MainContent$fmwOrder$cardList"][value="Visa"]',
    cardNumberInput: 'input[name="ctl00$MainContent$fmwOrder$txtCardNumber"]',
    expireDateInput: 'input[name="ctl00$MainContent$fmwOrder$txtExpireDate"]',
    processButton: 'a:text("Process")',
    orderSuccess: "//strong[normalize-space()='New order has been successfully added.']",
    viewOrders: 'a:text("View all orders")',
    logoutLink: 'a:text("Logout")'
  }
};

test.describe.serial('Product Validation and Order Tests', () => {
  let page: Page;
  let context: BrowserContext;
  let commonFunction: CommonFunction;
  const productPrices = new Map<string, string>();

  test.beforeAll(async ({ browser }) => {
    try {
      commonFunction = new CommonFunction();
      ({ context, page } = await commonFunction.launchBrowserAndPage(browser));

      // Login
      await page.goto(config.url, { waitUntil: 'networkidle' });
      await page.fill(config.selectors.username, config.credentials.username);
      await page.fill(config.selectors.password, config.credentials.password);
      await page.click(config.selectors.loginButton);
      await page.waitForLoadState('networkidle');

      // Get product prices
      await page.click(config.selectors.viewProducts);
      await page.waitForSelector(config.selectors.productsTable);
      
      const rows = await page.$$(config.selectors.productsTable);
      for (const row of rows) {
        const [productCell, priceCell] = await Promise.all([
          row.$('td >> nth=0'),
          row.$('td >> nth=1')
        ]);
        
        if (productCell && priceCell) {
          const productName = (await productCell.textContent())?.trim();
          const price = (await priceCell.textContent())?.trim().replace('$', '');
          
          if (productName && price) {
            productPrices.set(productName, price);
          }
        }
      }
    } catch (error) {
      console.error('Setup failed:', error);
      throw error;
    }
  });

  for (const product of config.products) {
    test(`Validate and order product: ${product}`, async () => {
      try {
        // Navigate to order page
        //await page.click(config.selectors.orderLink);
        await page.getByRole('link', { name: 'Order', exact: true }).click();

        await expect(page).toHaveURL(/.*Process\.aspx/);

        // Select product and verify price
        await page.selectOption(config.selectors.productDropdown, { label: product });
        const actualPrice = await page.inputValue(config.selectors.priceInput);
        const expectedPrice = productPrices.get(product);
        expect(actualPrice, `Price mismatch for ${product}`).toBe(expectedPrice);

      //   // Fill order details
      //   const customerName = `Customer${Math.floor(1000 + Math.random() * 9000)}`;
      //   await page.fill(config.selectors.quantityInput, '5');
      //   await page.fill(config.selectors.customerNameInput, customerName);
      //   await page.fill(config.selectors.streetInput, 'Test Street');
      //   await page.fill(config.selectors.cityInput, 'Test City');
      //   await page.fill(config.selectors.zipInput, '12345');
      //   await page.check(config.selectors.cardTypeVisa);
      //   await page.fill(config.selectors.cardNumberInput, '4111111111111111');
      //   await page.fill(config.selectors.expireDateInput, '12/25');

      //   // Submit order and verify
      //   await page.click(config.selectors.processButton);
      //   await expect(page.locator(config.selectors.orderSuccess))
      //     .toContainText('New order has been successfully added.');

      //   // Verify order in list
      //   await page.click(config.selectors.viewOrders);
      //   await expect(page.locator(`//td[text()="${customerName}"]`))
      //     .toHaveText(customerName);

      // } catch (error) {
      //   console.error(`Test failed for ${product}:`, error);
      //   throw error;
      // }
      } catch (error) {
        console.error(`Test failed for ${product}:`, error);
        throw error;
      }
    });
  }

  test.afterAll(async () => {
    try {
      await page.click(config.selectors.logoutLink);
      await page.close();
      await context.close();
    } catch (error) {
      console.error('Cleanup failed:', error);
    }
  });
});
