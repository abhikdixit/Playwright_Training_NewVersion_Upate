// import the required library
// const { chromium } = require("playwright");

// (async () => {
//     const browser = await chromium.launch({ timeout: 60000 });
//     const context = await browser.newContext();
//     const page = await context.newPage();
import { test, expect } from '@playwright/test';
import { Login_LogoutPage } from '../NICE_GUI_Tests/BaseTest';
test('Scrap Title and Price of Products @smoke', async ({ page }) => { 
    await page.goto("https://www.scrapingcourse.com/ecommerce/", { timeout: 1000000 });
    
    let scrapper_ele = new Login_LogoutPage(page);
    // // define the scraper function
    // async function scraper() {
    //     // find all product containers on the page
    //     const productContainers = await page.$$(".woocommerce-LoopProduct-link");

    //     for (const container of productContainers) {
    //         // extract product name and price from each container
    //         const productName = await container.$eval(".woocommerce-loop-product__title", element => element.innerText);
    //         const price = await container.$eval(".price", element => element.innerText);

    //         console.log("Name:", productName);
    //         console.log("Price:", price);
    //     }
    // }

    while (true) {
        try {
            //page.pause()
            // execute the scraper function
            await scrapper_ele.scraper(".woocommerce-LoopProduct-link",".woocommerce-loop-product__title",".price");

            // find and click the next page link
            const nextPageLink = await page.$(".next.page-numbers");
            if (nextPageLink) {
                await nextPageLink.click({ timeout: 100000 });
                //await page.waitForTimeout(30000);
            } else {
                console.log("No more pages available");
                break;
            }
        } catch (e) {
            console.log("An error occurred:", e);
            break;
        }
    }

})
