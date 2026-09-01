// Import custom fixture instead of @playwright/test
import { test, expect } from "./base.fixture";


test.describe.serial('E2E WebOrder Application Test cases', () => {

  let ExpUserName: string;


  // Login once before all tests
  test.beforeAll(async ({ browser, context, page }) => {

    console.log("Browser Version:", browser.version());

    console.log("Context Created");


    // Page is already created by fixture
    await page.goto(
      'http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx',
      {
        waitUntil: 'networkidle'
      }
    );


    // Login
    await page.getByLabel('Username:').waitFor({
      state: 'visible'
    });


    await page.getByLabel('Username:')
      .fill('Tester');


    await page.getByLabel('Password:')
      .fill('test');


    await page.getByRole('button', {
      name: 'Login'
    })
    .click();



    // Verify login
    await expect(page)
      .toHaveURL(
        'http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx'
      );


    await expect(
      page.getByRole('link', {
        name:'Logout'
      })
    )
    .toBeVisible();


  });



  test('Create Order', async ({ page }) => {


    await page.getByRole('link', {
      name:'Order'
    })
    .nth(1)
    .click();



    await expect(page)
      .toHaveURL(/.*Process\.aspx/);



    ExpUserName =
      `Dixit${Math.floor(Math.random()*10000)}`;



    await page.getByRole('combobox', {
      name:'Product:*'
    })
    .waitFor({
      state:'visible'
    });



    await page.getByRole('combobox', {
      name:'Product:*'
    })
    .selectOption('FamilyAlbum');



    await page.getByLabel('Quantity:*')
      .fill('5');


    await page.getByLabel('Customer name:*')
      .fill(ExpUserName);


    await page.getByLabel('Street:*')
      .fill('BTM');


    await page.getByLabel('City:*')
      .fill('Bangalore');


    await page.getByLabel('Zip:*')
      .fill('560076');


    await page.getByLabel('Visa')
      .check();


    await page.getByLabel('Card Nr:*')
      .fill('1234567891');


    await page.getByLabel('Expire date (mm/yy):*')
      .fill('12/23');



    await page.getByRole('link', {
      name:'Process'
    })
    .click();



    const newOrder =
      page.locator(
        "//strong[normalize-space()='New order has been successfully added.']"
      );


    await expect(newOrder)
      .toContainText(
        'New order has been successfully added.'
      );



    await page.getByRole('link',{
      name:'View all orders'
    })
    .click();



    await expect(
      page.locator(
        "//td[normalize-space()='" + ExpUserName + "']"
      )
    )
    .toHaveText(ExpUserName);



  });




  test('Update Order', async ({ page }) => {


    const editButton =
      page.locator(
        `//td[normalize-space()='${ExpUserName}']//following-sibling::td/input`
      );


    await editButton.waitFor({
      state:'visible'
    });


    await editButton.click();



    const cityField =
      page.locator(
        '[name="ctl00$MainContent$fmwOrder$TextBox3"]'
      );


    await cityField.waitFor({
      state:'visible'
    });



    await cityField.clear();


    await cityField.fill('Delhi');



    await page.locator(
      '[id="ctl00_MainContent_fmwOrder_UpdateButton"]'
    )
    .click();



    await expect(
      page.locator(
        `//td[normalize-space()='${ExpUserName}']//following-sibling::td[text()='Delhi']`
      )
    )
    .toHaveText('Delhi');


  });




  test('Delete Order', async ({ page }) => {


    const checkbox =
      page.locator(
        `//td[normalize-space()='${ExpUserName}']//preceding-sibling::td/input`
      );


    await checkbox.waitFor({
      state:'visible'
    });


    await checkbox.check();



    await page.locator(
      '[id="ctl00_MainContent_btnDelete"]'
    )
    .click();



    const orderGrid =
      page.locator(
        '[id="ctl00_MainContent_orderGrid"]'
      );


    await expect(orderGrid)
      .not
      .toContainText(ExpUserName);


  });




  test.afterAll(async ({ page }) => {


    await page.getByRole('link',{
      name:'Logout'
    })
    .click();



    await expect(page)
      .toHaveURL(/.*Login\.aspx/);



    await expect(
      page.getByLabel('Username:')
    )
    .toBeVisible();


  });


});