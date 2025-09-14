//NopProductLinkTest.spec.js
const { test, expect } = require('@playwright/test');

//since it's in order, the tests can't be performed in parallel - eg workers should be 1
test.describe('Nop Link Test', () => {
    let page;
    let urlstem = "https://admin-demo.nopcommerce.com";
    let urls = {};
    test.setTimeout(120000);

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.route('**/*', (route, request) => {
            // Block known bot-detection scripts
            if (request.url().includes('cloudflare') || request.url().includes('challenge')) {
                route.abort();
            } else {
                route.continue();
            }
        });
        // login
        await page.goto(urlstem);
        await page.locator("//button").click();
        await expect(page).toHaveURL(urlstem + '/admin/');
        await Promise.all([
            page.waitForNavigation(),
            page.click('text=Dashboard')
        ]);
        // Wait for Catalog menu to be visible and click
        const catalogMenu = page.locator("//p[normalize-space()='Catalog']");
        await catalogMenu.waitFor({ state: 'visible', timeout: 10000 });
        await catalogMenu.click();
        // Wait for Products submenu to be visible and click
        const productsMenu = page.locator("//p[normalize-space()='Products']");
        await productsMenu.waitFor({ state: 'visible', timeout: 10000 });
        await productsMenu.click();
        await page.locator("//td").nth(0).waitFor({ state: 'visible', timeout: 10000 });
        await page.locator("//td").nth(0).click();
        let tablepage = 1;
        const gridinfotext = await page.locator("//div[@id='products-grid_info']").innerText();
        let totItems = gridinfotext.split(" of ")[1].split(" items")[0];
        while (true) {
            let item1num = (tablepage - 1) * 15 + 1;
            let itemnnum = Math.min(tablepage * 15, parseInt(totItems));
            await page.getByText(item1num + '-' + itemnnum + ' of ' + totItems + ' items').click();
            const links = await page.locator("//a[@class='btn btn-default']").all();
            const prodNames = await page.locator("//tr/td[3]").all();
            for (let i = 0; i < links.length; i++) {
                const link = links[i];
                const href = await link.getAttribute('href');
                if (href != null && href.includes("/") && !href.includes("logout")) {
                    let urltoadd = urlstem + "/Admin/Product/" + href;
                    urls[urltoadd] = (await prodNames[i].innerText()).trim();
                }
            }
            console.log("got links from table page ", tablepage);
            const next = page.locator("//li[contains(@class, 'next')]");
            const nextclass = await next.getAttribute("class");
            if (nextclass.includes('disabled'))
                break;
            else {
                await next.click();
                tablepage++;
            }
        }
    });

    test('Apply', async () => {
        let i = 1;
        for (let url in urls) {
            await page.goto(url);
            let title = await page.title();
            let prodname = (await (await page.locator('h1').nth(1)).innerText()).replace("Edit product details - ", "").replace("back to product list", "").trim();
            console.log(i, url, "------", title, "------", prodname);
            expect(prodname).toBe(urls[url]);
            i++;
        }
    });

    test.afterAll(async () => {
        await page.getByRole('link', { name: 'Logout' }).click();
        await expect(page).toHaveURL(urlstem + '/login?ReturnUrl=%2Fadmin%2F');
    });
});
