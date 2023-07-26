const { test, expect } = require('@playwright/test');
const fs = require('fs');

test('test', async ({ page }) => {

  await page.goto("https://books.toscrape.com/");
  const listcontent = await page.evaluate(() => {
    const data = [];

    const books = document.querySelectorAll(".product_pod");
      books.forEach((book) => {
        let title = book.querySelector('.thumbnail').getAttribute("alt");
        let url = book.querySelector('a').getAttribute("href");
        data.push({title,url,});
      });
      return data;
  });

  let string = '';
  for (const {title: n, url: f} of listcontent) {
    string += '[' + n + '](' + f + ')\n\n';
  }

  fs.writeFileSync('tests/TestData/books.csv', string);

});