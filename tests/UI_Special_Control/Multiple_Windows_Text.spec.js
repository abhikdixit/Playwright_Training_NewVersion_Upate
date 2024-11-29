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
    // console.log('No.of tabs: ' + pages.length);
 
    // pages.forEach(tab => {
    //     console.log(tab.url());
    // })

    //Interacting with multiple pages in Playwright
    let facebookPage
    for (let index = 0; index < pages.length; index++) {
        const url = pages[index].url()
        if (url == "https://www.facebook.com/lambdatest/") {
            facebookPage = pages[index];
        }
    }
    const text = await facebookPage.textContent("//h1")
    console.log(text);
});

test.only("OrangeHRM Window ", async ({page}) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    console.log(page.url());
    // Multiple Windows
    const [multiPage] = await Promise.all([
        //Wait for popup window: this is not javascript alert or window alert
        page.waitForEvent("popup"),
        page.click("a[href='http://www.orangehrm.com']")
    ])
    //It often happens that before all the pages get loaded completely,
    // the browsers get closed. To fix this issue, use a function that 
    //says “waitForLoadState.” This function ensures that the browser 
    //waits until all the pages are loaded
    await multiPage.waitForLoadState();
 
    const pages = multiPage.context().pages();

    //Interacting with multiple pages in Playwright
    let OrangeHRMPage
    for (let index = 0; index < pages.length; index++) {
        const url = pages[index].url()
        if (url == "https://www.orangehrm.com/") {
            OrangeHRMPage = pages[index];
            
        }
    }
    const text = await OrangeHRMPage.textContent("//h1")
    console.log(OrangeHRMPage.url());
    console.log(text);

    
});