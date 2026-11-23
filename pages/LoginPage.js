class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async enterUsername(username) {
        await this.page.getByPlaceholder('Username').fill(username);
    }

    async enterPassword(password){
        await this.page.getByPlaceholder('Password').fill(password);
    }

    async clickLogin(){
        await this.page.getByRole('button', { name: 'Login' }).click();
    }
}

module.exports = { LoginPage };