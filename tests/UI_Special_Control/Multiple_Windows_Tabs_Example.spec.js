import { chromium, expect, test } from "@playwright/test";
test("Multiple Window ", async ({page}) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo");
    console.log(page.url());
    // Multiple Windows
    const [multiPage] = await Promise.all([
        //Wait for popup window: this is not javascript alert or window alert
        page.waitForEvent("popup"),
        page.click("#followboth")
    ])
    //It often happens that before all the pages get loaded completely,
    // the browsers get closed. To fix this issue, use a function that 
    //says “waitForLoadState.” This function ensures that the browser 
    //waits until all the pages are loaded
    await multiPage.waitForLoadState();
 
    const pages = multiPage.context().pages();
    console.log('No.of tabs: ' + pages.length);
 
    pages.forEach(tab => {
        console.log(tab.url());
    })


});