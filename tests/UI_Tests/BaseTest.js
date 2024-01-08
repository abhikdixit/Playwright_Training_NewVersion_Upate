export class Login_LogoutPage {

  constructor(page) {
    this.page = page;
    this.InputUserName = this.page.getByPlaceholder("username");
    this.InputPassword = this.page.getByPlaceholder("password");
    this.LoginButton = this.page.locator("//button[@type='submit']");
    this.Logout = this.page.getByRole('menuitem', { name: 'Logout' });
    this.icon = this.page.locator("//i[@class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']");


  }

  async gotoURL() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  async LoginToApp(uname, pass) {
    await this.InputUserName.fill(uname);
    await this.InputPassword.fill(pass);
    await this.LoginButton.click();
  }

  async LogoutFromApp() {
    await this.icon.click()
    await this.Logout.click()
  }

  async ForgetYourPassword() {

  }

  

}