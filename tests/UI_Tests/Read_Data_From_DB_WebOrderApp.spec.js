const { test, expect } = require('@playwright/test');

//test.describe('MYSQL Test', function() {
//var rows
/*class ConnectDatabase {
constructor() {
    var mysql = require("mysql2");
    this.connection = mysql.createConnection({
        host: "localhost",
        Port: 3306,
        user: "root",
        password: "root",
        database: "weborders"
    });
}
}*/
//test.describe('MYSQL Test', function() {
 /* test.beforeEach(async ({ page }) => 
 / {
      var mysql = require("mysql2");
      connection = mysql.createConnection({
          host: "localhost",
          Port: 3306,
          user: "root",
          password: "root",
          database: "weborders"
      });
      connection.connect();
      
      var sql = "select * from login"
      connection.query(sql,function(err, rows)
      {
          if(err){
              console.log(err)
          }else{
              console.log(rows)
          }
      }) 
  })   */  

//test('DataBase testing in Playwright', async ({ page }) => {
    var mysql = require("mysql");
    connection = mysql.createConnection({
        host: "localhost",
        Port: 3306,
        user: "root",
        password: "root",
        database: "demo_weborders"
    });

connection.connect();

var sql = "select * from login"
connection.query(sql, async (err, rows) => {
    //const context = await browser.newContext();
    //const page = await context.newPage();
    if (err) throw err;

    for (const row of rows) {
        test('DataBase testing in Playwright', async ({ page }) => {
            //console.log(row.uname +" "+ row.upass)
            // Do whatever else you need


            await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
            // Fill input[name="ctl00\$MainContent\$username"]
            await page.fill('input[name="ctl00\\$MainContent\\$username"]', row.uname);
            // Fill input[name="ctl00\$MainContent\$password"]
            await page.fill('input[name="ctl00\\$MainContent\\$password"]', record.upass);

            // Click text=Login
            await page.click('text=Login');
            await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');

            // Click text=Logout
            await page.click('text=Logout');
            await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx');


      
        });
    }
    //connectDatabase.connection.end()
});
//});