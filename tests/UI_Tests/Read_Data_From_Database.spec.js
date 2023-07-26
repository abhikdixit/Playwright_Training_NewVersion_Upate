const { test, expect } = require('@playwright/test');

test.describe('MYSQL Test', function() {
        class ConnectDatabase {
        constructor() {
            var mysql = require("mysql2");
            this.connection = mysql.createConnection({
                host: "localhost",
                Port: 3306,
                user: "root",
                password: "root",
                database: "demo_weborders"
            });
        }
    }
         
    test('DataBase testing in Playwright', async ({ page }) => {
        var connectDatabase = new ConnectDatabase()
        connectDatabase.connection.connect();
        
        var sql = "select * from login"
        connectDatabase.connection.query(sql,function(err, rows){
            if(err){
                console.log(err)
            }else{
                console.log(rows)
            for (const row of rows)
            {
                console.log(row.uname +" "+ row.upass)
                // Do whatever else you need
            }
            }
            connectDatabase.connection.end()
        })
    });
});