import { expect } from '@playwright/test';
export class newNotesPage {
    constructor(page) {
        this.page = page;
        this.InputUserName = this.page.getByTestId('login-email');
        this.InputPassword = this.page.getByTestId('login-password');
        this.LoginButton = this.page.getByTestId('login-submit');
        this.Logout = this.page.getByTestId('logout');
    }
    async gotoURL() {
        await this.page.goto('https://practice.expandtesting.com/notes/app/login');
    }
    async loginToApp(username, password) {
        await this.InputUserName.fill(username);
        await this.InputPassword.fill(password);
        await this.LoginButton.click();
    }
    async LogoutFromApp() {
        await this.Logout.click()
    }
    async createNote(parameter) {
        await this.page.getByTestId('add-new-note').click();
        await this.page.getByTestId('note-category').selectOption(`${parameter}`);
        await this.page.getByTestId('note-title').fill(`Title_Test_${parameter}`);
        await this.page.getByTestId('note-description').fill(`Description_Test_${parameter}`);
        await this.page.getByTestId('note-submit').click();
    }
    async assertNoteCreated(parameter) {
        const parameter_lower = parameter.toLowerCase();
        await this.page.getByTestId(`category-${parameter_lower}`).click();
        await expect(this.page.getByTestId('note-card-title').getByText(`Title_Test_${parameter}`)).toContainText(`Title_Test_${parameter}`);
    }

  }
 
 