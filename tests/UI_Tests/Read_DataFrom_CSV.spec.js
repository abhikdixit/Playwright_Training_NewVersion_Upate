const { test } = require('@playwright/test');
const fs = require("fs");

test('test', async ({ page }) => {
// Reads the CSV file and saves it  
var links = fs.readFileSync('tests/TestData/URL_Data.csv')
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) // remove white spaces for each line

// Start of for loop, to loop through csv file
for (const link of links)
    {
        // First csv file item sent to console
        console.log(link);
        // Goes to that csv link item
        await page.goto(link);
        // Do whatever else you need
    }
});