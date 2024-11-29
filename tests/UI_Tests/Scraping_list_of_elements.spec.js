const { test, expect } = require('@playwright/test');

test('Scrap all Data from webtable', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/tables#edit');
        const tablebodydata = await page.$eval('#table2 tbody', tableBody => {
            let all = []
            for (let i = 0, row; row = tableBody.rows[i]; i++) {
                let tdata = [];
                for (let j = 0, col; col = row.cells[j]; j++) {
                    tdata.push(row.cells[j].innerText)
                }
                all.push(tdata)

            }
            return all;
        });
        
        console.log('Most Active', tablebodydata);

        //await page.waitForTimeout(30000); // wait
        
    })
