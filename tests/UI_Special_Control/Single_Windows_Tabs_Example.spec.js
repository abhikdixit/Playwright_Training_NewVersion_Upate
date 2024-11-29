import { chromium, expect, test } from "@playwright/test";
test(" Single Window ", async ({page}) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo");
    console.log(page.url());
    //Single Window
    const [newWindow] = await Promise.all([
        page.waitForEvent("popup"),
        page.click("'Follow On Twitter'")
    ]);
});