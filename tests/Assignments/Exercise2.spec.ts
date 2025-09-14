 
// Exercise 2: Create a Script to navigate to https://practice.expandtesting.com/notes/app/login 
// o Login to Notes application with valid username and password using before All concept
// o Click on “Add Note” Button
// o Select Category from Dropdown
// o Check Complete button
// o Enter Title and Description
// o Click on Create Button
// o Do above steps for all Category “Personal, Work and Home” using parametrization concept using class file, where data will be passed from same js file.
// o Verify the notes created in Each category using Assertions
// o Then Logout from application in After Each concept.
import { test, expect } from '@playwright/test';
import {newNotesPage} from './newNotesPage';
const testParameters = ['Personal', 'Work', 'Home'];
test.describe('Exercise 2', () => {
    let page;
    let notesPage;
    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        notesPage = new newNotesPage(page); 
        await notesPage.gotoURL();
        await notesPage.loginToApp('abhi@abc.com','test1234');
    });
    for(const parameter of testParameters){
        test(`test ${parameter}`, async () => {
        
        await notesPage.createNote(parameter);
        await notesPage.assertNoteCreated(parameter);
        });
    }
    test.afterEach(async () => {
        await page.getByRole('button', { name: 'Delete' }).click();
        await page.getByTestId('note-delete-confirm').click();
        await notesPage.LogoutFromApp();
    });
});
 
 