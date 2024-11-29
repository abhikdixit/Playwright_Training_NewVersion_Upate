 
// Exercise 3: Create a Script to navigate to https://practice.expandtesting.com/notes/app/login 
// o Login to Notes application with valid username and password
// o Click on “Add Note” Button
// o Select Category from Dropdown
// o Check Complete button
// o Enter Title and Description
// o Click on Create Button
// o Do above steps for all Category “Personal, Work and Home” using parametrization concept using CSV file or Excel File.
// o Verify the notes created in Each category using Assertions
// o Then close the browser.

// o Check Complete button
// o Do above steps for all Category “Personal, Work and Home” using parametrization concept using CSV file or Excel File.
// o Verify the notes created in Each category using Assertions

import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
// const testParameters = ['Personal', 'Work', 'Home'];
let objects = readFileSync('./tests/TestData/Exercise_3_data.json')
const testParameters = JSON.parse(objects);

test.describe('Exercise 3', () => {
    let page
    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto('https://practice.expandtesting.com/notes/app/login');
        await page.locator('div').filter({ hasText: /^Email address$/ }).click();
        await page.getByTestId('login-email').fill('Sanctuary1239@expandtesting.biz');
        await page.getByTestId('login-password').fill('kKmX^$4cmA56&r');
        await page.getByTestId('login-submit').click();
    });
    for(const parameter of testParameters){
        test(`test ${parameter.noteType}`, async () => {
        
        await page.getByTestId('add-new-note').click();
        await page.getByTestId('note-category').selectOption(`${parameter.noteType}`);
        await page.getByTestId('note-title').fill(`Title_Test_${parameter.noteType}`);
        await page.getByTestId('note-description').fill(`Description_Test_${parameter.noteType}`);
        await page.getByRole('checkbox', { name: 'Complete' }).check();
        await page.getByTestId('note-submit').click();
        await expect(page.getByTestId('note-card-title').getByText(`Title_Test_${parameter.noteType}`)).toContainText(`Title_Test_${parameter.noteType}`);
        });
    }
    test.afterEach(async () => {
        await page.getByRole('button', { name: 'Delete' }).click();
        await page.getByTestId('note-delete-confirm').click();
        await page.getByTestId('logout').click();
    });
});
 
 